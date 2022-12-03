const routes = [
  {
    path: "/",
    component: () => import("layouts/LandingPageLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },
  {
    path: "/dashboard",
    component: () => import("layouts/DashboardLayout.vue"),
    children: [
      { path: "", component: () => import("pages/DashboardPage.vue") },
      { path: "/profile", component: () => import("pages/ProfilePage.vue") },
      { path: "/settings", component: () => import("pages/SettingsPage.vue") },
      { path: "/support", component: () => import("pages/SupportPage.vue") },
      {
        path: "/request",
        component: () => import("pages/LoanRequestPage.vue"),
      },
      {
        path: "/repay",
        component: () => import("pages/LoanRepayPage.vue"),
      },
      {
        path: "/topup",
        component: () => import("pages/TopUpPage.vue"),
      },
      {
        path: "/withdraw",
        component: () => import("pages/WithdrawExcessPage.vue"),
      },
      {
        path: "/verification",
        component: () => import("pages/VerificationPage.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
