from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
import json
from web3 import Web3
from decouple import config
import requests
from mypackages import mpesa

app = FastAPI(title="bitkopa.com")
origins = [
	"http://localhost:9000",
  "http://127.0.0.1:9000",
  "https://localhost:9000",
  "http://localhost",
]

app.add_middleware(
	CORSMiddleware,
	allow_origins=origins,
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"],
)

#redirect to the docs
@app.get("/", tags=["Docs"])
async def redirect_docs():
	return RedirectResponse("https://bitkopa.deta.dev/docs")

#returns the loan data required by frontend
@app.get("/loanterms")
async def loan_config():
  with open(f'loanconfig/loanconfig.json') as file:
      return json.load(file)

#returns the payment methods
@app.get("/paymentmethods")
async def payment_methods():
    with open(f'payment/paymentmethods.json') as file:
      return json.load(file)

#verifies an account to allow access to Bitkopa services
@app.post("/verify", status_code=201)
async def verify_address(address:str = Body()):
      if(Web3.isAddress(Web3.toChecksumAddress(address))):
          #send verification tx
          w3 = Web3(Web3.HTTPProvider(config("ALCHEMY_URL")))
          contract_details = {}
          with open('contracts/verification.json') as file:
              contract_details = json.load(file)
          verification_contract = w3.eth.contract(address=contract_details.get('address'), abi=contract_details.get('abi'))

          #check if already verified
          if(verification_contract.functions.checkVerificationStatus(Web3.toChecksumAddress(address)).call()):
            return {'data':{'verified':True, 'address':address}}
          else:
            #submit new tx
            nonce = w3.eth.get_transaction_count(config('ADMIN'))

            #Build tx for addAddressToWhiteList
            tx = verification_contract.functions.addAddressToWhiteList([Web3.toChecksumAddress(address)]).buildTransaction({
                'chainId':80001,
                'gas':2500000,
                'maxFeePerGas':w3.toWei('2','gwei'),
                'maxPriorityFeePerGas':w3.toWei('2','gwei'),
                'nonce':nonce
            })
            #sign with private key
            signed_tx = w3.eth.account.sign_transaction(tx, config('PRIVATE_KEY'))

            #send signed_tx
            tx_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction)

            #wait for tx to be mined
            tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

            #check if tx is successful
            if(tx_receipt.get('status')):
                return {'data':{'verified':True, 'address':address}}
            else:
                #error
                raise HTTPException(status_code=500, detail="Request Not Processed, Kindly try again later")
      else:
          #error
          raise HTTPException(status_code=400, detail="Invalid Address")

#repay a loan
@app.post("/repay_loan", status_code=201)
async def repay_loan(data:dict = Body()):

      if(Web3.isAddress(Web3.toChecksumAddress(data.get('address')))):
            #check the loanId
            if (int(data.get('loanId')) < 2540):
              raise HTTPException(status_code=400, detail="Invalid Loan ID")

            w3 = Web3(Web3.HTTPProvider(config("ALCHEMY_URL")))
            contract_details = {}
            with open('loanconfig/loanconfig.json') as file:
                contract_details = [contract for contract in json.load(file).get('collateral') if contract.get('bitkopaContractAddress') == data.get('address')][0]
            bitkopa_contract = w3.eth.contract(address=contract_details.get('bitkopaContractAddress'), abi=contract_details.get('bitkopaContractABI'))

            #retrieve loan to process
            loan = bitkopa_contract.functions.getLoan(int(data.get('loanId'))).call()

            #check loan status -0 Active, 1 Completed, 2 Liquidated, 3 Requested
            if(not int(loan[9]) == 0):
              return {'data':{'details':'Loan Is Not Active', 'loanId':loan[0], 'status':loan[9]}}

            #get loan balance
            loan_balance = int(bitkopa_contract.functions.LoanBalance(int(loan[0])).call())

            amount = int(data.get('amount'))
            if (amount > loan_balance):
              amount = loan_balance
            with open('payment/paymentmethods.json') as file:
                payment_method = [payment_method for payment_method in json.load(file) if payment_method.get('paymentMethodId') == int(data.get('paymentMethodId'))][0]
            res = await mpesa.initiate_loan_repayment(amount, payment_method.get('accountNumber'),str(loan[0]),contract_details.get('bitkopaContractAddress'))
            if(res):
              return {'data':{'success':True, 'loanId':loan[0],"amount":amount}}
            else:
              raise HTTPException(status_code=500, detail='Initiate payment failed, try again later')
      else:
          #error
          raise HTTPException(status_code=400, detail="Invalid Address")

#process a loan request
@app.post("/process_loan", status_code=201)
async def process_loan(data:dict = Body()):
      if(Web3.isAddress(Web3.toChecksumAddress(data.get('address')))):
            #check the loanId
            if (int(data.get('loanId')) < 2540):
              raise HTTPException(status_code=400, detail="Invalid Loan ID")

            w3 = Web3(Web3.HTTPProvider(config("ALCHEMY_URL")))
            contract_details = {}
            with open('loanconfig/loanconfig.json') as file:
                contract_details = [contract for contract in json.load(file).get('collateral') if contract.get('bitkopaContractAddress') == data.get('address')][0]
            bitkopa_contract = w3.eth.contract(address=contract_details.get('bitkopaContractAddress'), abi=contract_details.get('bitkopaContractABI'))

            #retrieve loan to process
            loan = bitkopa_contract.functions.getLoan(int(data.get('loanId'))).call()

            #check loan status -0 Active, 1 Completed, 2 Liquidated, 3 Requested
            if(not int(loan[9]) == 3):
              return {'data':{'processed':True, 'loanId':loan[9]}}

            with open('loanconfig/loanconfig.json') as file:
                currencies = json.load(file).get('currencies')

            with open('loanconfig/loanconfig.json') as file:
                interest_rates = json.load(file).get('interestrates')

            #calculate loan amount
            loan_details = await  calculateLoanAmount(loan, contract_details, currencies, interest_rates)
            #get payment details
            account_number = loan_details.get('payment_method').get('accountNumber')

            res = await mpesa.disburse_loan(int(loan_details.get('amount')),account_number,data.get('loanId'),contract_details.get('bitkopaContractAddress'))
            if (res):
              return {'data':{'success':True, 'detail':'processing loan - await disbursement','loanId':loan[0],'amount':loan_details.get('amount')}}
            else:
              raise HTTPException(status_code=500, detail="Couldn't Disburse Loan")
      else:
          #error
          raise HTTPException(status_code=400, detail="Invalid Address")

#returns requested loanAmount if loanAmount < maxLTV, else returns maxLTV
async def calculateLoanAmount(loan, collateralDetails, currencies, interest_rates):
      #getPrice from coingecko
      try:
        if(collateralDetails.get('id')=="matic"):
          res = requests.get("https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=usd").json()
          price = res['matic-network']['usd']
        else:
          res = requests.get("https://api.coingecko.com/api/v3/simple/price?ids=chainlink&vs_currencies=usd").json()
          price = res['chainlink']['usd']
      except:
        return HTTPException(status_code=500, detail="Something went wrong")

      with open('payment/paymentmethods.json') as file:
          payment_method = [payment_method for payment_method in json.load(file) if payment_method.get('paymentMethodId') == loan[3]][0]
      fx = [currency for currency in currencies if currency.get('id')==payment_method.get('currency')][0].get('fx')*10**8
      collateral_local_fiat = int((price*fx*int(loan[1]))/10**collateralDetails.get('decimals'))
      interest_rate = interest_rates.get(str(loan[4]))[0]*10**8
      if(int(loan[2]) < collateralDetails.get('maxLTV') * collateral_local_fiat and loan[2] > 0 ):
        return {"amount":loan[2],"interest_rate":int(interest_rate),"fx_rate":int(fx),'payment_method':payment_method}
      else:
        return {"amount":int(collateralDetails.get('maxLTV') * collateral_local_fiat),"interest_rate":int(interest_rate),"fx_rate":int(fx),'payment_method':payment_method}

#callback after loan disbursement
#not secure but sufficient for demonstration
#tokenization, use of tx query, filter safaricom ips etc
@app.post('/B2CSend/{loan_id}/{contract_address}')
async def B2CCallBack(loan_id, contract_address, data: dict = Body()):
      result = data.get('Result')
      if (result.get('ResultCode') == 0):
        #success
        result_parameters = result.get('ResultParameters')
        payment_object = [obj for obj in result_parameters.get('ResultParameter') if obj.get('Key') == "TransactionAmount"][0]
        amount = payment_object.get('Value')

        w3 = Web3(Web3.HTTPProvider(config("ALCHEMY_URL")))
        contract_details = {}
        with open('loanconfig/loanconfig.json') as file:
            contract_details = [contract for contract in json.load(file).get('collateral') if contract.get('bitkopaContractAddress') == str(contract_address)][0]
        bitkopa_contract = w3.eth.contract(address=contract_details.get('bitkopaContractAddress'), abi=contract_details.get('bitkopaContractABI'))

        #retrieve loan to process
        loan = bitkopa_contract.functions.getLoan(int(loan_id)).call()

        #check loan status -0 Active, 1 Completed, 2 Liquidated, 3 Requested
        if(not int(loan[9]) == 3):
          return {'data':{'processed':True, 'loanId':loan[9]}}

        with open('loanconfig/loanconfig.json') as file:
            currencies = json.load(file).get('currencies')

        with open('loanconfig/loanconfig.json') as file:
            interest_rates = json.load(file).get('interestrates')

        with open('payment/paymentmethods.json') as file:
            payment_method = [payment_method for payment_method in json.load(file) if payment_method.get('paymentMethodId') == loan[3]][0]
        fx_rate = [currency for currency in currencies if currency.get('id')==payment_method.get('currency')][0].get('fx')*10**8
        interest_rate = interest_rates.get(str(loan[4]))[0]*10**8

        #submit new tx
        nonce = w3.eth.get_transaction_count(config('ADMIN'))

        #Build tx for processLoanRequest
        tx = bitkopa_contract.functions.processLoanRequest(int(loan[0]),int(amount),int(interest_rate),int(fx_rate)).buildTransaction({
            'chainId':80001,
            'gas':2500000,
            'maxFeePerGas':w3.toWei('2','gwei'),
            'maxPriorityFeePerGas':w3.toWei('2','gwei'),
            'nonce':nonce
        })
        #sign with private key
        signed_tx = w3.eth.account.sign_transaction(tx, config('PRIVATE_KEY'))

        #send signed_tx
        w3.eth.send_raw_transaction(signed_tx.rawTransaction)

      return {"ResponseCode": "00000000","ResponseDesc": "success"}

#not secured, for demo purposes only
@app.post('/stkCallBack/{loan_id}/{contract_address}')
async def stkCallBack(loan_id, contract_address, data: dict=Body()):
      result = data.get('Body').get('stkCallback')
      if(result.get('ResultCode') == 0):
          #success
          callback_metadata = result.get('CallbackMetadata')
          payment_object = [obj for obj in callback_metadata.get('Item') if obj.get('Name') == "Amount"][0]
          amount = payment_object.get('Value')
          w3 = Web3(Web3.HTTPProvider(config("ALCHEMY_URL")))
          contract_details = {}
          with open('loanconfig/loanconfig.json') as file:
              contract_details = [contract for contract in json.load(file).get('collateral') if contract.get('bitkopaContractAddress') == str(contract_address)][0]
          bitkopa_contract = w3.eth.contract(address=contract_details.get('bitkopaContractAddress'), abi=contract_details.get('bitkopaContractABI'))

          #retrieve loan to process
          loan = bitkopa_contract.functions.getLoan(int(loan_id)).call()

          #check loan status -0 Active, 1 Completed, 2 Liquidated, 3 Requested
          if(not int(loan[9]) == 0):
            return {'data':{'details':'Loan Is Not Active', 'loanId':loan[0], 'status':loan[9]}}

          #submit new tx
          nonce = w3.eth.get_transaction_count(config('ADMIN'))

          #Build tx for processLoanRequest
          tx = bitkopa_contract.functions.Repayment(int(loan[0]),int(amount)).buildTransaction({
              'chainId':80001,
              'gas':2500000,
              'maxFeePerGas':w3.toWei('2','gwei'),
              'maxPriorityFeePerGas':w3.toWei('2','gwei'),
              'nonce':nonce
          })
          #sign with private key
          signed_tx = w3.eth.account.sign_transaction(tx, config('PRIVATE_KEY'))

          #send signed_tx
          w3.eth.send_raw_transaction(signed_tx.rawTransaction)
      return {"ResponseCode": "00000000","ResponseDesc": "success"}
