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
    <!--preferences and notifications -->
    <div class="gt-md q-pa-xs row justify-center">
      <!--preferences -->
      <div class="col-12 col-md-6 q-pt-xl q-mt-xl q-px-md">
        <q-card elevated bordered push>
          <q-card-section> Preferences </q-card-section>
          <q-separator></q-separator>
          <q-card-section>
            <div class="row">
              <div class="col-6 q-pa-sm">
                <q-select
                  v-model="currency"
                  :options="currencyOptions"
                  label="Local Currency"
                >
                  <template v-slot:prepend>
                    <q-icon name="attach_money"></q-icon>
                  </template>
                </q-select>
              </div>
              <div class="col-6 q-pa-sm">
                <q-select
                  v-model="timezone"
                  :options="timezoneOptions"
                  label="Timezone"
                >
                  <template v-slot:prepend>
                    <q-icon name="schedule"></q-icon>
                  </template>
                </q-select>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <!--Notifications -->
      <div class="col-12 col-md-4 q-pt-xl q-mt-xl q-px-sm">
        <q-card elevated bordered push>
          <q-card-section> Notifications</q-card-section>
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
                >
                  <template v-slot:append>
                    <div>
                      <q-icon name="visibility"></q-icon>
                      <q-icon name="edit"></q-icon>
                      <q-icon name="delete"></q-icon>
                    </div>
                  </template>
                </q-input>
              </div>
              <div class="col-6 q-pa-sm">
                <q-input
                  readonly
                  v-model="bitkopaStore.userDetails.phone"
                  label="Phone"
                  placeholder="Placeholder"
                  :dense="dense"
                >
                  <template v-slot:append>
                    <div>
                      <q-icon name="visibility"></q-icon>
                      <q-icon name="edit"></q-icon>
                      <q-icon name="delete"></q-icon>
                    </div>
                  </template>
                </q-input>
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
                >
                  <template v-slot:append>
                    <div>
                      <q-icon name="visibility"></q-icon>
                      <q-icon name="edit"></q-icon>
                      <q-icon name="delete"></q-icon>
                    </div>
                  </template>
                </q-input>
              </div>
              <div class="col-6 q-pa-sm">
                <q-input
                  readonly
                  v-model="bitkopaStore.userDetails.pushNotifications"
                  label="Push Notifications"
                  placeholder="Placeholder"
                  :dense="dense"
                >
                  <template v-slot:append>
                    <div>
                      <q-toggle
                        v-model="push"
                        checked-icon="check"
                        color="indigo"
                        unchecked-icon="clear"
                      />
                    </div>
                  </template>
                </q-input>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- for small screens -->
    <div class="lt-lg q-pa-xs row justify-center">
      <!--preferences -->
      <div class="col-12 col-md-10 q-pt-xl q-mt-xl q-px-md">
        <q-card elevated bordered push>
          <q-card-section> Preferences </q-card-section>
          <q-separator></q-separator>
          <q-card-section>
            <div class="row">
              <div class="col-6 q-pa-sm">
                <q-select
                  v-model="currency"
                  :options="currencyOptions"
                  label="Local Currency"
                >
                  <template v-slot:prepend>
                    <q-icon name="attach_money"></q-icon>
                  </template>
                </q-select>
              </div>
              <div class="col-6 q-pa-sm">
                <q-select
                  v-model="timezone"
                  :options="timezoneOptions"
                  label="Timezone"
                >
                  <template v-slot:prepend>
                    <q-icon name="schedule"></q-icon>
                  </template>
                </q-select>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <!--Notifications -->
      <div class="col-12 col-md-10 q-pt-xl q-mt-xl q-px-sm">
        <q-card elevated bordered push>
          <q-card-section> Notifications</q-card-section>
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
                >
                  <template v-slot:append>
                    <div>
                      <q-icon name="visibility"></q-icon>
                      <q-icon name="edit"></q-icon>
                      <q-icon name="delete"></q-icon>
                    </div>
                  </template>
                </q-input>
              </div>
              <div class="col-6 q-pa-sm">
                <q-input
                  readonly
                  v-model="bitkopaStore.userDetails.phone"
                  label="Phone"
                  placeholder="Placeholder"
                  :dense="dense"
                >
                  <template v-slot:append>
                    <div>
                      <q-icon name="visibility"></q-icon>
                      <q-icon name="edit"></q-icon>
                      <q-icon name="delete"></q-icon>
                    </div>
                  </template>
                </q-input>
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
                >
                  <template v-slot:append>
                    <div>
                      <q-icon name="visibility"></q-icon>
                      <q-icon name="edit"></q-icon>
                      <q-icon name="delete"></q-icon>
                    </div>
                  </template>
                </q-input>
              </div>
              <div class="col-6 q-pa-sm">
                <q-input
                  readonly
                  v-model="bitkopaStore.userDetails.pushNotifications"
                  label="Push Notifications"
                  placeholder="Placeholder"
                  :dense="dense"
                >
                  <template v-slot:append>
                    <div>
                      <q-toggle
                        v-model="push"
                        checked-icon="check"
                        color="indigo"
                        unchecked-icon="clear"
                      />
                    </div>
                  </template>
                </q-input>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!--payment methods and security -->
    <div class="q-pa-xs row justify-center">
      <!--payment methods -->
      <div class="col-12 col-md-10 q-pt-md q-mt-md q-px-md">
        <q-card elevated bordered push>
          <q-card-section> Payment Methods </q-card-section>
          <q-separator></q-separator>
          <q-card-section>
            <!-- bank account -->
            <div class="row">
              <div class="col-9 col-md-6 q-pa-sm">
                <q-list class="section-1">
                  <q-item clickable v-close-popup>
                    <q-item-section avatar>
                      <q-avatar
                        icon="account_balance"
                        color="brown"
                        text-color="white"
                      />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{
                        bitkopaStore.userDetails.bankDetails.bankName
                      }}</q-item-label>
                      <q-item-label caption>{{
                        bitkopaStore.userDetails.bankDetails.accountNumber
                      }}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <div>
                        <q-icon name="visibility" size="25px"></q-icon>
                        <q-icon name="edit" size="25px"></q-icon>
                        <q-icon name="delete" size="25px"></q-icon>
                      </div>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
              <div class="col-3 col-md-3 q-pa-sm">
                <q-avatar
                  size="35px"
                  icon="check"
                  color="green"
                  text-color="white"
                />
              </div>
            </div>
            <q-separator />

            <!-- mobile money -->
            <div class="row">
              <div class="col-9 col-md-6 q-pa-sm">
                <q-list class="section-1">
                  <q-item clickable v-close-popup>
                    <q-item-section avatar>
                      <q-avatar
                        icon="phone_android"
                        color="positive"
                        text-color="white"
                      />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{
                        bitkopaStore.userDetails.mobileMoney.network
                      }}</q-item-label>
                      <q-item-label caption>{{
                        bitkopaStore.userDetails.mobileMoney.accountNumber
                      }}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <div>
                        <q-icon name="visibility" size="25px"></q-icon>
                        <q-icon name="edit" size="25px"></q-icon>
                        <q-icon name="delete" size="25px"></q-icon>
                      </div>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
              <div class="col-3 col-md-3 q-pa-sm">
                <q-avatar
                  size="35px"
                  icon="check"
                  color="positive"
                  text-color="white"
                />
              </div>
            </div>
            <q-separator />
            <!-- mobile money 2 -->
            <div class="row">
              <div class="col-9 col-md-6 q-pa-sm">
                <q-list class="section-1">
                  <q-item clickable v-close-popup>
                    <q-item-section avatar>
                      <q-avatar
                        icon="phone_android"
                        color="negative"
                        text-color="white"
                      />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{
                        bitkopaStore.userDetails.mobileMoney2.network
                      }}</q-item-label>
                      <q-item-label caption>{{
                        bitkopaStore.userDetails.mobileMoney2.accountNumber
                      }}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <div>
                        <q-icon name="visibility" size="25px"></q-icon>
                        <q-icon name="edit" size="25px"></q-icon>
                        <q-icon name="delete" size="25px"></q-icon>
                      </div>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
              <div class="col-3 col-md-3 q-pa-sm">
                <q-avatar
                  size="35px"
                  icon="close"
                  color="negative"
                  text-color="white"
                />
              </div>
            </div>
          </q-card-section>
          <q-card-actions>
            <div class="row q-px-lg">
              <q-btn
                outline
                color="indigo"
                label="Add Payment Method"
                no-caps
              ></q-btn>
            </div>
          </q-card-actions>
        </q-card>
      </div>
      <!-- security -->
      <div class="col-12 col-md-10 q-pt-md q-mt-md q-px-xs q-mb-md">
        <q-card elevated bordered push>
          <q-card-section> Account Security </q-card-section>
          <q-separator></q-separator>
          <q-card-section>
            <!-- 2FA-->
            <div class="row">
              <div class="col-12 q-pa-sm">
                <q-list class="section-1">
                  <q-item clickable v-close-popup>
                    <q-item-section avatar>
                      <q-avatar
                        icon="lock"
                        color="primary"
                        text-color="white"
                      />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label> 2 Factor Authentication </q-item-label>
                      <q-item-label caption>
                        Secure your account with 2FA
                      </q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <div>
                        <q-toggle
                          v-model="push"
                          checked-icon="check"
                          color="indigo"
                          unchecked-icon="clear"
                        />
                      </div>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
            </div>
            <q-separator />

            <!-- Anti phishing -->
            <div class="row">
              <div class="col-12 q-pa-sm">
                <q-list class="section-1">
                  <q-item clickable v-close-popup>
                    <q-item-section avatar>
                      <q-avatar
                        icon="phishing"
                        color="secondary"
                        text-color="white"
                      />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label> Anti-phishing Secret Word </q-item-label>
                      <q-item-label caption> strong secret </q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <div>
                        <q-icon name="visibility" size="25px"></q-icon>
                        <q-icon name="edit" size="25px"></q-icon>
                        <q-icon name="delete" size="25px"></q-icon>
                      </div>
                    </q-item-section>
                  </q-item>
                </q-list>
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
      currency: ref("KES - Kenyan Shillings"),
      currencyOptions: ["KES - Kenyan Shillings", "NGN - Nigerian Naira"],
      timezone: ref("GMT+03:00 - Nairobi"),
      timezoneOptions: ["GMT+03:00 - Nairobi", "GMT+01:00 - Lagos"],
      push: ref(true),
      lorem:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    };
  },
});
</script>
