import moment from "moment";
import { User } from "../../../../../assets/FeatherIcons";

export const columns = [
  {
    label: "picture",
    hidden: true,
    render: () => <User />,
    align: "right",
    width: "20%",
  },
  {
    label: "pseudo",
    render: ({ pseudo }) => pseudo,
    width: "20%",
  },
  {
    label: "value_score",
    render: (score) => score?.value_score,
    align: "center",
    width: "20%",
  },
  {
    label: "difficulty",
    render: (difficulty) => difficulty.name,
    align: "center",
    width: "20%",
  },
  {
    label: "created_at",
    render: (date) => moment(date?.created_at).format("DD/MM/YYYY"),
    align: "center",
    width: "20%",
  },
];
