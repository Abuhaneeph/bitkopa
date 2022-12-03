from decouple import config
from mpesa.api import Mpesa
import requests


async def disburse_loan(amount:int, account_number:str, loan_id:str, contract_address:str):
  #send API request to Mpesa with B2C credentials*

  mpesa_client = Mpesa()
  payload = {
    "AccessToken": mpesa_client.getAccessToken(config('consumer_key2'), config('consumer_secret2')),
    "InitiatorName":config('Initiator2'),
    "SecurityCredential":config('SecurityCredential2'),
    "Amount":amount,
    "PartyA":config('shortcode2'),
    "PartyB":account_number,
    "Remarks":"Mpesa Payment",
    "ResultURL":config('B2CSendResultURL') +loan_id +'/'+ contract_address +'/',
    "QueueTimeOutURL":config('queueTimeoutURL'),
    "Occassion":"Payment"
  }

  if(config('LIVE_TRANSACTION', cast=bool)):
    response = mpesa_client.B2CSend(payload)
    #wait for the response
    if "OriginatorConversationID" in response:
        return True
    else:
        return False
  else:
      #simulate transaction
      generic_tx = {
        "Result": {
            "ResultType": 0,
            "ResultCode": 0,
            "ResultDesc": "The service request is processed successfully.",
            "OriginatorConversationID": "2279-45766216-1",
            "ConversationID": "AG_20221203_20406bc3fea04264b677",
            "TransactionID": "QL3588VF3P",
            "ResultParameters": {
                "ResultParameter": [
                    {
                        "Key": "TransactionAmount",
                        "Value": amount
                    },
                    {
                        "Key": "TransactionReceipt",
                        "Value": "QL3588VF3P"
                    },
                    {
                        "Key": "ReceiverPartyPublicName",
                        "Value": "254701093757 - ROBERT MUTUA"
                    },
                    {
                        "Key": "TransactionCompletedDateTime",
                        "Value": "03.12.2022 10:21:11"
                    },
                    {
                        "Key": "B2CUtilityAccountAvailableFunds",
                        "Value": 29.88
                    },
                    {
                        "Key": "B2CWorkingAccountAvailableFunds",
                        "Value": 1450
                    },
                    {
                        "Key": "B2CRecipientIsRegisteredCustomer",
                        "Value": "Y"
                    },
                    {
                        "Key": "B2CChargesPaidAccountAvailableFunds",
                        "Value": 0
                    }
                ]
            },
            "ReferenceData": {
                "ReferenceItem": {
                    "Key": "QueueTimeoutURL",
                    "Value": "http://internalapi.safaricom.co.ke/mpesa/b2cresults/v1/submit"
                }
            }
        }
    }
      url = config('B2CSendResultURL') +loan_id +'/'+ contract_address +'/'
      requests.post(url,json=generic_tx)
      return True

async def initiate_loan_repayment(amount:int, account_number:str,loan_id:str,contract_address:str):
      #send an API request to initiate deposit
      mpesa_client = Mpesa()
      payload = {
        "AccessToken": mpesa_client.getAccessToken(config('consumer_key'), config('consumer_secret')),
        "BusinessShortCode":config('shortcode'),
        "Password":mpesa_client.encodePassword(config('shortcode'), config('passkey')),
        "Amount":amount,
        "PartyA":account_number,
        "PartyB":config('shortcode'),
        "PhoneNumber":account_number,
        "CallBackURL":config('stkCallBackURL')+loan_id +'/'+ contract_address +'/',
        "AccountReference":loan_id,
        "TransactionDesc":'Mpesa Deposit'
      }
      if(config('LIVE_TRANSACTION', cast=bool)):
        response = mpesa_client.stkPush(payload)
        if "responseCode" in response:
          return True
        else:
          return False
      else:
        generic_tx = {
        "Body": {
        "stkCallback": {
          "MerchantRequestID": "29115-34620561-1",
          "CheckoutRequestID": "ws_CO_191220191020363925",
          "ResultCode": 0,
          "ResultDesc": "The service request is processed successfully.",
          "CallbackMetadata": {
              "Item": [{
                "Name": "Amount",
                "Value": amount
              },
              {
                "Name": "MpesaReceiptNumber",
                "Value": "NLJ7RT61SV"
              },
              {
                "Name": "TransactionDate",
                "Value": 20191219102115
              },
              {
                "Name": "PhoneNumber",
                "Value": account_number
              }]
          }
        }
    }
        }
        url = config('stkCallBackURL')+loan_id+'/'+contract_address+'/'
        requests.post(url, json=generic_tx)
        return True



