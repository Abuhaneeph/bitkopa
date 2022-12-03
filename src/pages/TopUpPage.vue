<template>
  <!-- display skeleton if not connected or verified-->
  <q-page v-if="!bitkopaStore.connected || !bitkopaStore.verified">
    <div class="q-pa-xs row justify-center">
      <div class="col-10 q-pt-xl q-mt-xl">
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
    <!-- for large screens -->
    <div class="gt-md q-pa-xs row justify-center">
      <div
        v-if="bitkopaStore.loans.active.length"
        class="col-12 col-md-6 q-pt-xl q-mt-xl q-px-md"
      >
        <q-stepper v-model="step" ref="stepper" color="primary" animated>
          <q-step
            :name="1"
            title="Select Loan"
            icon="payments"
            :done="step > 1"
            style="min-height: 200px"
          >
            <q-card class="section-1">
              <q-card-section>
                <q-btn-dropdown split color="dark" flat no-caps>
                  <template v-slot:label>
                    <div class="row items-center no-wrap">
                      <q-icon
                        left
                        :name="`img:tokens/${bitkopaStore.selectedLoan.icon}`"
                      />
                      <div class="text-center">
                        <q-space></q-space
                        >{{ bitkopaStore.selectedLoan.loanId }}
                      </div>
                    </div>
                  </template>

                  <q-list
                    v-for="loan in bitkopaStore.loans.active"
                    :key="loan.loanId"
                  >
                    <q-item
                      clickable
                      v-close-popup
                      @click="bitkopaStore.changeSelectedLoan(loan)"
                    >
                      <q-item-section avatar>
                        <q-avatar
                          :icon="`img:tokens/${loan.icon}`"
                          color="white"
                          text-color="white"
                        />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label
                          >Collateral: {{ loan.symbol }}</q-item-label
                        >
                        <q-item-label caption
                          >Loan Balance: {{ loan.balance }}
                          {{
                            bitkopaStore.paymentMethods[
                              loan.paymentMethodId - 1
                            ].symbol
                          }}</q-item-label
                        >
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>
              </q-card-section>
              <q-card-section>
                <q-btn
                  style="pointer-events: none"
                  icon="details"
                  size="15px"
                  flat
                  class="text-dark q-ml-lg q-px-xl"
                  rounded
                  color="indigo"
                  label="Loan Details For Selected Loan"
                  no-caps
                />
                <q-list>
                  <q-item>
                    <q-item-section avatar>
                      <q-btn
                        style="pointer-events: none"
                        :icon="`img:countries/${
                          bitkopaStore.paymentMethods[
                            bitkopaStore.selectedLoan.paymentMethodId - 1
                          ].currencyIcon
                        }`"
                        size="15px"
                        flat
                        class="text-dark q-mr-xs"
                        rounded
                        color="indigo"
                        label="Loan Balance"
                        no-caps
                      />
                    </q-item-section>

                    <q-item-section side>
                      <q-item-label class="text-bold q-px-xl"
                        >Balance Remaining
                      </q-item-label>
                      <q-item-label overline class="q-px-xl"
                        >{{
                          parseInt(
                            bitkopaStore.selectedLoan.balance
                          ).toLocaleString()
                        }}
                        {{
                          bitkopaStore.paymentMethods[
                            bitkopaStore.selectedLoan.paymentMethodId - 1
                          ].symbol
                        }}</q-item-label
                      >
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-btn
                        style="pointer-events: none"
                        icon="av_timer"
                        size="15px"
                        flat
                        class="text-dark q-mr-xs"
                        rounded
                        color="indigo"
                        label="Duration Remaining"
                        no-caps
                      />
                    </q-item-section>

                    <q-item-section side>
                      <q-item-label class="text-bold q-px-sm"
                        >Time Remaining</q-item-label
                      >
                      <q-item-label overline class="q-px-sm"
                        >{{ bitkopaStore.selectedLoan.countdown }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-btn
                        style="pointer-events: none"
                        :icon="`img:tokens/${bitkopaStore.selectedLoan.icon}`"
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
                        >Collateral supplied</q-item-label
                      >
                      <q-item-label overline class="q-px-md"
                        >{{
                          parseFloat(
                            bitkopaStore.selectedLoan.collateralAmount /
                              10 ** bitkopaStore.selectedLoan.decimals
                          ).toFixed(6)
                        }}
                        {{ bitkopaStore.selectedLoan.symbol }}</q-item-label
                      >
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-btn
                        style="pointer-events: none"
                        icon="warning"
                        size="15px"
                        flat
                        class="text-dark q-mr-xs"
                        rounded
                        color="indigo"
                        label="Liquidation Risk"
                        no-caps
                      />
                    </q-item-section>

                    <q-item-section side>
                      <q-item-label class="q-px-lg q-ml-xs text-bold"
                        >LTV</q-item-label
                      >
                      <q-item-label overline class="q-px-lg"
                        >{{ bitkopaStore.selectedLoan.ltv }}%</q-item-label
                      >
                    </q-item-section>
                    <q-item-section side>
                      <q-item-label class="text-bold q-px-xs"
                        >Liquidation Price</q-item-label
                      >
                      <q-item-label overline class="q-px-xs"
                        >{{
                          bitkopaStore.selectedLoan.liquidationPrice
                        }}
                        USD</q-item-label
                      >
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>
            </q-card>
          </q-step>

          <q-step
            :name="2"
            title="Top Up Amount"
            icon="payments"
            :done="step > 2"
            style="min-height: 200px"
          >
            <q-input
              outlined
              v-model="bitkopaStore.topUpCollateralAmount"
              label-color="dark"
              label="Collateral Amount"
              input-class="text-dark text-bold text-h6"
              clearable
              stack-label
              :dense="dense"
            >
              <template v-slot:append>
                <q-btn-dropdown
                  split
                  color="dark"
                  style="pointer-events: none"
                  flat
                  no-caps
                >
                  <template v-slot:label>
                    <div class="row items-center no-wrap">
                      <q-icon
                        left
                        :name="`img:tokens/${bitkopaStore.selectedLoan.icon}`"
                      />
                      <div class="text-center">
                        {{ bitkopaStore.selectedLoan.symbol }}
                      </div>
                    </div>
                  </template>
                </q-btn-dropdown>
              </template>
            </q-input>
          </q-step>

          <q-step
            :name="3"
            title="Submit Transaction"
            icon="assignment"
            style="min-height: 200px"
          >
            Complete the transaction with your wallet.
          </q-step>

          <template v-slot:navigation>
            <q-stepper-navigation>
              <q-btn
                v-if="step === 3 && bitkopaStore.topUpCollateralAmount > 0"
                @click="bitkopaStore.topUpCollateral"
                color="indigo"
                outline
                label="Submit"
              />
              <q-btn
                v-if="
                  step === 1 ||
                  (step === 2 && bitkopaStore.topUpCollateralAmount > 0)
                "
                @click="$refs.stepper.next()"
                color="indigo"
                outline
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
              Managing Active Loan: {{ bitkopaStore.selectedLoan.loanId }}
            </q-banner>
            <q-banner
              v-else-if="step === 2"
              class="bg-indigo text-white q-px-lg"
            >
              Wallet Balance:
              {{ bitkopaStore.tokenBalances[bitkopaStore.selectedLoan.id] }}
              {{ bitkopaStore.selectedLoan.symbol }}
            </q-banner>
            <q-banner
              v-else-if="step === 3"
              class="bg-indigo text-white q-px-lg"
            >
              A pop will appear in your wallet
            </q-banner>
          </template>
        </q-stepper>
      </div>
      <div
        class="col-12 col-md-6 q-pt-xl q-mt-xl q-px-md text-dark"
        v-if="!bitkopaStore.loans.active.length"
      >
        <q-banner inline-actions rounded class="bg-white text-dark">
          You currently don't have any active loans.

          <template v-slot:action>
            <q-btn
              outline
              align="right"
              color="indigo"
              to="/request"
              label="Request Loan Now"
            />
          </template>
        </q-banner>
      </div>
    </div>
    <!--for small screens -->
    <div class="lt-lg q-pa-xs row justify-center">
      <div
        v-if="bitkopaStore.loans.active.length"
        class="col-12 col-md-9 q-pt-md q-mt-xs q-px-md q-mb-md"
      >
        <q-stepper v-model="step" ref="stepper" color="primary" animated>
          <q-step
            :name="1"
            title="Select Loan"
            icon="payments"
            :done="step > 1"
            style="min-height: 200px"
          >
            <q-card class="section-1">
              <q-card-section>
                <q-btn-dropdown split color="dark" flat no-caps>
                  <template v-slot:label>
                    <div class="row items-center no-wrap">
                      <q-icon
                        left
                        :name="`img:tokens/${bitkopaStore.selectedLoan.icon}`"
                      />
                      <div class="text-center">
                        <q-space></q-space
                        >{{ bitkopaStore.selectedLoan.loanId }}
                      </div>
                    </div>
                  </template>

                  <q-list
                    v-for="loan in bitkopaStore.loans.active"
                    :key="loan.loanId"
                  >
                    <q-item
                      clickable
                      v-close-popup
                      @click="bitkopaStore.changeSelectedLoan(loan)"
                    >
                      <q-item-section avatar>
                        <q-avatar
                          :icon="`img:tokens/${loan.icon}`"
                          color="white"
                          text-color="white"
                        />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label
                          >Collateral: {{ loan.symbol }}</q-item-label
                        >
                        <q-item-label caption
                          >Loan Balance: {{ loan.balance }}
                          {{
                            bitkopaStore.paymentMethods[
                              loan.paymentMethodId - 1
                            ].symbol
                          }}</q-item-label
                        >
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>
              </q-card-section>
              <q-card-section>
                <q-btn
                  style="pointer-events: none"
                  icon="details"
                  size="15px"
                  flat
                  class="text-dark q-ml-lg q-px-xl"
                  rounded
                  color="indigo"
                  label="Loan Details For Selected Loan"
                  no-caps
                />
                <q-list>
                  <q-item>
                    <q-item-section avatar>
                      <q-btn
                        style="pointer-events: none"
                        :icon="`img:countries/${
                          bitkopaStore.paymentMethods[
                            bitkopaStore.selectedLoan.paymentMethodId - 1
                          ].currencyIcon
                        }`"
                        size="15px"
                        flat
                        class="text-dark q-mr-xs"
                        rounded
                        color="indigo"
                        label="Loan Balance"
                        no-caps
                      />
                    </q-item-section>

                    <q-item-section side>
                      <q-item-label class="text-bold q-px-xl"
                        >Balance Remaining
                      </q-item-label>
                      <q-item-label overline class="q-px-xl"
                        >{{
                          parseInt(
                            bitkopaStore.selectedLoan.balance
                          ).toLocaleString()
                        }}
                        {{
                          bitkopaStore.paymentMethods[
                            bitkopaStore.selectedLoan.paymentMethodId - 1
                          ].symbol
                        }}</q-item-label
                      >
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-btn
                        style="pointer-events: none"
                        icon="av_timer"
                        size="15px"
                        flat
                        class="text-dark q-mr-xs"
                        rounded
                        color="indigo"
                        label="Duration Remaining"
                        no-caps
                      />
                    </q-item-section>

                    <q-item-section side>
                      <q-item-label class="text-bold q-px-sm"
                        >Time Remaining</q-item-label
                      >
                      <q-item-label overline class="q-px-sm"
                        >{{ bitkopaStore.selectedLoan.countdown }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-btn
                        style="pointer-events: none"
                        :icon="`img:tokens/${bitkopaStore.selectedLoan.icon}`"
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
                        >Collateral supplied</q-item-label
                      >
                      <q-item-label overline class="q-px-md"
                        >{{
                          parseFloat(
                            bitkopaStore.selectedLoan.collateralAmount /
                              10 ** bitkopaStore.selectedLoan.decimals
                          ).toFixed(6)
                        }}
                        {{ bitkopaStore.selectedLoan.symbol }}</q-item-label
                      >
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-btn
                        style="pointer-events: none"
                        icon="warning"
                        size="15px"
                        flat
                        class="text-dark q-mr-xs"
                        rounded
                        color="indigo"
                        label="Liquidation Risk"
                        no-caps
                      />
                    </q-item-section>

                    <q-item-section side>
                      <q-item-label class="q-px-lg q-ml-xs text-bold"
                        >LTV</q-item-label
                      >
                      <q-item-label overline class="q-px-lg"
                        >{{ bitkopaStore.selectedLoan.ltv }}%</q-item-label
                      >
                    </q-item-section>
                    <q-item-section side>
                      <q-item-label class="text-bold q-px-xs"
                        >Liquidation Price</q-item-label
                      >
                      <q-item-label overline class="q-px-xs"
                        >{{
                          bitkopaStore.selectedLoan.liquidationPrice
                        }}
                        USD</q-item-label
                      >
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>
            </q-card>
          </q-step>

          <q-step
            :name="2"
            title="Top Up Amount"
            icon="payments"
            :done="step > 2"
            style="min-height: 200px"
          >
            <q-input
              outlined
              v-model="bitkopaStore.topUpCollateralAmount"
              label-color="dark"
              label="Collateral Amount"
              input-class="text-dark text-bold text-h6"
              clearable
              stack-label
              :dense="dense"
            >
              <template v-slot:append>
                <q-btn-dropdown
                  split
                  color="dark"
                  style="pointer-events: none"
                  flat
                  no-caps
                >
                  <template v-slot:label>
                    <div class="row items-center no-wrap">
                      <q-icon
                        left
                        :name="`img:tokens/${bitkopaStore.selectedLoan.icon}`"
                      />
                      <div class="text-center">
                        {{ bitkopaStore.selectedLoan.symbol }}
                      </div>
                    </div>
                  </template>
                </q-btn-dropdown>
              </template>
            </q-input>
          </q-step>

          <q-step
            :name="3"
            title="Submit Transaction"
            icon="assignment"
            style="min-height: 200px"
          >
            Complete the transaction with your wallet.
          </q-step>

          <template v-slot:navigation>
            <q-stepper-navigation>
              <q-btn
                v-if="step === 3 && bitkopaStore.topUpCollateralAmount > 0"
                @click="bitkopaStore.topUpCollateral"
                color="indigo"
                outline
                label="Submit"
              />
              <q-btn
                v-if="
                  step === 1 ||
                  (step === 2 && bitkopaStore.topUpCollateralAmount > 0)
                "
                @click="$refs.stepper.next()"
                color="indigo"
                outline
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
              Managing Active Loan: {{ bitkopaStore.selectedLoan.loanId }}
            </q-banner>
            <q-banner
              v-else-if="step === 2"
              class="bg-indigo text-white q-px-lg"
            >
              Wallet Balance:
              {{ bitkopaStore.tokenBalances[bitkopaStore.selectedLoan.id] }}
              {{ bitkopaStore.selectedLoan.symbol }}
            </q-banner>
            <q-banner
              v-else-if="step === 3"
              class="bg-indigo text-white q-px-lg"
            >
              A pop will appear in your wallet
            </q-banner>
          </template>
        </q-stepper>
      </div>
      <div
        class="col-12 col-md-6 q-pt-xl q-mt-xl q-px-md text-dark"
        v-if="!bitkopaStore.loans.active.length"
      >
        <q-banner inline-actions rounded class="bg-white text-dark">
          You currently don't have any active loans.

          <template v-slot:action>
            <q-btn
              outline
              align="right"
              color="indigo"
              to="/request"
              label="Request Loan Now"
            />
          </template>
        </q-banner>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onUnmounted } from "vue";
import { useBitkopaStore } from "src/stores/bitkopaStore";
export default defineComponent({
  setup() {
    const bitkopaStore = useBitkopaStore();

    onUnmounted(() => {
      //stop listening for events
      bitkopaStore.stopListener();
    });
    return {
      bitkopaStore,
      step: ref(1),
    };
  },
});
</script>
