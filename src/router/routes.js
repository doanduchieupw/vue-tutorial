import { Main, Auth } from "../layout";
import { HomePage, Login, Register } from "../views";

export const routes = [
  {
    path: "/",
    component: Main,
    children: [
      {
        path: "",
        component: HomePage,
      },
    ],
  },
  {
    path: "/login",
    component: Auth,
    children: [
      {
        path: "",
        component: Login,
      },
    ],
  },
  {
    path: "/register",
    component: Auth,
    children: [
      {
        path: "",
        component: Register,
      },
    ],
  },
];
