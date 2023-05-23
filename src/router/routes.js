import { Main, Auth } from "../layout";
import { CreateBlog, HomePage, Login, Register, ViewBlog } from "../views";

export const routes = [
  {
    path: "/",
    component: Main,
    children: [
      {
        path: "",
        component: HomePage,
      },
      {
        path: "/create-new-blog",
        component: CreateBlog,
      },
      {
        path: "/view/:id",
        component: ViewBlog,
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
