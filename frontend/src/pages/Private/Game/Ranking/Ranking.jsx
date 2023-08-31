import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  SectionContent,
  Button,
  Select,
} from "../../../../components/NinjaComp";
import { ArrowLeftCircle } from "../../../../assets/FeatherIcons";
import { DataTable } from "./DataTable/DataTable";

import { useMessageContext } from "../../../../context/MessageNotifContext";
import { useAuthContext } from "../../../../context/AuthContext";
import { columns } from "./columns/columns";

export const Ranking = () => {
  const { responseMessage } = useMessageContext();
  const { requestAPI } = useAuthContext();
  const navigate = useNavigate();
  const { t } = useTranslation();

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
      <div className="ranking-list header">
        <Button
          name="link"
          onClick={() => navigate(-1)}
          icon={<ArrowLeftCircle />}
        >
          Retour au menu
        </Button>
        <h1>TOP 100 DES MEILLEURS SCORES</h1>
        {difficulties?.length && (
          <Select
            id="lobby-difficulty"
            label="Difficulté : "
            initialLabel="select difficulties..."
            options={difficulties.map((item) => ({
              value: item,
              label: t(`settings.difficulty.${item.name}`),
              key: item.id,
            }))}
            onChange={(selectedDifficulty) => {
              setDifficulty(selectedDifficulty);
              setRefresh((prev) => !prev);
            }}
          />
        )}
      </div>
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
