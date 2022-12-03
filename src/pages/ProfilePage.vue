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
    <div class="q-pa-xs row justify-center">
      <div class="col-12 col-md-6 q-pt-xl q-mt-xl q-px-md">
        <q-card elevated bordered push>
          <q-card-section> Personal Information </q-card-section>
          <q-separator></q-separator>
          <q-card-section>
            <div class="row">
              <div class="col-6 q-pa-sm">
                <q-input
                  readonly
                  v-model="bitkopaStore.userDetails.firstName"
                  label="First Name"
                  placeholder="Placeholder"
                  :dense="dense"
                />
              </div>
              <div class="col-6 q-pa-sm">
                <q-input
                  readonly
                  v-model="bitkopaStore.userDetails.lastName"
                  label="Last Name"
                  placeholder="Placeholder"
                  :dense="dense"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-6 q-pa-sm">
                <q-input
                  readonly
                  v-model="bitkopaStore.userDetails.id"
                  label="ID/Passport"
                  placeholder="Placeholder"
                  :dense="dense"
                />
              </div>
              <div class="col-6 q-pa-sm">
                <q-input
                  readonly
                  v-model="bitkopaStore.userDetails.address"
                  label="Address"
                  placeholder="Placeholder"
                  :dense="dense"
                />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-md-4 q-pt-xl q-mt-xl">
        <q-card elevated bordered push>
          <q-card-section> Notification Channels</q-card-section>
          <q-separator></q-separator>
          <q-card-section>
            <div class="row">
              <div class="col-6 q-pa-sm">
                <q-input
                  readonly
                  v-model="bitkopaStore.userDetails.email"
                  label="Email"
                  placeholder="Placeholder"
                  :dense="dense"
                />
              </div>
              <div class="col-6 q-pa-sm">
                <q-input
                  readonly
                  v-model="bitkopaStore.userDetails.phone"
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
                  v-model="bitkopaStore.userDetails.telegram"
                  label="Telegram"
                  placeholder="Placeholder"
                  :dense="dense"
                />
              </div>
              <div class="col-6 q-pa-sm">
                <q-input
                  readonly
                  v-model="bitkopaStore.userDetails.pushNotifications"
                  label="Push Notifications"
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
import { defineComponent } from "vue";
import { useBitkopaStore } from "src/stores/bitkopaStore";

export default defineComponent({
  setup() {
    const bitkopaStore = useBitkopaStore();
    return {
      bitkopaStore,
      lorem:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    };
  },
});
</script>
