import { Settings } from "../assets/FeatherIcons";

export const privateRoutes = [
  {
    path: "/profile",
    name: "profile",
    iconLink: <Settings />,
  },
  {
    path: "/game",
    name: "game",
    ignore: true,
  },
];
