import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Admin from "../views/Admin/Admin.vue";
import Verify from "../views/Account/Verify.vue";
import Login from "../views/Account/Login.vue";
import Register from "../views/Account/Register.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/menu",
    name: "Menu",
    component: () => import(/* webpackChunkName: "menu" */ "../views/Menu.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/contact",
    name: "Contact",
    component: () =>
      import(/* webpackChunkName: "contact" */ "../views/Contact.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
    meta: { requiresAuth: false },
    children: [
      {
        path: "/history",
        component: () =>
          import(/* webpackChunkName: "history" */ "../views/History.vue"),
      },
      {
        path: "/delivery",
        component: () =>
          import(/* webpackChunkName: "delivery" */ "../views/Delivery.vue"),
      },
      {
        path: "/ordering-guide",
        component: () =>
          import(
            /* webpackChunkName: "orderingguide" */ "../views/OrderingGuide.vue"
          ),
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { requiresAuth: false },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { requiresAuth: false },
  },
  {
    path: "/verify",
    name: "Verify",
    component: Verify,
    meta: { requiresAuth: false },
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "*",
    redirect: "/",
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    //  const user = JSON.parse(localStorage.getItem("user"))
    let user = {
      email: "enguyen807@gmail.com",
      isVerified: true,
      isAdmin: false,
      isLoggedIn: true,
    };
    if (!user.email) {
      next({
        path: "/register",
      });
    } else if (!user.isVerified) {
      next({
        path: "/verify",
      });
    } else if (!user.isLoggedIn) {
      next({
        path: "/login",
      });
    } else if (!user.isAdmin) {
      next({
        path: "/",
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
