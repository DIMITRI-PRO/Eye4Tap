export const publicRoutes = [
  {
    path: "/",
    name: "home",
    ignore: true,
  },
  {
    path: "/login",
    name: "login",
  },
  {
    path: "/register",
    name: "register",
  },
  {
    path: "*",
    ignore: true,
  },
];
