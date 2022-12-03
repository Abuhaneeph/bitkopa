<template>
  <q-page v-if="!bitkopaStore.connected || !bitkopaStore.verified">
    <div class="q-pa-xs row justify-center">
      <div class="col-5">
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
      <div class="col-6">
        <div class="q-pa-md">
          <q-item style="max-width: 300px">
            <q-item-section avatar>
              <q-skeleton type="QAvatar" />
            </q-item-section>

            <q-item-section>
              <q-item-label>
                <q-skeleton type="text" />
              </q-item-label>
              <q-item-label caption>
                <q-skeleton type="text" width="65%" />
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item style="max-width: 300px">
            <q-item-section avatar>
              <q-skeleton type="QAvatar" />
            </q-item-section>

            <q-item-section>
              <q-item-label>
                <q-skeleton type="text" />
              </q-item-label>
              <q-item-label caption>
                <q-skeleton type="text" width="90%" />
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item style="max-width: 300px">
            <q-item-section avatar>
              <q-skeleton type="QAvatar" />
            </q-item-section>

            <q-item-section>
              <q-item-label>
                <q-skeleton type="text" width="35%" />
              </q-item-label>
              <q-item-label caption>
                <q-skeleton type="text" />
              </q-item-label>
            </q-item-section>
          </q-item>
        </div>
      </div>
    </div>
    <div class="q-pa-xs row justify-center">
      <div class="col-9">
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
      <div class="col-2">
        <div class="q-pa-md"></div>
      </div>
    </div>
    <div class="q-pa-xs row justify-center">
      <div class="col-9">
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
      <div class="col-2">
        <div class="q-pa-md"></div>
      </div>
    </div>
  </q-page>

  <q-page v-if="bitkopaStore.connected && bitkopaStore.verified">
    <div class="q-pa-xs row justify-center">
      <div class="col-12 col-md-6 q-px-sm q-pt-md q-mt-md">
        <q-card class="section-1">
          <q-card-section class="text-center q-px-md">
            <q-btn
              style="pointer-events: none"
              icon="waving_hand"
              size="15px"
              flat
              class="text-dark q-mr-xs"
              rounded
              color="secondary"
              label="Hello Robert, these are your Bitkopa Stats"
              no-caps
            />
            <!--if no loans -->
            <q-list
              class="text-center"
              v-if="
                bitkopaStore.loans.active.length === 0 &&
                bitkopaStore.loans.requested.length === 0 &&
                bitkopaStore.loans.completed.length === 0 &&
                bitkopaStore.loans.liquidated.length === 0
              "
            >
              <q-item>
                <q-item-section avatar>
                  <q-btn
                    style="pointer-events: none"
                    size="15px"
                    flat
                    icon="attach_money"
                    class="text-dark q-mr-md"
                    rounded
                    color="indigo"
                    label="Total Loans"
                    no-caps
                  />
                </q-item-section>

                <q-item-section side>
                  <q-item-label class="text-bold q-px-xl"
                    >Total Debt:
                  </q-item-label>
                  <q-item-label overline class="q-px-xl">0 </q-item-label>
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section avatar>
                  <q-btn
                    style="pointer-events: none"
                    size="15px"
                    icon="currency_bitcoin"
                    flat
                    class="text-dark"
                    rounded
                    color="indigo"
                    label="Total Collateral"
                    no-caps
                  />
                </q-item-section>

                <q-item-section side>
                  <q-item-label class="q-px-xl text-bold"
                    >Collateral locked</q-item-label
                  >
                  <q-item-label overline class="q-px-xl">0 </q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar>
                  <q-btn
                    style="pointer-events: none"
                    size="15px"
                    icon="percent"
                    flat
                    class="text-dark q-mr-lg"
                    rounded
                    color="indigo"
                    label="Total LTV"
                    no-caps
                  />
                </q-item-section>

                <q-item-section side>
                  <q-item-label class="q-px-xl q-mr-xl text-bold"
                    >Cumulative LTV</q-item-label
                  >
                  <q-item-label overline class="q-px-xl q-ml-xl"
                    >0%</q-item-label
                  >
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar>
                  <div>
                    <q-btn
                      style="pointer-events: none"
                      size="15px"
                      icon="emoji_events"
                      flat
                      class="text-dark q-mr-sm"
                      rounded
                      color="indigo"
                      label="VIP TIER BRONZE"
                      no-caps
                    />
                  </div>
                </q-item-section>

                <q-item-section side>
                  <q-item-label class="q-px-sm text-bold"
                    >All Bitkopa loans</q-item-label
                  >
                  <q-item-label overline class="q-px-xl">0</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>

            <!--if there are loans -->
            <q-list v-else>
              <q-item>
                <q-item-section avatar>
                  <q-btn
                    style="pointer-events: none"
                    size="15px"
                    flat
                    icon="attach_money"
                    class="text-dark q-mr-xs"
                    rounded
                    color="indigo"
                    label="Total Loans"
                    no-caps
                  />
                </q-item-section>

                <q-item-section side>
                  <q-item-label class="text-bold q-px-xl"
                    >Total Debt:
                  </q-item-label>
                  <q-item-label overline class="q-px-xl"
                    >{{
                      parseInt(bitkopaStore.totalLoanAmount).toLocaleString()
                    }}
                    KES</q-item-label
                  >
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section avatar>
                  <q-btn
                    style="pointer-events: none"
                    size="15px"
                    icon="currency_bitcoin"
                    flat
                    class="text-dark"
                    rounded
                    color="indigo"
                    label="Total Collateral"
                    no-caps
                  />
                </q-item-section>

                <q-item-section side>
                  <q-item-label class="q-px-md text-bold"
                    >Collateral locked</q-item-label
                  >
                  <q-item-label overline class="q-px-lg"
                    >{{
                      parseInt(
                        bitkopaStore.totalCollateralAmount
                      ).toLocaleString()
                    }}
                    KES</q-item-label
                  >
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar>
                  <q-btn
                    style="pointer-events: none"
                    size="15px"
                    icon="percent"
                    flat
                    class="text-dark q-mr-lg"
                    rounded
                    color="indigo"
                    label="Total LTV"
                    no-caps
                  />
                </q-item-section>

                <q-item-section side>
                  <q-item-label class="q-px-lg q-mr-xl text-bold"
                    >Cumulative LTV</q-item-label
                  >
                  <q-item-label
                    v-if="
                      !Number.isNaN(
                        (parseFloat(bitkopaStore.totalLoanAmount) /
                          parseFloat(bitkopaStore.totalCollateralAmount)) *
                          100
                      )
                    "
                    overline
                    class="q-px-xs q-ml-xl"
                    >{{
                      (
                        (parseFloat(bitkopaStore.totalLoanAmount) /
                          parseFloat(bitkopaStore.totalCollateralAmount)) *
                        100
                      ).toFixed(2)
                    }}%</q-item-label
                  >
                  <q-item-label v-else overline class="q-px-xs q-ml-xl"
                    >0%</q-item-label
                  >
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar>
                  <div>
                    <q-btn
                      style="pointer-events: none"
                      size="15px"
                      icon="emoji_events"
                      flat
                      class="text-dark"
                      rounded
                      color="warning"
                      label="VIP TIER GOLD"
                      no-caps
                    />
                  </div>
                </q-item-section>

                <q-item-section side>
                  <q-item-label class="q-px-md text-bold"
                    >All Bitkopa loans</q-item-label
                  >
                  <q-item-label overline class="q-px-xl text-bold"
                    >{{
                      bitkopaStore.loans.active.length +
                      bitkopaStore.loans.requested.length +
                      bitkopaStore.loans.completed.length +
                      bitkopaStore.loans.liquidated.length
                    }}
                    loans</q-item-label
                  >
                </q-item-section>
              </q-item>
            </q-list>
            <p class="text-caption q-px-xl" style="color: indigo">
              Repaying loans in advance means paying less interest.
            </p>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-md-6 q-px-sm q-pt-md q-mt-md">
        <q-card class="section-1">
          <q-card-section>
            <q-toolbar class="bg-secondary text-white shadow-2">
              <q-toolbar-title>Notifications</q-toolbar-title>
            </q-toolbar>

            <q-list bordered>
              <q-item
                v-for="notification in notifications"
                :key="notification.id"
                class="q-my-xs"
                clickable
                v-ripple
              >
                <q-item-section avatar>
                  <q-avatar color="indigo" text-color="white">
                    {{ notification.letter }}
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label>{{ notification.name }}</q-item-label>
                  <q-item-label caption lines="1">{{
                    notification.email
                  }}</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-icon name="chat_bubble" color="green" />
                </q-item-section>
              </q-item>

              <q-separator />
              <q-item-label header>Read</q-item-label>

              <q-item
                v-for="notification in read"
                :key="notification.id"
                class="q-pt-md"
                clickable
                v-ripple
              >
                <q-item-section avatar>
                  <q-avatar color="grey" text-color="white">
                    {{ notification.letter }}
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label>{{ notification.name }}</q-item-label>
                  <q-item-label caption lines="1">{{
                    notification.email
                  }}</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-icon name="chat_bubble" color="grey" />
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="q-pa-xs row justify-center">
      <div class="col-12 col-md-12 q-px-sm q-pt-sm q-mt-sm">
        <q-card class="q-pt-sm">
          <q-tabs
            v-model="tab"
            dense
            class="text-dark"
            active-color="indigo"
            indicator-color="secondary"
            align="justify"
            narrow-indicator
          >
            <q-tab name="active" icon="pending" label="Active Loans">
              <q-badge color="indigo" floating>{{
                bitkopaStore.loans.active.length
              }}</q-badge>
            </q-tab>
            <q-tab
              name="requested"
              icon="hourglass_bottom"
              label="Being Processed"
            >
              <q-badge color="indigo" floating>{{
                bitkopaStore.loans.requested.length
              }}</q-badge>
            </q-tab>
            <q-tab name="completed" icon="task_alt" label="Completed Loans">
              <q-badge color="indigo" floating>{{
                bitkopaStore.loans.completed.length
              }}</q-badge>
            </q-tab>
            <q-tab name="liquidated" icon="payments" label="Liquidated">
              <q-badge color="indigo" floating>{{
                bitkopaStore.loans.liquidated.length
              }}</q-badge>
            </q-tab>
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="active">
              <q-table
                :grid="$q.screen.xs"
                :loading="!bitkopaStore.loans.active.length"
                no-data-label="Couldnt find any loans"
                color="secondary"
                card-class=""
                table-class="text-dark"
                table-header-class="text-secondary"
                flat
                bordered
                :rows="bitkopaStore.loans.active"
                :columns="ActiveLoansColumns"
                row-key="name"
                @row-contextmenu="bitkopaStore.manageActiveLoan"
                @row-click="bitkopaStore.manageActiveLoan"
                @row-dblclick="bitkopaStore.manageActiveLoan"
              />

              <div v-if="!bitkopaStore.loans.active.length">
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
            </q-tab-panel>

            <q-tab-panel name="requested">
              <q-table
                :loading="!bitkopaStore.loans.requested.length"
                :grid="$q.screen.xs"
                color="secondary"
                card-class=""
                table-class="text-dark"
                table-header-class="text-secondary"
                flat
                bordered
                :rows="bitkopaStore.loans.requested"
                :columns="RequestedLoansColumns"
                row-key="name"
              />

              <div v-if="!bitkopaStore.loans.requested.length">
                <q-banner inline-actions rounded class="bg-white text-dark">
                  You currently don't have any processing loans.

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
            </q-tab-panel>

            <q-tab-panel name="completed">
              <q-table
                :loading="!bitkopaStore.loans.completed.length"
                :grid="$q.screen.xs"
                color="secondary"
                card-class=""
                table-class="text-dark"
                table-header-class="text-secondary"
                flat
                bordered
                :rows="bitkopaStore.loans.completed"
                :columns="RequestedLoansColumns"
                row-key="name"
              />

              <div v-if="!bitkopaStore.loans.completed.length">
                <q-banner inline-actions rounded class="bg-white text-dark">
                  You currently don't have any completed loans.

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
            </q-tab-panel>

            <q-tab-panel name="liquidated">
              <q-table
                :loading="!bitkopaStore.loans.liquidated.length"
                :grid="$q.screen.xs"
                color="secondary"
                card-class=""
                table-class="text-dark"
                table-header-class="text-secondary"
                flat
                bordered
                :rows="bitkopaStore.loans.liquidated"
                :columns="RequestedLoansColumns"
                row-key="name"
              />

              <div v-if="!bitkopaStore.loans.liquidated.length">
                <q-banner inline-actions rounded class="bg-white text-dark">
                  You currently don't have any liquidated loans.

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
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
    </div>

    <div class="q-pt-md row justify-center">
      <div class="col-12 col-md-12 q-px-md q-mb-xl">
        <q-table
          style="height: 400px"
          :grid="$q.screen.xs"
          :loading="!bitkopaStore.transactions.length"
          color="secondary"
          card-class=""
          table-class="text-dark"
          table-header-class="text-secondary"
          flat
          bordered
          title="Transactions"
          :rows="bitkopaStore.transactions"
          :columns="TransactionsColumns"
          row-key="name"
          :filter="filter"
          virtual-scroll
          v-model:pagination="pagination"
          :rows-per-page-options="[0]"
        >
          <template v-slot:body-cell-asset="props">
            <q-td :props="props">
              <div class="row items-center no-wrap">
                <q-icon
                  size="20px"
                  left
                  :name="`img:tokens/${props.row.assetIcon}`"
                />
                <div class="text-center">
                  <q-space></q-space>{{ props.row.asset.toUpperCase() }}
                </div>
              </div>
            </q-td>
          </template>
          <template v-slot:body-cell-tx_hash="props">
            <q-td :props="props">
              <div class="row items-center no-wrap">
                <q-btn
                  tag="a"
                  :href="`https://mumbai.polygonscan.com/tx/${props.row.tx_hash}`"
                  target="blank"
                  size="12px"
                  flat
                  no-caps
                  rounded
                  class="text-indigo text-overline"
                >
                  {{
                    props.row.tx_hash.slice(0, 3) +
                    "..." +
                    props.row.tx_hash.slice(-3)
                  }}
                </q-btn>
              </div>
            </q-td>
          </template>
          <template v-slot:top-right>
            <q-input
              borderless
              dense
              debounce="300"
              v-model="filter"
              placeholder="Search"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>
          <template v-slot:bottom-left>
            <q-btn
              color="primary"
              icon-right="archive"
              label="Export to csv"
              no-caps
              @click="exportTable"
            />
          </template>
        </q-table>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useBitkopaStore } from "src/stores/bitkopaStore";

const bitkopaStore = useBitkopaStore();
const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};
const ActiveLoansColumns = [
  {
    name: "name",
    required: true,
    field: "loanId",
    label: "Loan ID",
    align: "left",
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "processedTimestamp",
    required: true,
    label: "Processed On",
    field: "processedTimestamp",
    align: "left",
    format: (val) =>
      new Date(val * 1000).toLocaleDateString(undefined, options),
    sortable: true,
  },
  {
    name: "loanAmount",
    required: true,
    label: "Loan Amount",
    field: "loanAmount",
    align: "left",
    format: (val, row) =>
      parseInt(val).toLocaleString() +
      " " +
      bitkopaStore.paymentMethods[row.paymentMethodId - 1].symbol,
    sortable: true,
  },
  {
    name: "collateralAmount",
    required: true,
    label: "Collateral Amount",
    field: "collateralAmount",
    align: "left",
    format: (val, row) =>
      (val / 10 ** row.decimals).toFixed(6) + " " + row.symbol,
    sortable: true,
  },
  {
    name: "balance",
    required: true,
    label: "Loan Balance",
    field: "balance",
    align: "left",
    format: (val, row) =>
      parseInt(val).toLocaleString() +
      " " +
      bitkopaStore.paymentMethods[row.paymentMethodId - 1].symbol,
    sortable: true,
  },
  {
    name: "countdown",
    required: true,
    field: "countdown",
    label: "Duration Remaining",
    align: "left",

    sortable: true,
  },
  {
    name: "ltv",
    required: true,
    field: "ltv",
    label: "Current LTV",
    align: "left",
    format: (val) => `${val}%`,

    sortable: true,
  },
  {
    name: "liquidationPrice",
    required: true,
    field: "liquidationPrice",
    label: "Liquidation Price (USD)",
    align: "left",
    format: (val) => `$${val}`,

    sortable: true,
  },
];
const TransactionsColumns = [
  {
    required: true,
    field: "loanId",
    label: "Loan ID",
    align: "left",
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "asset",
    required: true,
    label: "Asset",
    field: "asset",
    align: "left",
  },
  {
    name: "name",
    required: true,
    label: "Processed On",
    field: "timestamp",
    align: "left",
    format: (val) =>
      new Date(val * 1000).toLocaleDateString(undefined, options),
    sortable: true,
    sort: (a, b) => a - b,
  },

  {
    name: "tx_hash",
    required: true,
    label: "Tx Hash",
    field: "tx_hash",
    align: "left",
    format: (val) => val.slice(0, 3) + "..." + val.slice(-3),
  },

  {
    name: "tx_type",
    required: true,
    label: "Txn Type",
    field: "tx_type",
    align: "left",
    format: (val) => `${val}`,

    sortable: true,
  },
  {
    name: "txAmount",
    required: true,
    label: "Txn Amount",
    field: "tx_amount",
    align: "left",
    format: (val) => `${val}`,

    sortable: true,
  },
  {
    name: "collateralAmount",
    required: true,
    label: "Collateral Amount",
    field: "collateralAmount",
    align: "left",
    format: (val) => `${val}`,

    sortable: true,
  },
  {
    name: "balance",
    required: true,
    label: "Loan Balance",
    field: "balance",
    align: "left",
    format: (val) => `${val}`,

    sortable: true,
  },
  {
    name: "status",
    required: true,
    label: "Loan Status",
    field: "status",
    align: "left",
    format: (val) => `${val}`,

    sortable: true,
  },
];

const RequestedLoansColumns = [
  {
    name: "name",
    required: true,
    field: "loanId",
    label: "Loan ID",
    align: "left",
    format: (val) => `${val}`,
    sortable: true,
  },

  {
    name: "loanAmount",
    required: true,
    label: "Loan Amount",
    field: "loanAmount",
    align: "left",
    format: (val, row) =>
      parseInt(val).toLocaleString() +
      " " +
      bitkopaStore.paymentMethods[row.paymentMethodId - 1].symbol,
    sortable: true,
  },
  {
    name: "collateralAmount",
    required: true,
    label: "Collateral Amount",
    field: "collateralAmount",
    align: "left",
    format: (val, row) =>
      (val / 10 ** row.decimals).toFixed(6) + " " + row.symbol,
    sortable: true,
  },

  {
    name: "duration",
    required: true,
    field: "duration",
    label: "Loan Duration",
    align: "left",
    format: (val) => `${val} days`,

    sortable: true,
  },
  {
    name: "paymentMethodId",
    required: true,
    field: "paymentMethodId",
    label: "Payment Method",
    align: "left",
    format: (val, row) =>
      (val = bitkopaStore.paymentMethods[row.paymentMethodId - 1].name),

    sortable: true,
  },
];
const notifications = [
  {
    id: 1,
    name: "Account Info",
    email: "info@bitkopa.com",
    letter: "I",
  },
  {
    id: 2,
    name: "Loan Processed",
    email: "loans@bitkopa.com",
    letter: "L",
  },
];

const read = [
  {
    id: 5,
    name: "Bitkopa Support",
    email: "support@bitkopa.com",
    letter: "S",
  },
];
export default defineComponent({
  setup() {
    return {
      tab: ref("active"),
      bitkopaStore,
      ActiveLoansColumns,
      RequestedLoansColumns,
      TransactionsColumns,

      notifications,
      read,
      filter: ref(""),
      pagination: ref({
        rowsPerPage: 100,
        sortBy: "timestamp",
        descending: true,
      }),
    };
  },
});
</script>
