<template>
  <q-page>
    <!-- Spinner when verifying account -->
    <div class="q-pa-xs row justify-center">
      <div v-if="bitkopaStore.showSpinner" class="q-gutter-md row">
        <q-spinner-facebook color="indigo" size="4em" />
      </div>
    </div>
    <div class="q-pa-xs row justify-center">
      <div class="col-12 col-md-10 q-pt-xl q-mt-xl q-px-md">
        <q-stepper v-model="step" ref="stepper" color="secondary" animated>
          <q-step
            :name="1"
            title="Bitkopa Verification"
            icon="settings"
            :done="step > 1"
            style="min-height: 200px"
          >
            Bitkopa requires users to complete KYC to enjoy Bitkopa services.<br />
            If you already completed the verification process, switch to the
            verified account.<br />
            You can verify the currently connected account or you can import a
            verified demo account.<br />
            The private key for the verified demo account is shown above.
          </q-step>

          <q-step
            disable
            :name="2"
            title="Basic Infomation"
            caption="As they appear on your ID"
            icon="perm_identity"
            :done="step > 2"
            style="min-height: 200px"
          >
            Personal Details
          </q-step>

          <q-step
            disable
            :name="3"
            title="Contact Details"
            icon="phone"
            :done="step > 3"
            style="min-height: 200px"
          >
            Contact Details
          </q-step>

          <q-step
            disable
            :name="4"
            title="Payment Methods"
            icon="account_balance"
            :done="step > 4"
            style="min-height: 200px"
          >
            Payment Methods
          </q-step>

          <q-step
            disable
            :name="5"
            title="Document Upload"
            icon="upload_file"
            :done="step > 5"
            style="min-height: 200px"
          >
            Upload KYC Docs
          </q-step>

          <q-step
            :name="6"
            title="Submit"
            icon="check"
            style="min-height: 200px"
          >
            By Clicking Submit, your current connected account will be
            verified.<br />
            This might take a few seconds.<br />
            You can import an already verified demo account with test tokens.
          </q-step>

          <template v-slot:navigation>
            <q-stepper-navigation>
              <q-btn
                v-if="step < 6"
                outline
                no-caps
                @click="$refs.stepper.next()"
                color="indigo"
                label="Continue"
              />
              <q-btn
                v-if="step === 6"
                outline
                no-caps
                @click="bitkopaStore.verifyAccount"
                color="indigo"
                label="Submit"
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
            <q-banner v-if="step === 1" class="bg-indigo-8 text-white q-px-lg">
              Private Key For Verified Demo Account:
              f2c146e00410c958418bcfce240ffe13fba9d30de7b3b77cfb32a6d5d4a79689
            </q-banner>
            <q-banner
              v-else-if="step === 2"
              class="bg-orange-8 text-white q-px-lg"
            >
              Basic Information
            </q-banner>
            <q-banner
              v-else-if="step === 3"
              class="bg-green-8 text-white q-px-lg"
            >
              Contact Details
            </q-banner>
            <q-banner
              v-else-if="step === 4"
              class="bg-blue-8 text-white q-px-lg"
            >
              Add Payment Methods
            </q-banner>
            <q-banner
              v-else-if="step === 5"
              class="bg-purple-8 text-white q-px-lg"
            >
              Upload KYC Documents
            </q-banner>
            <q-banner v-else class="bg-blue-8 text-white q-px-lg">
              Verify Account: {{ bitkopaStore.userAccount }}
            </q-banner>
          </template>
        </q-stepper>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useBitkopaStore } from "src/stores/bitkopaStore";

export default defineComponent({
  setup() {
    const bitkopaStore = useBitkopaStore();
    return {
      bitkopaStore,
      step: ref(1),
    };
  },
});
</script>
