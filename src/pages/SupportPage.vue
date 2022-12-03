<template>
  <q-page>
    <div class="gt-md q-pa-xs row justify-center">
      <div class="col-12 col-md-6 q-pt-xl q-mt-xl q-px-md">
        <q-card elevated bordered push>
          <q-card-section> Raise Support Ticket </q-card-section>
          <q-separator></q-separator>
          <q-card-section>
            <div class="row">
              <div class="col-12 q-pa-sm">
                <q-select
                  v-model="issue"
                  :options="issueOptions"
                  label="Select Issue"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-12 q-pa-sm">
                <q-input
                  v-model="email"
                  label="Email"
                  placeholder="Email"
                  :dense="dense"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-12 q-pa-sm">
                <q-input
                  v-model="subject"
                  label="Subject"
                  placeholder="Subject"
                  :dense="dense"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-12 q-pa-sm">
                <q-input
                  type="textarea"
                  v-model="description"
                  label="Description"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-12 q-pa-sm">
                <q-input
                  @update:model-value="
                    (val) => {
                      files = val;
                    }
                  "
                  multiple
                  filled
                  type="file"
                  hint="Attach screenshots"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-13 q-pa-sm">
                <q-btn outline label="Submit" color="indigo" no-caps></q-btn>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-md-4 q-pt-xl q-mt-xl q-px-sm">
        <q-card elevated bordered push>
          <q-card-section> Contact Us</q-card-section>
          <q-separator></q-separator>
          <q-card-section>
            <div class="row">
              <div class="col-6 q-pa-sm">
                <q-input
                  readonly
                  v-model="bitkopaStore.supportDetails.email"
                  label="Email"
                  placeholder="Placeholder"
                  :dense="dense"
                />
              </div>
              <div class="col-6 q-pa-sm">
                <q-input
                  readonly
                  v-model="bitkopaStore.supportDetails.phone"
                  label="Phone"
                  placeholder="Placeholder"
                  :dense="dense"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-6 q-pa-sm">
                <q-input
                  readonly
                  v-model="bitkopaStore.supportDetails.telegram"
                  label="Telegram"
                  placeholder="Placeholder"
                  :dense="dense"
                />
              </div>
              <div class="col-6 q-pa-sm">
                <q-input
                  readonly
                  v-model="bitkopaStore.supportDetails.twitter"
                  label="Twitter"
                  placeholder="Placeholder"
                  :dense="dense"
                />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <!-- for small screens -->
    <div class="lt-lg q-pa-xs row justify-center">
      <div class="col-12 col-md-10 q-pt-md q-mt-xs q-px-md q-mb-md">
        <q-card elevated bordered push>
          <q-card-section> Raise Support Ticket </q-card-section>
          <q-separator></q-separator>
          <q-card-section>
            <div class="row">
              <div class="col-12 q-pa-sm">
                <q-select
                  v-model="issue"
                  :options="issueOptions"
                  label="Select Issue"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-12 q-pa-sm">
                <q-input
                  v-model="email"
                  label="Email"
                  placeholder="Email"
                  :dense="dense"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-12 q-pa-sm">
                <q-input
                  v-model="subject"
                  label="Subject"
                  placeholder="Subject"
                  :dense="dense"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-12 q-pa-sm">
                <q-input
                  type="textarea"
                  v-model="description"
                  label="Description"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-12 q-pa-sm">
                <q-input
                  @update:model-value="
                    (val) => {
                      files = val;
                    }
                  "
                  multiple
                  filled
                  type="file"
                  hint="Attach screenshots"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-13 q-pa-sm">
                <q-btn outline label="Submit" color="indigo" no-caps></q-btn>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-md-10 q-pt-md q-mt-xs q-px-sm q-mb-md">
        <q-card elevated bordered push>
          <q-card-section> Contact Us</q-card-section>
          <q-separator></q-separator>
          <q-card-section>
            <div class="row">
              <div class="col-6 q-pa-sm">
                <q-input
                  readonly
                  v-model="bitkopaStore.supportDetails.email"
                  label="Email"
                  placeholder="Placeholder"
                  :dense="dense"
                />
              </div>
              <div class="col-6 q-pa-sm">
                <q-input
                  readonly
                  v-model="bitkopaStore.supportDetails.phone"
                  label="Phone"
                  placeholder="Placeholder"
                  :dense="dense"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-6 q-pa-sm">
                <q-input
                  readonly
                  v-model="bitkopaStore.supportDetails.telegram"
                  label="Telegram"
                  placeholder="Placeholder"
                  :dense="dense"
                />
              </div>
              <div class="col-6 q-pa-sm">
                <q-input
                  readonly
                  v-model="bitkopaStore.supportDetails.twitter"
                  label="Twitter"
                  placeholder="Placeholder"
                  :dense="dense"
                />
              </div>
            </div>
          </q-card-section>
        </q-card>
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
      issue: ref(null),
      issueOptions: [
        "Issues With Identity Verification",
        "Missing Loan Repayment",
        "My Loan Has Not Been Disbursed",
        "Issue With Multifactor Authentication",
        "General",
      ],
      subject: ref(null),
      description: ref(null),
      email: ref(null),
    };
  },
});
</script>
