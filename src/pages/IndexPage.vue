<template>
  <q-page>
    <!-- Info and Calculator -->
    <div class="q-pa-xs row justify-center">
      <!-- info-->
      <div class="col-12 col-md-7 q-pt-lg text-center text-dark">
        <q-card class="section-1 text-dark q-pt-xs" flat>
          <q-card-section horizontal>
            <q-card-section class="q-pt-xs text-dark">
              <div class="section-1 text-dark">
                <q-card
                  flat
                  class="section-1 q-mt-xs q-pt-xs q-px-xl q-mr-xl text-dark text-h6"
                >
                  Bitkopa offers the most flexible, accessible, affordable and
                  transparent crypto backed loans for local fiat. With Bitkopa,
                  you can borrow as much as you want in your local currency. All
                  payments and disbursements are made in your currency. There is
                  no need at all to worry about fluctuation in currency exchange
                  rates. You can borrow NGN or KES using your MATIC!
                </q-card>
                <q-card flat class="section-1 q-mt-xs q-pt-xs text-dark">
                  <q-btn
                    style="pointer-events: none"
                    icon="flag"
                    size="15px"
                    flat
                    class="text-dark q-mr-xs"
                    rounded
                    color="indigo"
                    label="Supporting 50+ countries and 10+ currencies"
                    no-caps
                  />
                  <q-btn
                    style="pointer-events: none"
                    icon="bolt"
                    size="15px"
                    flat
                    class="text-dark q-mr-xs"
                    rounded
                    color="indigo"
                    label="Instant loan disbursement"
                    no-caps
                  />
                  <q-btn
                    style="pointer-events: none"
                    icon="verified"
                    size="15px"
                    flat
                    class="text-dark q-mr-xs"
                    rounded
                    color="indigo"
                    label="Trusted by 10,000+ Bitkopers!"
                    no-caps
                  />
                  <q-btn
                    style="pointer-events: none"
                    icon="percent"
                    size="15px"
                    flat
                    class="text-dark q-mr-xs"
                    rounded
                    color="secondary"
                    label="Affordable, Flexible and Negotiable rates"
                    no-caps
                  />
                  <q-btn
                    style="pointer-events: none"
                    icon="lock"
                    size="15px"
                    flat
                    class="text-dark q-mr-xs"
                    rounded
                    color="secondary"
                    label="Secured by Blockchain and Smart Contracts Technology"
                    no-caps
                  />
                </q-card>
              </div>
              <q-card-actions align="center" class="text-dark q-pa-sm">
                <q-btn
                  to="/dashboard"
                  icon="login"
                  size="12px"
                  outline
                  class="glossy text-dark q-mr-xl"
                  rounded
                  color="indigo"
                  label="Login"
                />
                <q-btn
                  to="/dashboard"
                  icon="how_to_reg"
                  outline
                  size="12px"
                  class="glossy text-dark"
                  rounded
                  color="indigo"
                  label="Register"
                />
              </q-card-actions>
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>
      <!-- loan calculator -->
      <div
        class="col-12 col-md-5 section-1 q-pt-lg q-pr-xl text-center text-dark"
      >
        <q-card elevated bordered class="section-1 q-pt-lg">
          <!-- button label -->
          <q-card-section>
            <div class="row items-center no-wrap">
              <div class="col">
                <q-btn
                  style="pointer-events: none"
                  icon="calculate"
                  size="12px"
                  push
                  outline
                  color="indigo"
                  label="Bitkopa Loan Calculator"
                  no-caps
                />
              </div>

              <div class="col-auto">
                <q-btn color="grey-7" round flat icon="more_vert">
                  <q-menu cover auto-close>
                    <q-list>
                      <q-item clickable to="/dashboard">
                        <q-item-section>Request Loan</q-item-section>
                      </q-item>
                      <q-item clickable to="/dashboard">
                        <q-item-section>Repay Loan</q-item-section>
                      </q-item>
                      <q-item clickable to="/support">
                        <q-item-section>Support</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </div>
            </div>
          </q-card-section>

          <q-card-section>
            <!-- loan amount, currency, duration -->
            <q-input
              outlined
              :loading="bitkopaStore.loanAmountSpinner"
              v-model="bitkopaStore.borrowAmount"
              label-color="dark"
              label="I want to borrow... "
              input-class="text-dark text-bold text-h6"
              clearable
              stack-label
              :dense="dense"
              @keyup="bitkopaStore.calculateCollateralAmount"
              @clear="bitkopaStore.calculateCollateralAmount"
            >
              <template v-slot:append>
                <q-btn
                  outline
                  rounded
                  no-caps
                  color="indigo"
                  label="Min"
                  size="10px"
                  @click="bitkopaStore.calculateMinAmount"
                ></q-btn>
                <q-btn-dropdown split color="dark" flat no-caps>
                  <template v-slot:label>
                    <div class="row items-center no-wrap">
                      <q-icon
                        left
                        rounded
                        :name="`img:countries/${bitkopaStore.selectedCurrency.icon}`"
                      />
                      <div class="text-center">
                        {{ bitkopaStore.selectedCurrency.symbol }}
                      </div>
                    </div>
                  </template>
                  <q-list
                    v-for="currency in bitkopaStore.loanTerms.currencies"
                    :key="currency.id"
                  >
                    <q-item
                      clickable
                      v-close-popup
                      @click="bitkopaStore.changeCurrency(currency)"
                    >
                      <q-item-section avatar>
                        <q-avatar
                          :icon="`img:countries/${currency.icon}`"
                          color="white"
                          text-color="white"
                        />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>{{ currency.symbol }}</q-item-label>
                        <q-item-label caption>{{
                          currency.fullName
                        }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>
                <q-btn-dropdown split color="dark" flat no-caps>
                  <template v-slot:label>
                    <div class="row items-center no-wrap">
                      <q-icon left name="date_range" />
                      <div class="text-center">
                        <q-space></q-space
                        >{{ bitkopaStore.selectedLoanDuration }} days
                      </div>
                    </div>
                  </template>

                  <q-list
                    v-for="duration in bitkopaStore.loanTerms.duration"
                    :key="duration"
                  >
                    <q-item
                      clickable
                      v-close-popup
                      @click="bitkopaStore.changeLoanDuration(duration)"
                    >
                      <q-item-section>
                        <q-item-label>{{ duration }} days</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>
              </template>
            </q-input>
            <div><q-icon name="swap_vert" size="50px"></q-icon></div>
            <!-- collateral amount, type -->
            <q-input
              outlined
              :loading="bitkopaStore.collateralAmountSpinner"
              v-model="bitkopaStore.collateralAmount"
              label-color="dark"
              label="I will supply... "
              input-class="text-dark text-bold text-h6"
              clearable
              stack-label
              :dense="dense"
              @keyup="bitkopaStore.calculateLoanAmount"
              @clear="bitkopaStore.calculateLoanAmount"
            >
              <template v-slot:append>
                <q-btn-dropdown split color="dark" flat no-caps>
                  <template v-slot:label>
                    <div class="row items-center no-wrap">
                      <q-icon
                        left
                        :name="`img:tokens/${bitkopaStore.selectedCollateral.icon}`"
                      />
                      <div class="text-center">
                        {{ bitkopaStore.selectedCollateral.symbol }}
                      </div>
                    </div>
                  </template>
                  <q-list
                    v-for="collateral in bitkopaStore.loanTerms.collateral"
                    :key="collateral.id"
                  >
                    <q-item
                      clickable
                      v-close-popup
                      @click="bitkopaStore.changeCollateral(collateral)"
                    >
                      <q-item-section avatar>
                        <q-avatar
                          :icon="`img:tokens/${collateral.icon}`"
                          color="white"
                          text-color="dark"
                        />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>{{ collateral.symbol }}</q-item-label>
                        <q-item-label caption>{{
                          collateral.fullName
                        }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>
              </template>
            </q-input>
          </q-card-section>

          <!-- interest rates etc -->
          <q-card-section
            v-if="
              bitkopaStore.collateralAmount > 0 && bitkopaStore.borrowAmount > 0
            "
          >
            <q-list>
              <q-item clickable>
                <q-item-section avatar>
                  <q-btn
                    style="pointer-events: none"
                    icon="percent"
                    size="15px"
                    flat
                    class="text-dark q-mr-xs"
                    rounded
                    color="indigo"
                    label="Interest Rate"
                    no-caps
                  />
                </q-item-section>

                <q-item-section side>
                  <q-item-label class="q-px-md text-bold">Hourly</q-item-label>
                  <q-item-label overline class="q-px-md"
                    >{{ bitkopaStore.selectedInterestRate[0] }}%</q-item-label
                  >
                </q-item-section>
                <q-item-section side>
                  <q-item-label class="text-bold q-px-xl">Daily</q-item-label>
                  <q-item-label overline class="q-px-xl"
                    >{{ bitkopaStore.selectedInterestRate[1] }}%</q-item-label
                  >
                </q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section avatar>
                  <q-btn
                    style="pointer-events: none"
                    :icon="`img:countries/${bitkopaStore.selectedCurrency.icon}`"
                    size="15px"
                    flat
                    class="text-dark q-mr-xs"
                    rounded
                    color="indigo"
                    label="Loan Amount"
                    no-caps
                  />
                </q-item-section>

                <q-item-section side>
                  <q-item-label class="q-px-md text-bold"
                    >Interest</q-item-label
                  >
                  <q-item-label overline class="q-px-md"
                    >{{ bitkopaStore.loanEstimation.interest }}
                    {{ bitkopaStore.selectedCurrency.symbol }}</q-item-label
                  >
                </q-item-section>
                <q-item-section side>
                  <q-item-label class="text-bold q-px-xl"
                    >You pay back
                  </q-item-label>
                  <q-item-label overline class="q-px-xl"
                    >{{ bitkopaStore.loanEstimation.loanAmount }}
                    {{ bitkopaStore.selectedCurrency.symbol }}</q-item-label
                  >
                </q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section avatar>
                  <q-btn
                    style="pointer-events: none"
                    icon="warning"
                    size="15px"
                    flat
                    class="text-dark q-mr-xs"
                    rounded
                    color="indigo"
                    label="Liquidation"
                    no-caps
                  />
                </q-item-section>

                <q-item-section side>
                  <q-item-label class="q-px-lg text-bold"
                    >Threshold</q-item-label
                  >
                  <q-item-label overline class="q-px-lg"
                    >{{
                      bitkopaStore.selectedCollateral.liquidationThreshold *
                      100
                    }}%</q-item-label
                  >
                </q-item-section>
                <q-item-section side>
                  <q-item-label class="text-bold q-px-xl"
                    >Liquidation Price</q-item-label
                  >
                  <q-item-label overline class="q-px-xl"
                    >{{
                      bitkopaStore.loanEstimation.liquidationPrice
                    }}
                    USD</q-item-label
                  >
                </q-item-section>
              </q-item>
            </q-list>
            <p class="text-caption" style="color: indigo">
              There is no interest payment for early repayment!
            </p>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Request and Repay Process -->
    <div class="q-pa-xs row justify-center">
      <!-- Request Loan -->
      <div class="col-12 col-md-5 text-center text-dark">
        <q-card class="section-1 text-dark q-pt-lg" flat>
          <q-card-section horizontal>
            <q-card-section class="col-5 flex flex-center">
              <q-img class="rounded-borders" src="images/request.png" />
            </q-card-section>
            <q-card-section class="q-pt-xs">
              <div class="text-h5 q-mt-sm q-mb-xs">
                How to request for a loan
              </div>
              <div class="text-caption text-dark">
                <q-timeline color="secondary">
                  <q-timeline-entry title="Enter Loan Amount" subtitle="Step 1">
                    <div>Specify Local Currency and Loan Duration</div>
                  </q-timeline-entry>

                  <q-timeline-entry
                    title="Select Collateral"
                    subtitle="Step 2"
                    icon="currency_bitcoin"
                  >
                    <div>Specify amount of collateral</div>
                  </q-timeline-entry>

                  <q-timeline-entry>
                    <q-btn
                      to="/dashboard"
                      icon="payments"
                      size="12px"
                      outline
                      class="text-dark"
                      rounded
                      color="indigo"
                      label="Request Loan"
                    />
                  </q-timeline-entry>
                </q-timeline>
              </div>
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>
      <!-- Repay -->
      <div class="col-12 col-md-5 text-center text-dark">
        <q-card class="section-1 text-dark q-pt-lg" flat>
          <q-card-section horizontal>
            <q-card-section class="col-5 flex flex-center">
              <q-img class="rounded-borders" src="images/repay.png" />
            </q-card-section>
            <q-card-section class="q-pt-xs">
              <div class="text-h5 q-mt-sm q-mb-xs">How to repay a loan</div>
              <div class="text-caption text-dark">
                <q-timeline color="secondary">
                  <q-timeline-entry title="Select Loan" subtitle="Step 1">
                    <div>Specify which loan to repay</div>
                  </q-timeline-entry>

                  <q-timeline-entry
                    title="Enter Amount"
                    subtitle="Step 2"
                    icon="monetization_on"
                  >
                    <div>Specify amount to repay or max</div>
                  </q-timeline-entry>

                  <q-timeline-entry>
                    <q-btn
                      to="/dashboard"
                      icon="payments"
                      size="12px"
                      outline
                      class="text-dark"
                      rounded
                      color="indigo"
                      label="Repay Loan"
                    />
                  </q-timeline-entry>
                </q-timeline>
              </div>
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- FAQS and Loan Terms-->
    <div class="q-pa-xs row justify-center">
      <div class="col-12 col-md-5 section-1 text-dark q-pa-md">
        <div class="text-h5 text-bold">FAQs</div>
        <q-list bordered class="rounded-borders">
          <q-expansion-item
            expand-separator
            label="How I do get loans?"
            expand-icon-class="text-dark"
          >
            <q-card class="section-1 text-dark">
              <q-card-section>
                To get Bitkopa loans, you must first be registered and verified.
                Bitkopa requires you to complete KYC (Know Your Customer) to
                able to offer seemless fiat services. This is temporary as we
                transition to decentralized identities such as Polygon ID. Once
                registed and verified, you can now enjoy all Bitkopa services.
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-expansion-item
            expand-separator
            label="How safe is Bitkopa?"
            expand-icon-class="text-dark"
          >
            <q-card class="section-1 text-dark">
              <q-card-section>
                All Bitkopa smart contracts are audited by security companies
                across Africa. Our code is verified and published on the
                blockchain and github repository. Dont trust, verify. We don't
                hold clients' collateral, it is held by the smart contract
                allowing you to verify at any time the state of your collateral.
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-expansion-item
            expand-separator
            label="My Country is not listed"
            expand-icon-class="text-dark"
          >
            <q-card class="section-1 text-dark">
              <q-card-section>
                We are working as fast as we can to include all the countries in
                Africa by 2024. Bitkopa services are already international,
                covering 50+ countries already. Maybe we already offer our
                services in your country, kindly reach out to us.
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-expansion-item
            label="Why would I need to take crypto-backed loans?"
            expand-icon-class="text-dark"
          >
            <q-card class="section-1 text-dark">
              <q-card-section>
                There are various reasons to take crypto backed loans, the first
                being Bitkopa offers you loans in your native currency! As an
                investment, cryptocurrencies can be volatile, instead of selling
                your crypto, you can borrow against it and ride out the
                volatility. You can borrow a loan with your crypto to buy more
                crypto. Beware of over leveraging, your loan might be
                liquidated. You could be travelling to another country and need
                to exchange currencies. There might not be a capital gains tax
                on loans. And the list goes on</q-card-section
              >
            </q-card>
          </q-expansion-item>

          <q-expansion-item
            label="still have more questions?"
            expand-icon-class="text-dark"
          >
            <q-card class="section-1 text-dark">
              <q-card-section>
                If you still have more questions about the loan details, check
                out the next sector. The topic on cryptocurrencies is wide and
                taking loans backed by crypto will take awhile to understand.
                That's why we often offer training and AMA sessions on twitter
                spaces, follow us @bitkopa_official.
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>
      </div>

      <div class="col-12 col-md-5 section-1 text-dark q-pa-md">
        <div class="text-h5 text-bold">Loan Terms</div>
        <q-list bordered class="rounded-borders">
          <q-expansion-item
            expand-separator
            label="What is LTV?"
            expand-icon-class="text-dark"
          >
            <q-card class="section-1 text-dark">
              <q-card-section>
                LTV is Loan to Value ration. A ration of the amount you borrow
                against the collateral you provide. For example, if you borrow
                50,000 NGN and provide $MATIC collateral worth 100,000 NGN, then
                your LTV is 50%. Each collateral type has a different maximum
                LTV, most are at 60%. That is with the same collateral amount,
                the maximum you can borrow is 60,000 NGN.
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-expansion-item
            expand-separator
            label="Bitkopa Loans are overcollaterized?"
            expand-icon-class="text-dark"
          >
            <q-card class="section-1 text-dark">
              <q-card-section>
                Yes. You can only borrow upto a percentage of your collateral
                value. Check above for more information on LTV and collateral.
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-expansion-item
            expand-separator
            label="Loan Durations and Interest Rates"
            expand-icon-class="text-dark"
          >
            <q-card class="section-1 text-dark">
              <q-card-section>
                Bitkopa Loans are short term loans offered with the lowest
                interest rates in the market. Use the loan calculator above and
                see for yourself. The interest rate depends on the loan
                duration. Note that the interest is calculated hourly with the
                minimum duration being 1 hour. There is no interest charged for
                early repayment. Bitkopa loans have an extended duration period
                for each duration, note that during the extended period, the
                interest rate is increased.
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-expansion-item
            label="Loan Repayment and Liquidation Procedure"
            expand-icon-class="text-dark"
          >
            <q-card class="section-1 text-dark">
              <q-card-section>
                The loans are disbursed to your preferred payment method, and so
                you can repay with any of your payment methods that support the
                loan currency. You allowed to make partial repayments. Once a
                loan is fully paid; loan amount plus interest, the collateral is
                automatically transferred to your wallet. In the event the loan
                is expired or the value of the collateral has dropped too much,
                your collateral will be sold to repay your loan. This process is
                called liquidation. To avoid this, you can repay the loan in
                full or partial or top up your collateral. Liquidation occurs on
                the blockchain and once your loan has been settled, the excess
                amount is sent to your selected payment method.
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-expansion-item
            label="Payment Methods, Supported Collaterals and Currencies"
            expand-icon-class="text-dark"
          >
            <q-card class="section-1 text-dark">
              <q-card-section>
                Use the loan calculator to check for the supported payment
                methods, collaterals and currencies.
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>
      </div>
    </div>

    <!-- Connect, Contact, About Us -->
    <div class="q-pa-xs row justify-center">
      <div class="col-12 col-md-10 text-center text-dark q-pa-md">
        <q-card class="section-1" push bordered>
          <q-card-section horizontal>
            <q-card-section class="q-pt-xs">
              <div class="text-h5 text-bold">About Us</div>
              <div class="text-dark">
                Bitkopa is a subsidiary of Mabob Enterprise, registered in Kenya
                and regulated by The Companies Act 2015. The goal of Bitkopa is
                to offer top tier lending services to the crypto community while
                adhering to the virtues and visions of the Blockchain
                technology; transparency, verifiability and accessibilty.
              </div>
            </q-card-section>
            <q-card-section class="q-pt-xs">
              <div class="text-h5 text-bold">Connect With Us</div>
              <div class="text-dark">
                Don't feel shy to contact us for any issues or questions. Reach
                us through email; support@bitkopa.com. Call us; +254790010203 /
                +254789567890. Follow us on twitter: @bitkopa_official
              </div>
            </q-card-section>
            <q-card-section class="q-pt-xs gt-sm">
              <div class="text-h5 text-bold">Disclaimer</div>
              <div class="text-dark">
                This project has been submitted to the Polygon Africa Bootcamp
                Hackathon 2022 for assessment. It is not audited, tested and not
                open for the public, not yet...for now!
              </div>
            </q-card-section>

            <q-card-section class="col-3 gt-sm flex flex-center">
              <q-img class="rounded-borders" src="images/support.png" />
            </q-card-section>
          </q-card-section>

          <q-separator />
        </q-card>
      </div>
    </div>
    >
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { useBitkopaStore } from "src/stores/bitkopaStore";

export default defineComponent({
  name: "IndexPage",
  setup() {
    const bitkopaStore = useBitkopaStore();
    return {
      bitkopaStore,
    };
  },
});
</script>

<style lang="scss" scoped>
.q-page {
  //background: linear-gradient(to top, #13a6d3, #57177c);
  //background: linear-gradient(to top, #0f2027, #203a43, #2c5364);
  //background: linear-gradient(to top, #0f0c29, #302b63, #24243e);
  background: #f6f8fe;
}
.section-1 {
  background: rgba(1, 1, 1, 0);
}
</style>
