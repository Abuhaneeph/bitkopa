import { defineStore } from "pinia";
import { ethers } from "ethers";
import { Notify, Dialog } from "quasar";
import { api } from "src/boot/axios";

export const useBitkopaStore = defineStore("bitkopa", {
  state: () => ({
    userDetails: {
      firstName: "Robert",
      lastName: "Mutua",
      id: "12345678",
      address: "254 Westlands, Nairobi",
      phone: "+254700102030",
      email: "robert@bitkopa.com",
      telegram: "@roba_bitkopa",
      pushNotifications: "Enabled",
      mobileMoney: { network: "Mpesa Kenya", accountNumber: "0700102030" },
      mobileMoney2: {
        network: "Airtel Money Kenya",
        accountNumber: "0780302010",
      },
      bankDetails: {
        bankName: "Equity Bank Limited",
        accountNumber: "06102030405060",
      },
    },
    supportDetails: {
      phone: "+254790010203 / +254789567890",
      email: "support@bitkopa.com",
      telegram: "@bitkopa",
      twitter: "@bitkopa_official",
    },
    ALCHEMY_RPC:
      "https://polygon-mumbai.g.alchemy.com/v2/YC_ogGK1wPt-Pys1FcJHq0FMZxc0bRGl",
    connected: false,
    verified: false,
    allSupportedTokens: [],
    verificationContract: { address: "", abi: [] },
    erc20ABI: [],
    aggregatorABI: [],
    showBanner: false,
    showSpinner: false,
    txDialog: false,
    tx_hash: "",
    tx_status: false,
    account: "",
    userAccount: "",
    tokenPrices: {},
    tokenBalances: {},
    tokenAllowances: {},
    loanTerms: {},
    selectedCurrency: {},
    selectedLoanDuration: "",
    selectedCollateral: {},
    selectedInterestRate: [],
    selectedLoan: {},
    borrowAmount: "",
    collateralAmount: "",
    finalBorrowAmount: "",
    repayFiatAmount: "",
    topUpCollateralAmount: "",
    excessCollateralAmount: "",
    finalCollateralAmount: "",
    loanAmountSpinner: false,
    collateralAmountSpinner: false,
    loanEstimation: { interest: 0, totalAmount: "", liquidationPrice: 0 },
    paymentMethods: [],
    selectedPaymentMethod: {},
    loanStatus: { Active: 0, Completed: 1, Liquidated: 2, Requested: 3 },
    loans: { active: [], requested: [], completed: [], liquidated: [] },
    re: new RegExp("^-?\\d+(?:.\\d{0," + (6 || -1) + "})?"),
    totalLoanAmount: 0,
    totalCollateralAmount: 0,
    transactions: [],
    fromBlockNumber: 29393400,
    lastRequesttimestamp: 0,
  }),
  getters: {},
  actions: {
    async listenForEvents(_provider) {
      let i = 0;
      let allSupportedTokens = this.allSupportedTokens;

      for (i in allSupportedTokens) {
        //bitkopaLoanContract
        const bitkopaLoanContract = new ethers.Contract(
          allSupportedTokens[i].bitkopaContractAddress,
          allSupportedTokens[i].bitkopaContractABI,
          _provider
        );

        let filter1 = bitkopaLoanContract.filters.LoanProcessed(
          this.userAccount
        );
        let filter2 = bitkopaLoanContract.filters.LoanRepayment(
          this.userAccount
        );

        let filter3 = bitkopaLoanContract.filters.CollateralLiquidation(
          this.userAccount
        );
        let filter4 = bitkopaLoanContract.filters.LoanRequest(this.userAccount);

        bitkopaLoanContract.on(filter1, () => {
          //reset the loans first
          this.loans = {
            active: [],
            requested: [],
            completed: [],
            liquidated: [],
          };
          this.totalLoanAmount = 0;
          this.totalCollateralAmount = 0;
          //update loans
          this.getLoans(_provider);
          //notify user
          Notify.create({
            type: "positive",
            position: "top",
            message: `Your loan request has been processed`,
            icon: "task_alt",
            caption: `Enjoy Bitkopa Services`,
            timeout: 50000,
          });
        });
        bitkopaLoanContract.on(filter2, () => {
          //reset the loans first
          this.loans = {
            active: [],
            requested: [],
            completed: [],
            liquidated: [],
          };
          this.totalLoanAmount = 0;
          this.totalCollateralAmount = 0;
          //update loans
          this.getLoans(_provider);
          //notify user
          Notify.create({
            type: "positive",
            position: "top",
            message: `Your loan repayment has been received and processed`,
            icon: "task_alt",
            caption: `Enjoy Bitkopa Services`,
            timeout: 50000,
          });
        });
        bitkopaLoanContract.on(filter3, () => {
          //reset the loans first
          this.loans = {
            active: [],
            requested: [],
            completed: [],
            liquidated: [],
          };
          this.totalLoanAmount = 0;
          this.totalCollateralAmount = 0;
          //update loans
          this.getLoans(_provider);
          //notify user
          Notify.create({
            type: "warning",
            position: "top",
            message: `Your collateral has been liquidated to repay your loan`,
            icon: "warning",
            caption: `Contact Us For Any Inquiry`,
            timeout: 50000,
          });
        });
        bitkopaLoanContract.on(
          filter4,
          (borrower, refBorrower, loanId, duration, collateralAmount) => {
            //reset the loans first
            this.loans = {
              active: [],
              requested: [],
              completed: [],
              liquidated: [],
            };
            this.totalLoanAmount = 0;
            this.totalCollateralAmount = 0;
            //update loans
            this.getLoans(_provider);

            let data = {
              address: String(bitkopaLoanContract.address),
              loanId: String(parseInt(loanId)),
            };
            api.post("/process_loan", data);
          }
        );
      }
    },
    async fetchTransactions(provider) {
      const _provider = new ethers.providers.JsonRpcProvider(this.ALCHEMY_RPC);
      const _provider2 = provider;
      let i = 0;
      let allSupportedTokens = this.allSupportedTokens;

      for (i in allSupportedTokens) {
        //bitkopaLoanContract
        const bitkopaLoanContract = new ethers.Contract(
          allSupportedTokens[i].bitkopaContractAddress,
          allSupportedTokens[i].bitkopaContractABI,
          _provider
        );
        const bitkopaLoanContract2 = new ethers.Contract(
          allSupportedTokens[i].bitkopaContractAddress,
          allSupportedTokens[i].bitkopaContractABI,
          _provider2
        );
        let filter0 = bitkopaLoanContract.filters.LoanRequest(this.userAccount);
        let filter1 = bitkopaLoanContract.filters.LoanProcessed(
          this.userAccount
        );
        let filter2 = bitkopaLoanContract.filters.LoanRepayment(
          this.userAccount
        );

        let filter3 = bitkopaLoanContract.filters.CollateralLiquidation(
          this.userAccount
        );
        let filter4 = bitkopaLoanContract.filters.CollateralRecovery(
          this.userAccount
        );
        let filter5 = bitkopaLoanContract.filters.CollateralTopUp(
          this.userAccount
        );
        let filter6 = bitkopaLoanContract.filters.WithdrawExcessCollateral(
          this.userAccount
        );
        let request_txs;
        let processed_txs;
        let repayment_txs;
        let liquidation_txs;
        let recovery_txs;
        let topup_txs;
        let withdraw_txs;
        //first try using alchemy rpc
        try {
          request_txs = await bitkopaLoanContract.queryFilter(
            filter0,
            this.fromBlockNumber,
            "latest"
          );
          processed_txs = await bitkopaLoanContract.queryFilter(
            filter1,
            this.fromBlockNumber,
            "latest"
          );
          repayment_txs = await bitkopaLoanContract.queryFilter(
            filter2,
            this.fromBlockNumber,
            "latest"
          );
          liquidation_txs = await bitkopaLoanContract.queryFilter(
            filter3,
            this.fromBlockNumber,
            "latest"
          );
          recovery_txs = await bitkopaLoanContract.queryFilter(
            filter4,
            this.fromBlockNumber,
            "latest"
          );
          topup_txs = await bitkopaLoanContract.queryFilter(
            filter5,
            this.fromBlockNumber,
            "latest"
          );
          withdraw_txs = await bitkopaLoanContract.queryFilter(
            filter6,
            this.fromBlockNumber,
            "latest"
          );
        } catch {
          // if there is an error, use metamask
          request_txs = await bitkopaLoanContract2.queryFilter(
            filter0,
            -3500,
            "latest"
          );
          processed_txs = await bitkopaLoanContract2.queryFilter(
            filter1,
            -3500,
            "latest"
          );
          repayment_txs = await bitkopaLoanContract2.queryFilter(
            filter2,
            -3500,
            "latest"
          );
          liquidation_txs = await bitkopaLoanContract2.queryFilter(
            filter3,
            -3500,
            "latest"
          );
          recovery_txs = await bitkopaLoanContract2.queryFilter(
            filter4,
            -3500,
            "latest"
          );
          topup_txs = await bitkopaLoanContract2.queryFilter(
            filter4,
            -3500,
            "latest"
          );
          withdraw_txs = await bitkopaLoanContract2.queryFilter(
            filter4,
            -3500,
            "latest"
          );
        }

        //loan requests
        let r = 0;
        if (request_txs.length) {
          for (r in request_txs) {
            let block = await request_txs[r].getBlock();
            let details = request_txs[r].args;
            let loan = await bitkopaLoanContract.getLoan(details[2]);
            //symbol, decimals, id
            let tx = Object.assign({
              loanId: details[2],
              assetIcon: allSupportedTokens[i].icon,
              asset: allSupportedTokens[i].symbol,
              timestamp: parseInt(block.timestamp),

              tx_hash: request_txs[r].transactionHash,
              tx_type: "Loan Request",
              tx_amount:
                String(
                  this.formatBalance(
                    String(details[4]),
                    allSupportedTokens[i].decimals
                  )
                ) +
                " " +
                allSupportedTokens[i].symbol,
              collateralAmount:
                String(
                  this.formatBalance(
                    String(details[4]),
                    allSupportedTokens[i].decimals
                  )
                ) +
                " " +
                allSupportedTokens[i].symbol,

              balance:
                "0 " +
                this.paymentMethods[parseInt(loan.paymentMethodId) - 1].symbol,
              status: "Being Processed",
            });
            this.transactions.push(tx);
          }
        }
        //processed loans
        let p = 0;
        if (processed_txs.length) {
          for (p in processed_txs) {
            let details = processed_txs[p].args;
            let loan = details[1];
            //symbol, decimals, id
            let tx = Object.assign({
              loanId: parseInt(loan.loanId),
              assetIcon:
                this.paymentMethods[parseInt(loan.paymentMethodId) - 1]
                  .currencyIcon,
              asset:
                this.paymentMethods[parseInt(loan.paymentMethodId) - 1].symbol,
              timestamp: parseInt(loan.processedTimestamp),

              tx_hash: processed_txs[p].transactionHash,
              tx_type: "Loan Processed",
              tx_amount:
                String(parseInt(loan.loanAmount)) +
                " " +
                this.paymentMethods[parseInt(loan.paymentMethodId) - 1].symbol,
              collateralAmount:
                String(
                  this.formatBalance(
                    String(loan.collateralAmount),
                    allSupportedTokens[i].decimals
                  )
                ) +
                " " +
                allSupportedTokens[i].symbol,

              balance:
                String(parseInt(loan.loanAmount)) +
                " " +
                this.paymentMethods[parseInt(loan.paymentMethodId) - 1].symbol,
              status: "Active",
            });
            this.transactions.push(tx);
          }
        }
        //repayments for  loans
        let j = 0;
        if (repayment_txs.length) {
          for (j in repayment_txs) {
            let block = await repayment_txs[j].getBlock();
            let details = repayment_txs[j].args;
            let loan = details[1];
            //symbol, decimals, id
            let tx = Object.assign({
              loanId: parseInt(loan.loanId),
              assetIcon:
                this.paymentMethods[parseInt(loan.paymentMethodId) - 1]
                  .currencyIcon,
              asset:
                this.paymentMethods[parseInt(loan.paymentMethodId) - 1].symbol,
              timestamp: parseInt(block.timestamp),

              tx_hash: repayment_txs[j].transactionHash,
              tx_type: "Loan Repayment",
              tx_amount:
                String(parseInt(loan.loanAmount)) +
                " " +
                this.paymentMethods[parseInt(loan.paymentMethodId) - 1].symbol,
              collateralAmount:
                String(
                  this.formatBalance(
                    String(loan.collateralAmount),
                    allSupportedTokens[i].decimals
                  )
                ) +
                " " +
                allSupportedTokens[i].symbol,

              balance:
                parseInt(loan.status) === this.loanStatus.Active
                  ? String(
                      parseInt(loan.loanAmount) -
                        loan.repayments.reduce(
                          (partialSum, a) => partialSum + parseInt(a),
                          0
                        )
                    ) +
                    " " +
                    this.paymentMethods[parseInt(loan.paymentMethodId) - 1]
                      .symbol
                  : "0 " +
                    this.paymentMethods[parseInt(loan.paymentMethodId) - 1]
                      .symbol,
              status:
                parseInt(loan.status) === this.loanStatus.Active
                  ? "Active"
                  : "Completed",
            });
            this.transactions.push(tx);
          }
        }
        //liquidated loans
        let k = 0;
        if (liquidation_txs.length) {
          for (k in liquidation_txs) {
            let block = await liquidation_txs[k].getBlock();
            let details = liquidation_txs[k].args;
            let loan = details[2];
            //symbol, decimals, id
            let tx = Object.assign({
              loanId: parseInt(loan.loanId),
              assetIcon:
                this.paymentMethods[parseInt(loan.paymentMethodId) - 1]
                  .currencyIcon,
              asset:
                this.paymentMethods[parseInt(loan.paymentMethodId) - 1].symbol,
              timestamp: parseInt(block.timestamp),

              tx_hash: liquidation_txs[k].transactionHash,
              tx_type: "Loan Liquidation",
              tx_amount:
                String(parseInt(loan.loanAmount)) +
                " " +
                this.paymentMethods[parseInt(loan.paymentMethodId) - 1].symbol,
              collateralAmount:
                String(
                  this.formatBalance(
                    String(loan.collateralAmount),
                    allSupportedTokens[i].decimals
                  )
                ) +
                " " +
                allSupportedTokens[i].symbol,

              balance:
                "0 " +
                this.paymentMethods[parseInt(loan.paymentMethodId) - 1].symbol,
              status: "Liquidated",
            });
            this.transactions.push(tx);
          }
        }
        //recovered loans
        let l = 0;
        if (recovery_txs.length) {
          for (l in recovery_txs) {
            let block = await recovery_txs[l].getBlock();
            let details = recovery_txs[k].args;
            let loan = details[1];
            //symbol, decimals, id
            let tx = Object.assign({
              loanId: parseInt(loan.loanId),
              assetIcon: allSupportedTokens[i].icon,
              asset: allSupportedTokens[i].symbol,
              timestamp: parseInt(block.timestamp),

              tx_hash: recovery_txs[l].transactionHash,
              tx_type: "Recover Collateral",
              tx_amount:
                String(
                  this.formatBalance(
                    String(loan.collateralAmount),
                    allSupportedTokens[i].decimals
                  )
                ) +
                " " +
                allSupportedTokens[i].symbol,
              collateralAmount:
                String(
                  this.formatBalance(
                    String(loan.collateralAmount),
                    allSupportedTokens[i].decimals
                  )
                ) +
                " " +
                allSupportedTokens[i].symbol,

              balance:
                "0 " +
                this.paymentMethods[parseInt(loan.paymentMethodId) - 1].symbol,
              status: "Liquidated",
            });
            this.transactions.push(tx);
          }
        }
        //top up txs

        let t = 0;
        if (topup_txs.length) {
          for (r in topup_txs) {
            let block = await topup_txs[t].getBlock();
            let details = topup_txs[t].args;
            let loan = await bitkopaLoanContract.getLoan(details[2]);
            //symbol, decimals, id
            let tx = Object.assign({
              loanId: parseInt(details[2]),
              assetIcon: allSupportedTokens[i].icon,
              asset: allSupportedTokens[i].symbol,
              timestamp: parseInt(block.timestamp),

              tx_hash: topup_txs[t].transactionHash,
              tx_type: "Loan TopUp",
              tx_amount:
                String(
                  this.formatBalance(
                    String(details[3]),
                    allSupportedTokens[i].decimals
                  )
                ) +
                " " +
                allSupportedTokens[i].symbol,
              collateralAmount:
                String(
                  this.formatBalance(
                    String(details[3]),
                    allSupportedTokens[i].decimals
                  )
                ) +
                " " +
                allSupportedTokens[i].symbol,

              balance:
                String(
                  parseInt(await bitkopaLoanContract.LoanBalance(loan.loanId))
                ) +
                " " +
                this.paymentMethods[parseInt(loan.paymentMethodId) - 1].symbol,
              status: "Active",
            });
            this.transactions.push(tx);
          }
        }
        //withdraw
        let w = 0;
        if (withdraw_txs.length) {
          for (r in withdraw_txs) {
            let block = await withdraw_txs[t].getBlock();
            let details = withdraw_txs[t].args;
            let loan = details[2];
            //symbol, decimals, id
            let tx = Object.assign({
              loanId: parseInt(loan.loanId),
              assetIcon: allSupportedTokens[i].icon,
              asset: allSupportedTokens[i].symbol,
              timestamp: parseInt(block.timestamp),

              tx_hash: withdraw_txs[w].transactionHash,
              tx_type: "Withdraw Excess",
              tx_amount:
                String(
                  this.formatBalance(
                    String(details[1]),
                    allSupportedTokens[i].decimals
                  )
                ) +
                " " +
                allSupportedTokens[i].symbol,
              collateralAmount:
                String(
                  this.formatBalance(
                    String(details[1]),
                    allSupportedTokens[i].decimals
                  )
                ) +
                " " +
                allSupportedTokens[i].symbol,

              balance:
                String(
                  parseInt(loan.loanAmount) -
                    loan.repayments.reduce(
                      (partialSum, a) => partialSum + parseInt(a),
                      0
                    )
                ) +
                " " +
                this.paymentMethods[parseInt(loan.paymentMethodId) - 1].symbol,
              status: "Active",
            });
            this.transactions.push(tx);
          }
        }
      }
    },
    async manageActiveLoan(evt, row) {
      //set the selected loan
      this.selectedLoan = row;
      Dialog.create({
        dark: false,
        title: `Managing Loan ID: ${row.loanId}`,
        message: `What would you like to do?`,
        ok: { push: true, color: "indigo" },
        cancel: { push: true, color: "red" },
        options: {
          type: "radio",
          model: "opt1",
          items: [
            {
              label: "Repay Loan",
              value: "opt1",
              color: "indigo",
            },
            {
              label: `Top Up Collateral`,
              value: "opt2",
              color: "secondary",
            },
            {
              label: `Withdraw Excess Collateral`,
              value: "opt3",
              color: "primary",
            },
          ],
        },
        cancel: true,
        persistent: true,
      })
        .onOk(async (data) => {
          if (data === "opt1") {
            //repay page
            this.router.push("/repay");
          } else if (data === "opt2") {
            //redirect to top up loan page
            this.router.push("/topup");
          } else {
            //go to withdraw excess collateral page
            this.router.push("/withdraw");
          }
        })
        .onCancel(() => {
          //do nothing

          return false;
        });
    },
    countdownActiveLoans() {
      let loans = this.loans.active;
      let i = 0;
      if (loans.length) {
        for (i in loans) {
          let timeDiff =
            parseInt(loans[i].processedTimestamp * 1000) +
            parseInt(loans[i].duration) * (24 * 60 * 60 * 1000) -
            Date.now();

          // Time calculations for days, hours, minutes and seconds
          let days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
          let hours = Math.floor(
            (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          let minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
          let seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
          loans[i].countdown = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }
      }
    },
    async getLoans(_provider) {
      let i = 0;
      let allSupportedTokens = this.allSupportedTokens;

      for (i in allSupportedTokens) {
        //bitkopaLoanContract
        const bitkopaLoanContract = new ethers.Contract(
          allSupportedTokens[i].bitkopaContractAddress,
          allSupportedTokens[i].bitkopaContractABI,
          _provider
        );
        //reset loans

        //get the array of loanIds
        let loanIds = await bitkopaLoanContract.getLoanIds();
        if (loanIds.length) {
          //loop through the loanIds in reverse
          let ids = [...loanIds];
          ids = ids.reverse();
          let j = 0;
          for (j in ids) {
            let loan = await bitkopaLoanContract.getLoan(ids[j]);
            //check if connected account is the borrower

            if (loan.borrower === this.userAccount) {
              //symbol, decimals, id
              let updatedLoan = Object.assign(
                {
                  id: allSupportedTokens[i].id,
                  symbol: allSupportedTokens[i].symbol,
                  decimals: allSupportedTokens[i].decimals,
                  icon: allSupportedTokens[i].icon,
                },
                loan
              );

              //add to loans
              if (loan.status === this.loanStatus.Active) {
                let balance = await bitkopaLoanContract.LoanBalance(
                  updatedLoan.loanId
                );
                let newUpdatedLoan = Object.assign(
                  {
                    balance: balance,
                    countdown: "",
                    ltv: "",
                    liquidationPrice: "",
                    excessCollateral: "",
                  },
                  updatedLoan
                );
                this.loans.active.push(newUpdatedLoan);
                setInterval(this.countdownActiveLoans, 1000);
                await this.calculateCurrentLTV(
                  _provider,
                  newUpdatedLoan,
                  allSupportedTokens[i]
                );
              }
              if (loan.status === this.loanStatus.Completed) {
                this.loans.completed.push(updatedLoan);
              }
              if (loan.status === this.loanStatus.Liquidated) {
                this.loans.liquidated.push(updatedLoan);
              }
              if (loan.status === this.loanStatus.Requested) {
                this.loans.requested.push(updatedLoan);
              }
            }
          }
        }
      }
    },
    async verifyAccount() {
      this.showSpinner = true;
      api.post("/verify", String(this.userAccount)).then(
        (response) => {
          if (response.data.data.verified) {
            this.verified = true;
            this.showSpinner = false;
            Notify.create({
              type: "positive",
              position: "top",
              message: `Verification successful. Verified: ${this.userAccount}`,
              icon: "verified",
              caption: `Enjoy Bitkopa Services`,
              timeout: 5000,
            });
          }
        },
        async (error) => {
          const provider = new ethers.providers.JsonRpcProvider(
            this.ALCHEMY_RPC
          );
          this.verified = await this.checkVerification(this.account, provider);
          this.showSpinner = false;
          if (this.verified) {
            Notify.create({
              type: "positive",
              position: "top",
              message: `Verification successful. Verified: ${this.userAccount}`,
              icon: "verified",
              caption: `Enjoy Bitkopa Services`,
              timeout: 5000,
            });
          } else {
            Notify.create({
              type: "negative",
              position: "top",
              message: `Verification failed. Unverified: ${this.userAccount}`,
              icon: "verified",
              caption: `Try again later`,
              timeout: 5000,
            });
          }
        }
      );
    },
    async changeCurrency(currency) {
      this.selectedCurrency = currency;
      this.calculateCollateralAmount();
    },
    async changePaymentMethod(paymentMethod) {
      this.selectedPaymentMethod = paymentMethod;
    },
    async changeSelectedLoan(loan) {
      this.selectedLoan = loan;
    },
    async setSelectedLoan() {
      this.selectedLoan = this.loans.active[0];
      this.router.push("/repay");
    },
    async setSelectedLoanForTopUp() {
      this.selectedLoan = this.loans.active[0];
      this.router.push("/topup");
    },
    async setSelectedLoanForWithdraw() {
      this.selectedLoan = this.loans.active[0];
      this.router.push("/withdraw");
    },
    async changeLoanDuration(duration) {
      this.selectedLoanDuration = duration;
      this.selectedInterestRate =
        this.loanTerms.interestrates[duration.toString()];
      this.estimateLoanInterest();
    },
    async changeCollateral(collateral) {
      this.selectedCollateral = collateral;
      this.calculateLoanAmount();
    },
    async calculateLoanAmount() {
      this.loanAmountSpinner = true;
      if (this.tokenPrices[this.selectedCollateral.id] === undefined) {
        const provider = new ethers.providers.JsonRpcProvider(this.ALCHEMY_RPC);
        await this.getPrices(provider);
      }
      let fx = this.selectedCurrency.fx;

      let price = this.tokenPrices[this.selectedCollateral.id];

      let priceDecimals =
        this.tokenPrices["decimals" + this.selectedCollateral.id];

      let collateralPriceLocal =
        (this.collateralAmount * price * fx) / 10 ** priceDecimals;
      this.borrowAmount = parseInt(
        this.selectedCollateral.maxLTV * collateralPriceLocal
      );
      this.loanAmountSpinner = false;
      this.estimateLoanInterest();
    },
    async calculateMinAmount() {
      this.loanAmountSpinner = true;
      if (this.tokenPrices[this.selectedCollateral.id] === undefined) {
        const provider = new ethers.providers.JsonRpcProvider(this.ALCHEMY_RPC);
        await this.getPrices(provider);
      }
      let fx = this.selectedCurrency.fx;

      let price = this.tokenPrices[this.selectedCollateral.id];

      let priceDecimals =
        this.tokenPrices["decimals" + this.selectedCollateral.id];

      let collateralPriceLocal =
        (this.selectedCollateral.minCollateral * price * fx) /
        10 ** priceDecimals;
      this.borrowAmount = parseInt(
        this.selectedCollateral.maxLTV * collateralPriceLocal
      );
      this.collateralAmount = this.selectedCollateral.minCollateral;
      this.loanAmountSpinner = false;
      this.estimateLoanInterest();
    },
    async calculateCollateralAmount() {
      this.collateralAmountSpinner = true;
      if (this.tokenPrices[this.selectedCollateral.id] === undefined) {
        const provider = new ethers.providers.JsonRpcProvider(this.ALCHEMY_RPC);
        await this.getPrices(provider);
      }
      let fx = this.selectedCurrency.fx;
      let price = this.tokenPrices[this.selectedCollateral.id];
      let priceDecimals =
        this.tokenPrices["decimals" + this.selectedCollateral.id];
      let collateralPriceLocal = (price * fx) / 10 ** priceDecimals;
      let amount =
        this.borrowAmount /
        collateralPriceLocal /
        this.selectedCollateral.maxLTV;
      this.collateralAmount = this.formatCollateralAmount(amount);
      this.collateralAmountSpinner = false;
      this.estimateLoanInterest();
    },
    async estimateLoanInterest() {
      this.loanEstimation.interest = Math.round(
        (this.selectedInterestRate[1] *
          this.selectedLoanDuration *
          this.borrowAmount) /
          100
      );
      this.loanEstimation.loanAmount = (
        this.loanEstimation.interest + parseInt(this.borrowAmount)
      ).toLocaleString();

      let price = this.tokenPrices[this.selectedCollateral.id];

      let priceDecimals =
        this.tokenPrices["decimals" + this.selectedCollateral.id];

      this.loanEstimation.liquidationPrice = (
        (price * this.selectedCollateral.liquidationThreshold) /
        10 ** priceDecimals
      ).toFixed(4);
    },
    async calculateCurrentLTV(_provider, _loan, collateralDetails) {
      //get the payment method hence fx

      let id = this.paymentMethods[_loan.paymentMethodId - 1].currency;

      let currency = this.loanTerms.currencies.find(
        (currency) => currency.id === id
      );

      let fx = currency.fx;
      if (
        this.tokenPrices[collateralDetails.id] === undefined ||
        this.tokenPrices[collateralDetails.id] === 0
      ) {
        await this.getPrices(_provider);
      }

      let price = this.tokenPrices[collateralDetails.id];

      let priceDecimals = this.tokenPrices["decimals" + collateralDetails.id];

      let collateralPriceLocal =
        (_loan.collateralAmount * price * fx) /
        (10 ** priceDecimals * 10 ** _loan.decimals);

      let ltv = (
        (parseInt(_loan.loanAmount) / collateralPriceLocal) *
        100
      ).toFixed(2);

      this.loans.active.find(
        (loan) =>
          loan.id === collateralDetails.id && loan.loanId === _loan.loanId
      ).ltv = ltv;

      let liquidationPriceUSD =
        (parseInt(price) *
          (parseInt(_loan.loanAmount) / collateralPriceLocal)) /
        (10 ** priceDecimals * collateralDetails.liquidationThreshold);

      this.loans.active.find(
        (loan) =>
          loan.id === collateralDetails.id && loan.loanId === _loan.loanId
      ).liquidationPrice = parseFloat(liquidationPriceUSD).toFixed(4);

      let requiredCollateralLocalFiat =
        parseInt(_loan.loanAmount) * (1 / collateralDetails.maxLTV);

      let excessCollateralLocalFiat = parseInt(
        collateralPriceLocal - requiredCollateralLocalFiat
      );
      let excessCollateralCrypto =
        (excessCollateralLocalFiat * 10 ** priceDecimals) / (price * fx);

      this.loans.active.find(
        (loan) =>
          loan.id === collateralDetails.id && loan.loanId === _loan.loanId
      ).excessCollateral = parseFloat(excessCollateralCrypto).toFixed(6);

      this.totalLoanAmount += parseInt(_loan.balance);
      this.totalCollateralAmount += parseInt(collateralPriceLocal);
    },

    async connectAlchemy() {
      const provider = new ethers.providers.JsonRpcProvider(this.ALCHEMY_RPC);

      //update prices after new block if user has not connected own wallet
      //only update after 5 minutes
      provider.on("block", (blockNumber) => {
        if (
          !this.connected &&
          Date.now() > this.lastRequesttimestamp + 5 * 60 * 1000
        ) {
          this.getPrices(provider);
          this.lastRequesttimestamp = Date.now();
        }
      });
    },
    async connectProvider() {
      // A Web3Provider wraps a standard Web3 provider, which is
      // what MetaMask injects as window.ethereum into each page
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(
          window.ethereum,
          "any"
        );

        // MetaMask requires requesting permission to connect users accounts
        await provider.send("eth_requestAccounts", []);

        // The MetaMask plugin also allows signing transactions to
        // send ether and pay to change state within the blockchain.
        // For this, you need the account signer...
        //this.signer = provider.getSigner();
        const connectedNetwork = await provider.getNetwork();
        const signer = provider.getSigner();
        const userAccount = await signer.getAddress();
        this.userAccount = userAccount;
        this.account = userAccount.slice(0, 4) + "..." + userAccount.slice(-4);

        //----event listeners removed on unMount hook----//
        //listen to accountsChanged event
        window.ethereum.on("accountsChanged", this.handleAccountsChanged);

        //listen to chainChanged event
        ethereum.on("chainChanged", this.handleChainChanged);

        //update prices after new block
        provider.on("block", (blockNumber) => {
          if (this.connected) {
            this.getPrices(provider);
          }
          if (this.connected && this.verified) {
            this.getBalances(provider);
          }
        });

        if (connectedNetwork.chainId === 80001) {
          if (!(this.router.currentRoute.value.path === "/dashboard")) {
            this.connected = false;
            this.verified = false;
            window.location.href = "http://localhost:9000/#/dashboard";
            return false;
          }
          this.connected = true;
          this.showBanner = false;
          this.showSpinner = true;
          this.verified = await this.checkVerification(
            this.userAccount,
            provider
          );
          this.showSpinner = false;
          this.getPrices(provider);
          this.getLoans(provider);
          this.getBalances(provider);

          this.listenForEvents(provider);
          this.fetchTransactions(provider);
        } else {
          this.connected = false;
          this.showBanner = true;
          this.verified = false;
        }
      } else {
        Notify.create({
          type: "negative",
          position: "top",
          message: `MetaMask Not Detected`,
          icon: "error",
          caption: "Install MetaMask from https://metamask.io ",
          timeout: 10000,
        });
      }
    },
    async checkVerification(address, _provider) {
      const BITKOPA_VERIFICATION = new ethers.Contract(
        this.verificationContract.address,
        this.verificationContract.abi,
        _provider
      );
      let status = await BITKOPA_VERIFICATION.checkVerificationStatus(address);
      return status;
    },
    async getPrices(_provider) {
      let i = 0;
      let allSupportedTokens = this.allSupportedTokens;
      for (i in allSupportedTokens) {
        //initialize to 0 if undefined
        if (this.tokenPrices[allSupportedTokens[i].id] === undefined) {
          this.tokenPrices[allSupportedTokens[i].id] = 0;
          this.tokenPrices["decimals" + allSupportedTokens[i].id] = 0;
        }
        const priceFeed = new ethers.Contract(
          allSupportedTokens[i].priceFeedAddress,
          this.aggregatorABI,
          _provider
        );

        let price = await priceFeed.latestRoundData();
        let decimals = await priceFeed.decimals();
        this.tokenPrices[allSupportedTokens[i].id] = price.answer;
        this.tokenPrices["decimals" + allSupportedTokens[i].id] = decimals;
      }
    },
    async switchNetwork(network) {
      try {
        await ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: network.chainId }],
        });
        this.showBanner = false;
      } catch (switchError) {
        if (switchError.code === 4902) {
          try {
            await ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: network.chainId,
                  chainName: network.chainName,
                  rpcUrls: [network.rpcUrl],
                  nativeCurrency: {
                    name: network.name,
                    symbol: network.symbol,
                    decimals: 18,
                  },
                  blockExplorerUrls: [network.blockExplorerUrl],
                },
              ],
            });
            this.showBanner = false;
          } catch (addError) {
            Notify.create({
              type: "negative",
              position: "top",
              message: `Could Not Add ${network.chainName} network. Kindly Add Manually.`,
              icon: "error",
              caption:
                "https://metamask.zendesk.com/hc/en-us/articles/360043227612-How-to-add-a-custom-network-RPC",
              timeout: 10000,
            });
          }
        }
      }
    },

    async getBalances(_provider) {
      let i = 0;
      let allSupportedTokens = this.allSupportedTokens; //to reduce usage of 'this'

      for (i in allSupportedTokens) {
        //Initialize to zero if undefined
        if (this.tokenBalances[allSupportedTokens[i].id] === undefined) {
          this.tokenBalances[allSupportedTokens[i].id] = 0;
        }
        if (allSupportedTokens[i].isERC20) {
          const erc20TokenContract = new ethers.Contract(
            allSupportedTokens[i].erc20Address,
            this.erc20ABI,
            _provider
          );
          let erc20Balance = await erc20TokenContract.balanceOf(
            this.userAccount
          );

          this.tokenBalances[allSupportedTokens[i].id] = this.formatBalance(
            erc20Balance,
            allSupportedTokens[i].decimals
          );
        } else {
          let accountBalance = await _provider.getBalance(this.userAccount);
          this.tokenBalances[allSupportedTokens[i].id] = this.formatBalance(
            accountBalance,
            allSupportedTokens[i].decimals
          );
        }
      }
    },

    async loanRequest() {
      //check loan amount is valid
      if (
        !this.finalBorrowAmount ||
        !parseFloat(this.finalBorrowAmount) > 0 ||
        Number.isNaN(this.finalBorrowAmount)
      ) {
        Notify.create({
          type: "negative",
          position: "top",
          message: "Error initiating transaction: Invalid Loan Amount",
          icon: "error",
          caption: `Kindly check the amount`,
          timeout: 5000,
        });
        return false;
      }
      //check collateral amount is valid
      if (
        !this.finalCollateralAmount ||
        !parseFloat(this.finalCollateralAmount) > 0 ||
        Number.isNaN(this.finalCollateralAmount)
      ) {
        Notify.create({
          type: "negative",
          position: "top",
          message: "Error initiating transaction: Invalid Collateral Amount",
          icon: "error",
          caption: `Kindly check the amount`,
          timeout: 5000,
        });
        return false;
      }

      //check collateral amount is not > balance
      if (
        this.finalCollateralAmount >
        this.tokenBalances[this.selectedCollateral.id]
      ) {
        Notify.create({
          type: "negative",
          position: "top",
          message: "Transaction will likely fail, not enough collateral",
          icon: "error",
          caption: `Kindly check the amount`,
          timeout: 5000,
        });
        return false;
      }
      //check collateral amount is < minCollateral
      if (this.finalCollateralAmount < this.selectedCollateral.minCollateral) {
        Notify.create({
          type: "negative",
          position: "top",
          message: "Transaction will likely fail, not enough collateral",
          icon: "error",
          caption: `Kindly check the amount`,
          timeout: 5000,
        });
        return false;
      }
      // get the provider and signer
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );
      // MetaMask requires requesting permission to connect users accounts
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();

      // get erc20 token if collateral isERC20
      if (this.selectedCollateral.isERC20) {
        const erc20TokenContract = new ethers.Contract(
          this.selectedCollateral.erc20Address,
          this.erc20ABI,
          signer
        );

        //check the allowance of the controller contract
        let allowance = await erc20TokenContract.allowance(
          this.userAccount,
          this.selectedCollateral.bitkopaContractAddress
        );

        allowance = parseFloat(
          ethers.utils.formatUnits(allowance, this.selectedCollateral.decimals)
        ).toFixed(6);
        if (this.tokenAllowances[this.selectedCollateral.id] === undefined) {
          this.tokenAllowances[this.selectedCollateral.id] = allowance;
        }
        if (
          parseFloat(this.finalCollateralAmount) > allowance &&
          parseFloat(this.finalCollateralAmount) >
            this.tokenAllowances[this.selectedCollateral.id]
        ) {
          //show the approval dialog
          //let user choose exact amount or unlimited
          //show alot of information so that user understands
          Dialog.create({
            dark: false,
            title: `Approve Bitkopa Loan Contract To Spend Your ${this.selectedCollateral.symbol}`,
            message: `The Bitkopa Loan contract requires you to give it permission to access your ${this.selectedCollateral.symbol}.`,
            ok: { push: true, color: "indigo" },
            cancel: { push: true, color: "red" },
            options: {
              type: "radio",
              model: "opt1",
              items: [
                {
                  label: "UNLIMITED : Approve Once",
                  value: "opt1",
                  color: "indigo",
                },
                {
                  label: `Exact (${this.finalCollateralAmount} ${this.selectedCollateral.symbol})`,
                  value: "opt2",
                  color: "secondary",
                },
              ],
            },
            cancel: true,
            persistent: true,
          })
            .onOk(async (data) => {
              //request allowance increase based on option
              let newAllowance = 0;
              if (data === "opt1") {
                //1000 trillion - UNLIMITED
                newAllowance = "1000000000000000";
              } else {
                newAllowance = "" + _amount;
              }
              try {
                let newAllowanceString = ethers.utils.parseUnits(
                  newAllowance,
                  this.selectedCollateral.decimals
                );
                const tx = await erc20TokenContract.approve(
                  this.selectedCollateral.bitkopaContractAddress,
                  newAllowanceString
                );
                this.tx_hash = tx.hash;
                this.tx_status = false;
                this.txDialog = true;
                await tx.wait();

                //update token allowance
                this.tokenAllowances[this.selectedCollateral.id] =
                  parseFloat(newAllowance);

                this.tx_status = true;

                Notify.create({
                  type: "positive",
                  position: "top",
                  message: `Approval successful. Proceed with your loan request`,
                  icon: "done",
                  caption: `You can now use ${this.selectedCollateral.symbol} as collateral`,
                  timeout: 5000,
                });

                setTimeout(() => {
                  this.txDialog = false;
                }, 3000);

                return true;
              } catch (err) {
                Notify.create({
                  type: "negative",
                  position: "top",
                  message:
                    "Error initiating transaction. Transaction cancelled.",
                  icon: "error",
                  caption: `You must approve before requesting a loan`,
                  timeout: 5000,
                });
                return false;
              }
            })
            .onCancel(() => {
              //show notification
              Notify.create({
                type: "negative",
                position: "top",
                message: "Error initiating transaction. Transaction cancelled.",
                icon: "error",
                caption: `You must approve before requesting a loan`,
                timeout: 5000,
              });
              return false;
            });
        } else {
          //if allowance is okay
          try {
            //initiate deposit for erc20 token
            const bitkopaLoanContract = new ethers.Contract(
              this.selectedCollateral.bitkopaContractAddress,
              this.selectedCollateral.bitkopaContractABI,
              signer
            );
            let amount = "" + this.finalCollateralAmount;
            amount = ethers.utils.parseUnits(
              amount,
              this.selectedCollateral.decimals
            );
            const tx = await bitkopaLoanContract.loanRequest(
              this.finalBorrowAmount,
              this.selectedLoanDuration,
              amount,
              this.selectedPaymentMethod.paymentMethodId
            );

            this.tx_hash = tx.hash;
            this.tx_status = false;
            this.txDialog = true;
            await tx.wait();
            this.tx_status = true;

            //update balances
            this.getBalances(provider);

            //show notification
            Notify.create({
              type: "positive",
              position: "top",
              message: `Loan Request Successful`,
              icon: "payments",
              caption: `Disbursed Loan Amount Depends on Collateral Amount`,
              timeout: 5000,
            });

            return true;
          } catch (err) {
            Notify.create({
              type: "negative",
              position: "top",
              message: "Error! Transaction Failed.",
              icon: "error",
              caption: `Converting failed. Try again`,
              timeout: 5000,
            });
            return false;
          }
        }
      }

      //not erc20
      else {
        try {
          //initiate deposit for MATIC
          const bitkopaLoanContract = new ethers.Contract(
            this.selectedCollateral.bitkopaContractAddress,
            this.selectedCollateral.bitkopaContractABI,
            signer
          );
          let amount = "" + this.finalCollateralAmount;
          amount = ethers.utils.parseUnits(
            amount,
            this.selectedCollateral.decimals
          );
          const tx = await bitkopaLoanContract.loanRequest(
            this.finalBorrowAmount,
            this.selectedLoanDuration,
            this.selectedPaymentMethod.paymentMethodId,
            { value: amount }
          );

          this.tx_hash = tx.hash;
          this.tx_status = false;
          this.txDialog = true;
          await tx.wait();
          this.tx_status = true;

          //update balances
          this.getBalances(provider);

          //show notification
          Notify.create({
            type: "positive",
            position: "top",
            message: `Loan Request Successful`,
            icon: "payments",
            caption: `Disbursed Loan Amount Depends on Collateral Amount`,
            timeout: 5000,
          });

          return true;
        } catch (err) {
          Notify.create({
            type: "negative",
            position: "top",
            message: "Error! Transaction Failed.",
            icon: "error",
            caption: `Converting failed. Try again`,
            timeout: 5000,
          });
          return false;
        }
      }
    },
    async topUpCollateral() {
      //check collateral amount is valid
      if (
        !this.topUpCollateralAmount ||
        !parseFloat(this.topUpCollateralAmount) > 0 ||
        Number.isNaN(this.topUpCollateralAmount)
      ) {
        Notify.create({
          type: "negative",
          position: "top",
          message: "Error initiating transaction: Invalid Collateral Amount",
          icon: "error",
          caption: `Kindly check the amount`,
          timeout: 5000,
        });
        return false;
      }

      //check collateral amount is not > balance
      if (
        this.topUpCollateralAmount > this.tokenBalances[this.selectedLoan.id]
      ) {
        Notify.create({
          type: "negative",
          position: "top",
          message: "Transaction will likely fail, not enough collateral",
          icon: "error",
          caption: `Kindly check the amount`,
          timeout: 5000,
        });
        return false;
      }
      // get the provider and signer
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );
      // MetaMask requires requesting permission to connect users accounts
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();

      //filter collateralDetails
      this.selectedCollateral = this.allSupportedTokens.find(
        (token) => token.id === this.selectedLoan.id
      );

      // get erc20 token if collateral isERC20
      if (this.selectedCollateral.isERC20) {
        const erc20TokenContract = new ethers.Contract(
          this.selectedCollateral.erc20Address,
          this.erc20ABI,
          signer
        );

        //check the allowance of the controller contract
        let allowance = await erc20TokenContract.allowance(
          this.userAccount,
          this.selectedCollateral.bitkopaContractAddress
        );

        allowance = parseFloat(
          ethers.utils.formatUnits(allowance, this.selectedCollateral.decimals)
        ).toFixed(6);
        if (this.tokenAllowances[this.selectedCollateral.id] === undefined) {
          this.tokenAllowances[this.selectedCollateral.id] = allowance;
        }
        if (
          parseFloat(this.finalCollateralAmount) > allowance &&
          parseFloat(this.finalCollateralAmount) >
            this.tokenAllowances[this.selectedCollateral.id]
        ) {
          //show the approval dialog
          //let user choose exact amount or unlimited
          //show alot of information so that user understands
          Dialog.create({
            dark: false,
            title: `Approve Bitkopa Loan Contract To Spend Your ${this.selectedCollateral.symbol}`,
            message: `The Bitkopa Loan contract requires you to give it permission to access your ${this.selectedCollateral.symbol}.`,
            ok: { push: true, color: "indigo" },
            cancel: { push: true, color: "red" },
            options: {
              type: "radio",
              model: "opt1",
              items: [
                {
                  label: "UNLIMITED : Approve Once",
                  value: "opt1",
                  color: "indigo",
                },
                {
                  label: `Exact (${this.finalCollateralAmount} ${this.selectedCollateral.symbol})`,
                  value: "opt2",
                  color: "secondary",
                },
              ],
            },
            cancel: true,
            persistent: true,
          })
            .onOk(async (data) => {
              //request allowance increase based on option
              let newAllowance = 0;
              if (data === "opt1") {
                //1000 trillion - UNLIMITED
                newAllowance = "1000000000000000";
              } else {
                newAllowance = "" + _amount;
              }
              try {
                let newAllowanceString = ethers.utils.parseUnits(
                  newAllowance,
                  this.selectedCollateral.decimals
                );
                const tx = await erc20TokenContract.approve(
                  this.selectedCollateral.bitkopaContractAddress,
                  newAllowanceString
                );
                this.tx_hash = tx.hash;
                this.tx_status = false;
                this.txDialog = true;
                await tx.wait();

                //update token allowance
                this.tokenAllowances[this.selectedCollateral.id] =
                  parseFloat(newAllowance);

                this.tx_status = true;

                Notify.create({
                  type: "positive",
                  position: "top",
                  message: `Approval successful. Proceed with your loan request`,
                  icon: "done",
                  caption: `You can now use ${this.selectedCollateral.symbol} as collateral`,
                  timeout: 5000,
                });

                setTimeout(() => {
                  this.txDialog = false;
                }, 3000);

                return true;
              } catch (err) {
                Notify.create({
                  type: "negative",
                  position: "top",
                  message:
                    "Error initiating transaction. Transaction cancelled.",
                  icon: "error",
                  caption: `You must approve before requesting a loan`,
                  timeout: 5000,
                });
                return false;
              }
            })
            .onCancel(() => {
              //show notification
              Notify.create({
                type: "negative",
                position: "top",
                message: "Error initiating transaction. Transaction cancelled.",
                icon: "error",
                caption: `You must approve before requesting a loan`,
                timeout: 5000,
              });
              return false;
            });
        } else {
          //if allowance is okay
          try {
            //initiate deposit for erc20 token
            const bitkopaLoanContract = new ethers.Contract(
              this.selectedCollateral.bitkopaContractAddress,
              this.selectedCollateral.bitkopaContractABI,
              signer
            );
            let amount = "" + this.topUpCollateralAmount;
            amount = ethers.utils.parseUnits(
              amount,
              this.selectedCollateral.decimals
            );
            const tx = await bitkopaLoanContract.topUpCollateral(
              this.selectedLoan.loanId,
              amount
            );

            this.tx_hash = tx.hash;
            this.tx_status = false;
            this.txDialog = true;
            await tx.wait();
            this.tx_status = true;

            //update balances, loans and redirect to dashboard
            this.getBalances(provider);
            //reset the loans first
            this.loans = {
              active: [],
              requested: [],
              completed: [],
              liquidated: [],
            };
            this.getLoans(provider);
            this.router.push("/dashboard");

            //show notification
            Notify.create({
              type: "positive",
              position: "top",
              message: `Collateral Top Up Successful`,
              icon: "add",
              caption: `Liquidation Price Has Been Lowered`,
              timeout: 5000,
            });

            return true;
          } catch (err) {
            Notify.create({
              type: "negative",
              position: "top",
              message: "Error! Transaction Failed.",
              icon: "error",
              caption: `Top Up Failed. Try again`,
              timeout: 5000,
            });
            return false;
          }
        }
      }

      //not erc20
      else {
        try {
          //initiate deposit for MATIC
          const bitkopaLoanContract = new ethers.Contract(
            this.selectedCollateral.bitkopaContractAddress,
            this.selectedCollateral.bitkopaContractABI,
            signer
          );
          let amount = "" + this.topUpCollateralAmount;
          amount = ethers.utils.parseUnits(
            amount,
            this.selectedCollateral.decimals
          );
          const tx = await bitkopaLoanContract.loanRequest(
            this.selectedLoan.loanId,
            { value: amount }
          );

          this.tx_hash = tx.hash;
          this.tx_status = false;
          this.txDialog = true;
          await tx.wait();
          this.tx_status = true;

          //update balances and loans
          this.getBalances(provider);
          //reset the loans first
          this.loans = {
            active: [],
            requested: [],
            completed: [],
            liquidated: [],
          };
          this.getLoans(provider);
          this.router.push("/dashboard");

          //show notification
          Notify.create({
            type: "positive",
            position: "top",
            message: `Collateral Top Up Successful`,
            icon: "add",
            caption: `Liquidation Price Has Been Lowered`,
            timeout: 5000,
          });

          return true;
        } catch (err) {
          Notify.create({
            type: "negative",
            position: "top",
            message: "Error! Transaction Failed.",
            icon: "error",
            caption: `Top Upfailed. Try again`,
            timeout: 5000,
          });
          return false;
        }
      }
    },
    async withdrawExcessCollateral() {
      //check collateral amount is valid
      if (
        !this.excessCollateralAmount ||
        !parseFloat(this.excessCollateralAmount) > 0 ||
        Number.isNaN(this.excessCollateralAmount)
      ) {
        Notify.create({
          type: "negative",
          position: "top",
          message: "Error initiating transaction: Invalid Collateral Amount",
          icon: "error",
          caption: `Kindly check the amount`,
          timeout: 5000,
        });
        return false;
      }

      //check collateral amount is not > excess collateral
      if (this.excessCollateralAmount > this.selectedLoan.excessCollateral) {
        console.log(this.excessCollateralAmount);
        console.log(this.selectedLoan.excessCollateral);
        Notify.create({
          type: "negative",
          position: "top",
          message: "Transaction will likely fail, not enough collateral",
          icon: "error",
          caption: `Kindly check the amount`,
          timeout: 5000,
        });
        return false;
      }
      // get the provider and signer
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );
      // MetaMask requires requesting permission to connect users accounts
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();

      //filter collateralDetails
      this.selectedCollateral = this.allSupportedTokens.find(
        (token) => token.id === this.selectedLoan.id
      );

      try {
        const bitkopaLoanContract = new ethers.Contract(
          this.selectedCollateral.bitkopaContractAddress,
          this.selectedCollateral.bitkopaContractABI,
          signer
        );
        let amount = "" + this.excessCollateralAmount;
        amount = ethers.utils.parseUnits(
          amount,
          this.selectedCollateral.decimals
        );
        const tx = await bitkopaLoanContract.withdrawExcessCollateral(
          this.selectedLoan.loanId,
          amount
        );

        this.tx_hash = tx.hash;
        this.tx_status = false;
        this.txDialog = true;
        await tx.wait();
        this.tx_status = true;

        //update balances, loans and redirect to dashboard
        this.getBalances(provider);
        //reset the loans first
        this.loans = {
          active: [],
          requested: [],
          completed: [],
          liquidated: [],
        };
        this.getLoans(provider);
        this.router.push("/dashboard");

        //show notification
        Notify.create({
          type: "positive",
          position: "top",
          message: `Collateral Withdrawal Successful`,
          icon: "remove",
          caption: `N/B Liquidation Price Has Changed`,
          timeout: 5000,
        });

        return true;
      } catch (err) {
        Notify.create({
          type: "negative",
          position: "top",
          message: "Error! Transaction Failed.",
          icon: "error",
          caption: `Top Up Failed. Try again`,
          timeout: 5000,
        });
        return false;
      }
    },
    async repayLoan() {
      //check amount is valid number
      if (
        !this.repayFiatAmount ||
        !parseFloat(this.repayFiatAmount) > 0 ||
        Number.isNaN(this.repayFiatAmount)
      ) {
        Notify.create({
          type: "negative",
          position: "top",
          message: "Error initiating transaction: Invalid Amount",
          icon: "error",
          timeout: 5000,
        });
        return false;
      }
      //check amount is > balance
      if (
        parseInt(this.repayFiatAmount) > parseInt(this.selectedLoan.balance)
      ) {
        Notify.create({
          type: "negative",
          position: "top",
          message: "Error initiating transaction: Amount Exceeds Loan Balance",
          icon: "error",
          timeout: 5000,
        });
        return false;
      }
      //send a post request to the api
      let collateral = this.allSupportedTokens.find(
        (token) => token.id == this.selectedLoan.id
      );
      api.post("/repay_loan", {
        amount: parseInt(this.repayFiatAmount),
        loanId: String(parseInt(this.selectedLoan.loanId)),
        address: String(collateral.bitkopaContractAddress),
        paymentMethodId: this.selectedPaymentMethod.paymentMethodId,
      });

      this.router.push("/dashboard");
      Notify.create({
        type: "positive",
        position: "top",
        message: `Your Repayment Request Is Being Processed`,
        icon: "pending",
        caption: `Enjoy Bitkopa Services`,
        timeout: 3000,
      });
      this.repayFiatAmount = 0;
    },

    //truncates balance/amount to exactly 6 d.p
    formatBalance(_amount, _decimals) {
      var re = new RegExp("^-?\\d+(?:.\\d{0," + (6 || -1) + "})?");
      return parseFloat(
        ethers.utils.formatUnits(_amount, _decimals).toString().match(re)[0]
      );
    },

    formatCollateralAmount(_amount) {
      var re = new RegExp("^-?\\d+(?:.\\d{0," + (6 || -1) + "})?");
      return parseFloat(_amount.toString().match(re)[0]);
    },
    //handles account changes
    async handleAccountsChanged(accounts) {
      //user has changed account
      //warn user
      Notify.create({
        type: "warning",
        position: "top",
        message: `You have changed your wallet. Kindly Connect Wallet`,
        icon: "warning",
        caption: `Connect wallet to use Bitkopa Services `,
        timeout: 3000,
      });
      setTimeout(window.location.reload(), 3500);
    },
    handleChainChanged() {
      //reload
      window.location.reload();
    },
    //remove listeners when unMounted
    stopListener() {
      if (window.ethereum) {
        window.ethereum.removeListener(
          "accountsChanged",
          this.handleAccountsChanged
        );
        window.ethereum.removeListener("chainChanged", this.handleChainChanged);
        const provider = new ethers.providers.Web3Provider(
          window.ethereum,
          "any"
        );
        //remove all listeners
        provider.removeAllListeners();
      }
    },
  },
});
