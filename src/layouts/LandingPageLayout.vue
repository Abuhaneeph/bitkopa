<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="section-2">
      <q-toolbar>
        <q-toolbar-title>
          <div class="text-overline text-center text-dark gt-sm">
            &copy; bitkopa.com {{ year }} |<span>
              <a
                href="https://github.com/freelancer254/urtoken.org"
                target="_blank"
                class="text-dark"
                style="text-decoration: none"
              >
                Github</a
              >
              |</span
            >
            <span
              ><a
                href="https://www.buymeacoffee.com/freelancer254"
                target="_blank"
                class="text-dark"
                style="text-decoration: none"
              >
                support@bitkopa.com</a
              >
              |</span
            >
            <span
              ><a
                href="https://twitter.com/urtoken_org"
                target="_blank"
                class="text-dark"
                style="text-decoration: none"
              >
                Twitter</a
              ></span
            >
          </div>
          <div class="text-overline text-center text-dark lt-md">
            &copy; bitkopa.com {{ year }}
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
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
    const year = ref("");

    //required by state
    const getLoanTerms = api.get("/loanterms");

    const resolveAllRequests = function () {
      axios.all([getLoanTerms]).then(
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
        })
      );
    };

    onMounted(() => {
      year.value = new Date().getFullYear();
      bitkopaStore.verificationContract = useVerificationContract;
      bitkopaStore.erc20ABI = useERC20ABI;
      bitkopaStore.aggregatorABI = useAggregatorABI;
      resolveAllRequests();
      bitkopaStore.connectAlchemy();
    });

    onUnmounted(() => {
      //stop listening for events
      bitkopaStore.stopListener();
    });

    return {
      bitkopaStore,
      year,
    };
  },
};
</script>

<style lang="scss" scoped>
.section-2 {
  //background: radial-gradient(circle, #0f0c29, #302b63, #24243e);
  background: #f6f8fe;
}
</style>
