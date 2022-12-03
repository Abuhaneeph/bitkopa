<template>
  <q-layout view="hHh lpR fFf" class="page">
    <q-header class="bg-indigo-8 text-white lt-sm">
      <q-toolbar>
        <q-toolbar-title> Bitkopa </q-toolbar-title>

        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <!--unsupported network banner -->
      <div class="q-pa-xs row justify-center">
        <div
          v-if="bitkopaStore.showBanner"
          class="q-pt-sm col-12 col-md-9 text-center text-dark"
        >
          <q-banner rounded class="bg-red-8 text-white">
            You are not connected to POLYGON Mumbai Network.
            <template v-slot:action>
              <q-btn
                outline
                color="white"
                label="Switch to Mumbai"
                @click="
                  bitkopaStore.switchNetwork({
                    chainId: '0x13881',
                    chainName: 'Polygon Mumbai TestNet',
                    rpcUrl: 'https://rpc-mumbai.matic.today',
                    name: 'MATIC',
                    symbol: 'MATIC',
                    blockExplorerUrl: 'https://mumbai.polygonscan.com/',
                  })
                "
              />
            </template>
          </q-banner>
        </div>
      </div>
      <!-- wallet not connected -->
      <div v-if="!bitkopaStore.connected" class="q-pt-xl q-px-xl q-mt-xl">
        <q-btn
          icon="account_balance_wallet"
          size="12px"
          push
          outline
          color="indigo"
          label="Connect Wallet"
          @click="bitkopaStore.connectProvider()"
        />
      </div>

      <!-- wallet connected -->
      <div v-if="bitkopaStore.connected" class="q-pt-xl q-px-xl q-mt-xl">
        <q-btn
          style="pointer-events: none"
          icon="account_balance_wallet"
          size="12px"
          push
          outline
          color="green"
          :label="bitkopaStore.account"
        />
      </div>
      <!-- wallet not verified -->
      <div
        v-if="
          bitkopaStore.connected &&
          !bitkopaStore.verified &&
          !bitkopaStore.showSpinner
        "
        class="q-pt-xs q-px-xl q-mt-xs q-ml-md"
      >
        <p>
          <q-icon name="verified" left color="negative" />unverified
          <q-icon name="close" right color="negative" />
        </p>
      </div>
      <div
        v-if="bitkopaStore.showSpinner"
        class="q-pt-xs q-px-xl q-mt-xs q-ml-xl row items-center no-wrap"
      >
        <q-spinner-facebook color="secondary" size="2em" />
      </div>
      <!-- wallet verified -->
      <div
        v-if="bitkopaStore.connected && bitkopaStore.verified"
        class="q-pt-xs q-px-xl q-mt-xs q-ml-md"
      >
        <p>
          <q-icon name="verified" left color="positive" /> verified
          <q-icon name="check" color="positive" right />
        </p>
      </div>

      <div class="q-pa-lg">
        <q-card elevated bordered push>
          <q-card-section>
            <q-list style="min-width: 100px">
              <q-item clickable to="/dashboard" exact>
                <q-item-section avatar>
                  <q-icon name="dashboard"></q-icon>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Dashboard</q-item-label>
                </q-item-section>
              </q-item>
              <q-item
                v-if="
                  bitkopaStore.connected &&
                  !bitkopaStore.verified &&
                  !bitkopaStore.showSpinner
                "
                clickable
                to="/verification"
                exact
              >
                <q-item-section avatar>
                  <q-icon name="verified"></q-icon>
                </q-item-section>
                <q-item-section
                  ><q-item-label>Verify Account</q-item-label></q-item-section
                >
              </q-item>
              <q-item clickable exact>
                <q-item-section avatar>
                  <q-icon name="payments"></q-icon>
                </q-item-section>
                <q-item-section
                  ><q-item-label>Loans</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-icon name="keyboard_arrow_right" />
                </q-item-section>
                <q-menu anchor="top end" self="top start">
                  <q-list>
                    <q-item clickable to="request" exact>
                      <q-item-section>Request Loan</q-item-section>
                    </q-item>
                    <q-item
                      clickable
                      @click="bitkopaStore.setSelectedLoan"
                      exact
                    >
                      <q-item-section>Repay Loan</q-item-section>
                    </q-item>
                    <q-item
                      clickable
                      @click="bitkopaStore.setSelectedLoanForTopUp"
                      exact
                    >
                      <q-item-section>Top Up Collateral</q-item-section>
                    </q-item>
                    <q-item
                      clickable
                      @click="bitkopaStore.setSelectedLoanForWithdraw"
                      exact
                    >
                      <q-item-section
                        >Withdraw Excess Collateral</q-item-section
                      >
                    </q-item>
                  </q-list>
                </q-menu>
              </q-item>
              <q-item clickable to="/profile" exact>
                <q-item-section avatar>
                  <q-icon name="person"></q-icon>
                </q-item-section>
                <q-item-section
                  ><q-item-label>Profile</q-item-label></q-item-section
                >
              </q-item>
              <q-separator />
              <q-item clickable to="/settings" exact>
                <q-item-section avatar>
                  <q-icon name="settings"></q-icon>
                </q-item-section>
                <q-item-section
                  ><q-item-label>Settings</q-item-label></q-item-section
                >
              </q-item>
              <q-separator />
              <q-item clickable to="/support" exact>
                <q-item-section avatar>
                  <q-icon name="support_agent"></q-icon>
                </q-item-section>
                <q-item-section
                  ><q-item-label>Support</q-item-label></q-item-section
                >
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>
      <div class="q-px-xl q-pt-xl q-pb-sm q-mt-xl text-overline">
        &copy; bitkopa.com {{ year }}
      </div>
    </q-drawer>
    <!--TX Status Dialog -->
    <div class="row q-pa-md q-gutter-sm">
      <q-dialog v-model="bitkopaStore.txDialog">
        <div class="q-mt-md text-center">
          <q-card class="bg-white text-dark" flat>
            <q-card-section>
              <q-spinner-hourglass
                v-if="!bitkopaStore.tx_status"
                color="indigo"
                size="4em"
              />
              <q-icon
                name="task_alt"
                v-if="bitkopaStore.tx_status"
                color="green"
                size="4em"
              />
            </q-card-section>
            <q-card-section class="address-section">
              <div class="text-dark">
                <p v-if="!bitkopaStore.tx_status">
                  Your transaction is being processed...
                </p>
                <p v-if="bitkopaStore.tx_status">
                  Your transaction has been completed.
                </p>
                <p>Tx hash: {{ bitkopaStore.tx_hash }}</p>
              </div>

              <q-btn
                tag="a"
                :href="`https://mumbai.polygonscan.com/tx/${bitkopaStore.tx_hash}`"
                target="blank"
                icon="link"
                size="12px"
                flat
                no-caps
                rounded
                class="text-dark"
              >
                View on polygonscan
              </q-btn>
            </q-card-section>
          </q-card>
        </div>
      </q-dialog>
    </div>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
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
    const leftDrawerOpen = ref(false);
    const year = ref("");

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
      year.value = new Date().getFullYear();
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
      bitkopaStore,
      leftDrawerOpen,

      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      year,
    };
  },
};
</script>
<style lang="scss">
.page {
  background: #f6f8fe;
}
.address-section {
  word-break: break-all;
}
</style>
