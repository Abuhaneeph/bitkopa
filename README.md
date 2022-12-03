# Bitkopa
![alt text](https://github.com/freelancer254/bitkopa/blob/main/images/bitkopabanner2.JPG?raw=true)
Bitkopa offers crypto backed loans for local fiat. Users are able to request and pay for loans in their own local currency 
or currency of choice. Bitkopa runs on the Polygon Blockchain and thus supports MATIC as a collateral asset. With bitkopa, 
you can borrow KES against your MATIC without worrying about the USD exchange rate volatility.

##Bitkopa Architecture
![alt text](https://github.com/freelancer254/bitkopa/blob/main/images/BitkopaArchitecture.png?raw=true)
Each supported collateral on Bitkopa is deployed on its own contract, illustrated as Bitkopa Loan Smart Contract. There is a verification smart contract
used to verify the verification status of the accounts interacting with the platform. The frontend allows interaction with the api and smart contracts.
Through the UI, a user can request a loan and manage the collateral. The transparency built in Bitkopa makes this optional. Repayment of loans is done via the api,
only the admin can repay a loan on behalf of the user. Fiat disbursements and repayments are facilitated by payment processors, in this case, Mpesa. To mitigate risk 
to the platform, when the loan to value (LTV) reaches the liquidation threshold, collateral is liquidated through Uniswap V3.
This is facilitated by chainlink automation services.

## Demo
#Demostrating How to Request A Loan
![alt text](https://github.com/freelancer254/bitkopa/blob/main/images/request.gif?raw=true)

#Demostrating How to Repay A Loan
![alt text](https://github.com/freelancer254/bitkopa/blob/main/images/repay.gif?raw=true)
## To get started, head to:
```
https://bitkopa.com
```
* [https://bitkopa.com](https://bitkopa.com\
You will need testnet MATIC or LINK\
You will then require to verify your account, verification is instant\
You can also import the demo user with some testnet tokens\
private key: f2c146e00410c958418bcfce240ffe13fba9d30de7b3b77cfb32a6d5d4a79689


## Request RandomWords
To make the post request, you must first be authenticated.

## Built With

* [Polygon Network](https://polygon.technology/) - Smart Contract Deployment
* [chainlink services](https://chain.link/) - Automation
* [Solidity](https://docs.soliditylang.org/en/v0.8.7/) - The smart contract language
* [web3py](https://web3py.readthedocs.io/en/stable/) - For smart contract interaction
* [ethers js](https://docs.ethers.io/v5/) - For smart contract interaction
* [Quasar Framework](https://quasar.dev/) - For template styling and responsiveness
* [FastAPI Framework](https://fastapi.tiangolo.com/) - For the api
* [Deta](https://deta.sh/) - For the cloud hosting
* [Mpesa](https://developer.safaricom.co.ke/) - For payment processing

## Authors

* **Robert Mutua** - *Buidling on web3* - [freelancer254](https://github.com/freelancer254)



## Acknowledgments

* Polygon Bootcamp Africa Team
* All the students in the polygon bootcamp
* All the speakers and tutors




