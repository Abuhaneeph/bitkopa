<template>
  <!-- display skeleton if not connected or verified-->
  <q-page v-if="!bitkopaStore.connected || !bitkopaStore.verified">
    <div class="q-pa-xs row justify-center">
      <div class="col-6 q-pt-xl q-mt-xl">
        <div class="q-pa-md">
          <q-markup-table>
            <thead>
              <tr>
                <th class="text-left" style="width: 150px">
                  <q-skeleton animation="blink" type="text" />
                </th>
                <th class="text-right">
                  <q-skeleton animation="blink" type="text" />
                </th>
                <th class="text-right">
                  <q-skeleton animation="blink" type="text" />
                </th>
                <th class="text-right">
                  <q-skeleton animation="blink" type="text" />
                </th>
                <th class="text-right">
                  <q-skeleton animation="blink" type="text" />
                </th>
                <th class="text-right">
                  <q-skeleton animation="blink" type="text" />
                </th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="n in 5" :key="n">
                <td class="text-left">
                  <q-skeleton animation="blink" type="text" width="85px" />
                </td>
                <td class="text-right">
                  <q-skeleton animation="blink" type="text" width="50px" />
                </td>
                <td class="text-right">
                  <q-skeleton animation="blink" type="text" width="35px" />
                </td>
                <td class="text-right">
                  <q-skeleton animation="blink" type="text" width="65px" />
                </td>
                <td class="text-right">
                  <q-skeleton animation="blink" type="text" width="25px" />
                </td>
                <td class="text-right">
                  <q-skeleton animation="blink" type="text" width="85px" />
                </td>
              </tr>
            </tbody>
          </q-markup-table>
        </div>
      </div>
      <div class="col-5 q-pt-xl q-mt-xl q-px-lg">
        <div class="q-pa-md">
          <q-markup-table>
            <thead>
              <tr>
                <th class="text-left" style="width: 150px">
                  <q-skeleton animation="blink" type="text" />
                </th>
                <th class="text-right">
                  <q-skeleton animation="blink" type="text" />
                </th>
                <th class="text-right">
                  <q-skeleton animation="blink" type="text" />
                </th>
                <th class="text-right">
                  <q-skeleton animation="blink" type="text" />
                </th>
                <th class="text-right">
                  <q-skeleton animation="blink" type="text" />
                </th>
                <th class="text-right">
                  <q-skeleton animation="blink" type="text" />
                </th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="n in 5" :key="n">
                <td class="text-left">
                  <q-skeleton animation="blink" type="text" width="85px" />
                </td>
                <td class="text-right">
                  <q-skeleton animation="blink" type="text" width="50px" />
                </td>
                <td class="text-right">
                  <q-skeleton animation="blink" type="text" width="35px" />
                </td>
                <td class="text-right">
                  <q-skeleton animation="blink" type="text" width="65px" />
                </td>
                <td class="text-right">
                  <q-skeleton animation="blink" type="text" width="25px" />
                </td>
                <td class="text-right">
                  <q-skeleton animation="blink" type="text" width="85px" />
                </td>
              </tr>
            </tbody>
          </q-markup-table>
        </div>
      </div>
    </div>
  </q-page>
  <q-page v-if="bitkopaStore.connected && bitkopaStore.verified">
    <!-- appears in large screens -->
    <div class="gt-md q-pa-xs row justify-center">
      <div class="col-12 col-md-6 q-pt-xl q-mt-xl q-px-sm">
        <q-stepper v-model="step" ref="stepper" color="primary" animated>
          <q-step
            :name="1"
            title="Loan Amount and Duration"
            icon="payments"
            :done="step > 1"
            style="min-height: 200px"
          >
            <!-- loan amount, currency, duration, payment method -->
            <q-input
              outlined
              :loading="bitkopaStore.loanAmountSpinner"
              v-model="bitkopaStore.finalBorrowAmount"
              label-color="dark"
              label="Amount "
              input-class="text-dark text-bold text-h6"
              clearable
              stack-label
              :dense="dense"
            >
              <template v-slot:append>
                <q-btn
                  outline
                  rounded
                  no-caps
                  class="gt-sm"
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
                <q-btn-dropdown split color="dark" flat no-caps>
                  <template v-slot:label>
                    <div class="row items-center no-wrap">
                      <q-icon
                        left
                        :name="`img:payments/${bitkopaStore.selectedPaymentMethod.icon}`"
                      />
                      <div class="text-center">
                        <q-space></q-space
                        >{{ bitkopaStore.selectedPaymentMethod.name }}
                      </div>
                    </div>
                  </template>

                  <q-list
                    v-for="paymentMethod in bitkopaStore.paymentMethods"
                    :key="paymentMethod.id"
                  >
                    <q-item
                      clickable
                      v-close-popup
                      @click="bitkopaStore.changePaymentMethod(paymentMethod)"
                    >
                      <q-item-section avatar>
                        <q-avatar
                          :icon="`img:payments/${paymentMethod.icon}`"
                          color="white"
                          text-color="white"
                        />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>{{ paymentMethod.name }}</q-item-label>
                        <q-item-label caption>{{
                          paymentMethod.accountNumber
                        }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>
              </template>
            </q-input>
          </q-step>

          <q-step
            :name="2"
            title="Collateral"
            icon="credit_score"
            :done="step > 2"
            style="min-height: 200px"
          >
            <q-input
              outlined
              :loading="bitkopaStore.collateralAmountSpinner"
              v-model="bitkopaStore.finalCollateralAmount"
              label-color="dark"
              label="Collateral "
              input-class="text-dark text-bold text-h6"
              clearable
              stack-label
              :dense="dense"
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
          </q-step>

          <q-step
            :name="3"
            title="Confirm"
            icon="check"
            style="min-height: 200px"
          >
            <q-card class="section-1">
              <q-card-section
                v-if="
                  bitkopaStore.finalCollateralAmount > 0 &&
                  bitkopaStore.finalBorrowAmount > 0
                "
              >
                <q-btn
                  style="pointer-events: none"
                  icon="thumb_up_alt"
                  size="15px"
                  flat
                  class="text-dark q-mr-xs"
                  rounded
                  color="indigo"
                  label="Confirm Loan Request Details"
                  no-caps
                />
                <q-list>
                  <q-item>
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
                      <q-item-label class="text-bold q-px-xl"
                        >Amount to borrow
                      </q-item-label>
                      <q-item-label overline class="q-px-xl"
                        >{{
                          parseInt(
                            bitkopaStore.finalBorrowAmount
                          ).toLocaleString()
                        }}
                        {{ bitkopaStore.selectedCurrency.symbol }}</q-item-label
                      >
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-btn
                        style="pointer-events: none"
                        icon="date_range"
                        size="15px"
                        flat
                        class="text-dark q-mr-xs"
                        rounded
                        color="indigo"
                        label="Loan Duration"
                        no-caps
                      />
                    </q-item-section>

                    <q-item-section side>
                      <q-item-label class="text-bold q-px-xl"
                        >Loan Duration</q-item-label
                      >
                      <q-item-label overline class="q-px-xl"
                        >{{
                          bitkopaStore.selectedLoanDuration
                        }}
                        days</q-item-label
                      >
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-btn
                        style="pointer-events: none"
                        :icon="`img:tokens/${bitkopaStore.selectedCollateral.icon}`"
                        size="15px"
                        flat
                        class="text-dark q-mr-xs"
                        rounded
                        color="indigo"
                        label="Collateral Amount"
                        no-caps
                      />
                    </q-item-section>

                    <q-item-section side>
                      <q-item-label class="q-px-md text-bold"
                        >Collateral to supply</q-item-label
                      >
                      <q-item-label overline class="q-px-md"
                        >{{
                          parseFloat(
                            bitkopaStore.finalCollateralAmount
                          ).toFixed(6)
                        }}
                        {{
                          bitkopaStore.selectedCollateral.symbol
                        }}</q-item-label
                      >
                    </q-item-section>
                  </q-item>

                  <q-item>
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
                      <q-item-label class="q-px-xl text-bold"
                        >Hourly</q-item-label
                      >
                      <q-item-label overline class="q-px-xl"
                        >{{
                          bitkopaStore.selectedInterestRate[0]
                        }}%</q-item-label
                      >
                    </q-item-section>
                    <q-item-section side>
                      <q-item-label class="text-bold q-px-xs"
                        >Daily</q-item-label
                      >
                      <q-item-label overline class="q-px-xs"
                        >{{
                          bitkopaStore.selectedInterestRate[1]
                        }}%</q-item-label
                      >
                    </q-item-section>
                  </q-item>
                </q-list>
                <p class="text-caption" style="color: indigo">
                  By clicking submit, you agree to the terms of the loan.
                </p>
              </q-card-section>
            </q-card>
          </q-step>

          <template v-slot:navigation>
            <q-stepper-navigation>
              <q-btn
                v-if="step === 3 && bitkopaStore.finalCollateralAmount > 0"
                @click="bitkopaStore.loanRequest"
                color="indigo"
                outline
                label="Submit"
              />
              <q-btn
                v-if="
                  step === 1 ||
                  (step === 2 && bitkopaStore.finalBorrowAmount > 0)
                "
                @click="$refs.stepper.next()"
                color="indigo"
                label="Continue"
              />

              <q-btn
                v-if="step > 1"
                flat
                color="secondary"
                @click="$refs.stepper.previous()"
                label="Back"
                class="q-ml-sm"
              />
            </q-stepper-navigation>
          </template>

          <template v-slot:message>
            <q-banner v-if="step === 1" class="bg-indigo text-white q-px-lg">
              Loan Amount Will Depend On The Collateral Amount
            </q-banner>
            <q-banner
              v-else-if="step === 2"
              class="bg-indigo text-white q-px-lg"
            >
              Wallet balance:
              {{
                bitkopaStore.tokenBalances[bitkopaStore.selectedCollateral.id]
              }}
              {{ bitkopaStore.selectedCollateral.symbol }} | You can provide
              excess collateral to lower liquidation price!
            </q-banner>
            <q-banner
              v-else-if="step === 3"
              class="bg-indigo text-white q-px-lg"
            >
              There is no interest payment for early repayment.
            </q-banner>
          </template>
        </q-stepper>
      </div>
      <!-- Loan Calculator -->
      <div
        class="col-12 col-md-5 q-pt-xl q-mt-xl q-px-lg text-center text-dark"
      >
        <q-card elevated bordered class="section-1 q-pt-lg">
          <!-- button label -->
          <q-card-section>
            <div class="row items-center no-wrap">
              <div class="col">
                <q-btn
                  icon="calculate"
                  size="12px"
                  push
                  outline
                  color="indigo"
                  label="Bitkopa Loan Calculator"
                  no-caps
                />
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
    <!-- appears in small screens -->
    <div class="lt-lg q-pa-xs row justify-center">
      <div class="col-12 col-md-10 q-pt-xl q-mt-xl q-px-sm">
        <q-stepper v-model="step" ref="stepper" color="primary" animated>
          <q-step
            :name="1"
            title="Loan Amount and Duration"
            icon="payments"
            :done="step > 1"
            style="min-height: 200px"
          >
            <!-- loan amount, currency, duration, payment method -->
            <q-input
              outlined
              :loading="bitkopaStore.loanAmountSpinner"
              v-model="bitkopaStore.finalBorrowAmount"
              label-color="dark"
              label="Amount "
              input-class="text-dark text-bold text-h6"
              clearable
              stack-label
              :dense="dense"
            >
              <template v-slot:append>
                <q-btn
                  outline
                  rounded
                  no-caps
                  class="gt-sm"
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
                <q-btn-dropdown split color="dark" flat no-caps>
                  <template v-slot:label>
                    <div class="row items-center no-wrap">
                      <q-icon
                        left
                        :name="`img:payments/${bitkopaStore.selectedPaymentMethod.icon}`"
                      />
                      <div class="text-center">
                        <q-space></q-space
                        >{{ bitkopaStore.selectedPaymentMethod.name }}
                      </div>
                    </div>
                  </template>

                  <q-list
                    v-for="paymentMethod in bitkopaStore.paymentMethods"
                    :key="paymentMethod.id"
                  >
                    <q-item
                      clickable
                      v-close-popup
                      @click="bitkopaStore.changePaymentMethod(paymentMethod)"
                    >
                      <q-item-section avatar>
                        <q-avatar
                          :icon="`img:payments/${paymentMethod.icon}`"
                          color="white"
                          text-color="white"
                        />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>{{ paymentMethod.name }}</q-item-label>
                        <q-item-label caption>{{
                          paymentMethod.accountNumber
                        }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>
              </template>
            </q-input>
          </q-step>

          <q-step
            :name="2"
            title="Collateral"
            icon="credit_score"
            :done="step > 2"
            style="min-height: 200px"
          >
            <q-input
              outlined
              :loading="bitkopaStore.collateralAmountSpinner"
              v-model="bitkopaStore.finalCollateralAmount"
              label-color="dark"
              label="Collateral "
              input-class="text-dark text-bold text-h6"
              clearable
              stack-label
              :dense="dense"
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
          </q-step>

          <q-step
            :name="3"
            title="Confirm"
            icon="check"
            style="min-height: 200px"
          >
            <q-card class="section-1">
              <q-card-section
                v-if="
                  bitkopaStore.finalCollateralAmount > 0 &&
                  bitkopaStore.finalBorrowAmount > 0
                "
              >
                <q-btn
                  style="pointer-events: none"
                  icon="thumb_up_alt"
                  size="15px"
                  flat
                  class="text-dark q-mr-xs"
                  rounded
                  color="indigo"
                  label="Confirm Loan Request Details"
                  no-caps
                />
                <q-list>
                  <q-item>
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
                      <q-item-label class="text-bold q-px-xl"
                        >Amount to borrow
                      </q-item-label>
                      <q-item-label overline class="q-px-xl"
                        >{{
                          parseInt(
                            bitkopaStore.finalBorrowAmount
                          ).toLocaleString()
                        }}
                        {{ bitkopaStore.selectedCurrency.symbol }}</q-item-label
                      >
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-btn
                        style="pointer-events: none"
                        icon="date_range"
                        size="15px"
                        flat
                        class="text-dark q-mr-xs"
                        rounded
                        color="indigo"
                        label="Loan Duration"
                        no-caps
                      />
                    </q-item-section>

                    <q-item-section side>
                      <q-item-label class="text-bold q-px-xl"
                        >Loan Duration</q-item-label
                      >
                      <q-item-label overline class="q-px-xl"
                        >{{
                          bitkopaStore.selectedLoanDuration
                        }}
                        days</q-item-label
                      >
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-btn
                        style="pointer-events: none"
                        :icon="`img:tokens/${bitkopaStore.selectedCollateral.icon}`"
                        size="15px"
                        flat
                        class="text-dark q-mr-xs"
                        rounded
                        color="indigo"
                        label="Collateral Amount"
                        no-caps
                      />
                    </q-item-section>

                    <q-item-section side>
                      <q-item-label class="q-px-md text-bold"
                        >Collateral to supply</q-item-label
                      >
                      <q-item-label overline class="q-px-md"
                        >{{
                          parseFloat(
                            bitkopaStore.finalCollateralAmount
                          ).toFixed(6)
                        }}
                        {{
                          bitkopaStore.selectedCollateral.symbol
                        }}</q-item-label
                      >
                    </q-item-section>
                  </q-item>

                  <q-item>
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
                      <q-item-label class="q-px-xl text-bold"
                        >Hourly</q-item-label
                      >
                      <q-item-label overline class="q-px-xl"
                        >{{
                          bitkopaStore.selectedInterestRate[0]
                        }}%</q-item-label
                      >
                    </q-item-section>
                    <q-item-section side>
                      <q-item-label class="text-bold q-px-xs"
                        >Daily</q-item-label
                      >
                      <q-item-label overline class="q-px-xs"
                        >{{
                          bitkopaStore.selectedInterestRate[1]
                        }}%</q-item-label
                      >
                    </q-item-section>
                  </q-item>
                </q-list>
                <p class="text-caption" style="color: indigo">
                  By clicking submit, you agree to the terms of the loan.
                </p>
              </q-card-section>
            </q-card>
          </q-step>

          <template v-slot:navigation>
            <q-stepper-navigation>
              <q-btn
                v-if="step === 3"
                @click="bitkopaStore.loanRequest"
                color="indigo"
                outline
                label="Submit"
              />
              <q-btn
                v-if="
                  step === 1 ||
                  (step === 2 && bitkopaStore.finalBorrowAmount > 0)
                "
                @click="$refs.stepper.next()"
                color="indigo"
                label="Continue"
              />

              <q-btn
                v-if="step > 1"
                flat
                color="secondary"
                @click="$refs.stepper.previous()"
                label="Back"
                class="q-ml-sm"
              />
            </q-stepper-navigation>
          </template>

          <template v-slot:message>
            <q-banner v-if="step === 1" class="bg-indigo text-white q-px-lg">
              Loan Amount Will Depend On The Collateral Amount
            </q-banner>
            <q-banner
              v-else-if="step === 2"
              class="bg-indigo text-white q-px-lg"
            >
              Wallet balance:
              {{
                bitkopaStore.tokenBalances[bitkopaStore.selectedCollateral.id]
              }}
              {{ bitkopaStore.selectedCollateral.symbol }} | You can provide
              excess collateral to lower liquidation price!
            </q-banner>
            <q-banner
              v-else-if="step === 3"
              class="bg-indigo text-white q-px-lg"
            >
              There is no interest payment for early repayment.
            </q-banner>
          </template>
        </q-stepper>
      </div>
      <!-- Loan Calculator -->
      <div
        class="col-12 col-md-10 q-pt-md q-mt-md q-px-lg q-mb-lg text-center text-dark"
      >
        <q-card elevated bordered class="section-1 q-pt-lg">
          <!-- button label -->
          <q-card-section>
            <div class="row items-center no-wrap">
              <div class="col">
                <q-btn
                  icon="calculate"
                  size="12px"
                  push
                  outline
                  color="indigo"
                  label="Bitkopa Loan Calculator"
                  no-caps
                />
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
  </q-page>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";
import { useBitkopaStore } from "src/stores/bitkopaStore";
import useVerificationContract from "../../public/verification/verificationcontract";
import useERC20ABI from "../../public/abi/erc20ABI";
import useAggregatorABI from "../../public/abi/aggregatorV3InterfaceABI";
import { api } from "src/boot/axios";
import axios from "axios";

export default {
  setup() {
    const bitkopaStore = useBitkopaStore();

    //required by state
    const getLoanTerms = api.get("/loanterms");
    const getPaymentMethods = api.get("/paymentmethods");

    const resolveAllRequests = function () {
      axios.all([getLoanTerms, getPaymentMethods]).then(
        axios.spread((...responses) => {
          bitkopaStore.loanTerms = responses[0].data;
          bitkopaStore.selectedCurrency = responses[0].data.currencies[0];
          bitkopaStore.selectedLoanDuration = responses[0].data.duration[0];
          bitkopaStore.selectedCollateral = responses[0].data.collateral[0];
          bitkopaStore.selectedInterestRate =
            responses[0].data.interestrates[
              responses[0].data.duration[0].toString()
            ];
          bitkopaStore.allSupportedTokens = responses[0].data.collateral;
          bitkopaStore.paymentMethods = responses[1].data;
          bitkopaStore.selectedPaymentMethod = responses[1].data[0];
        })
      );
    };

    onMounted(() => {
      bitkopaStore.verificationContract = useVerificationContract;
      bitkopaStore.erc20ABI = useERC20ABI;
      bitkopaStore.aggregatorABI = useAggregatorABI;
      resolveAllRequests();
    });

    onUnmounted(() => {
      //stop listening for events
      bitkopaStore.stopListener();
    });

    return {
      step: ref(1),
      bitkopaStore,
    };
  },
};
</script>
