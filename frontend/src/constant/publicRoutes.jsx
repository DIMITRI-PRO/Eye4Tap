import { LogIn, Edit3 } from "../assets/FeatherIcons";

export const publicRoutes = [
  {
    path: "/",
    name: "home",
    ignore: true,
  },
  {
    path: "/login",
    name: "login",
    iconLink: <LogIn />,
  },
  {
    path: "/register",
    name: "register",
    iconLink: <Edit3 />,
  },
  {
    path: "*",
    ignore: true,
  },
];
