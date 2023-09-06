import { useState, useEffect } from "react";

import { SectionContent } from "../../../../components/NinjaComp";

import DataTable from "./DataTable/DataTable";
import { HeaderPage } from "./HeaderPage/HeaderPage";

import { useMessageContext } from "../../../../context/MessageNotifContext";
import { useAuthContext } from "../../../../context/AuthContext";
import { columns } from "./columns/columns";

export const Ranking = () => {
  const { responseMessage } = useMessageContext();
  const { requestAPI } = useAuthContext();

  const [difficulties, setDifficulties] = useState();
  const [difficulty, setDifficulty] = useState();
  const [refresh, setRefresh] = useState(false);

  const getDifficulties = async () => {
    try {
      const { data } = await requestAPI("difficulties");
      setDifficulties(data);
    } catch (error) {
      responseMessage(error);
    }
  };

  useEffect(() => {
    getDifficulties();
  }, []);

  return (
    <SectionContent pageName="ranking">
      <HeaderPage
        difficulties={difficulties}
        setDifficulty={setDifficulty}
        setRefresh={setRefresh}
      />
      <DataTable
        id="ranking"
        resource="scores"
        refresh={refresh}
        columns={columns}
        setRefresh={setRefresh}
        extraQuery={`${difficulty?.id ? `difficulty=${difficulty?.id}` : ""}`}
        pagination
        paginationOption={{ limit: 10 }}
        withRefreshButton
      />
    </SectionContent>
  );
};
