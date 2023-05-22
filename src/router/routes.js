import { Main } from "../layout";
import { HomePage } from "../views";

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
];
