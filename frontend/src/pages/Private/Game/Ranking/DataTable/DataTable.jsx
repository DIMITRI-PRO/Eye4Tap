import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import { useMessageContext } from "../../../../../context/MessageNotifContext";
import { useAuthContext } from "../../../../../context/AuthContext";

import { Button, Table } from "../../../../../components/NinjaComp";
import { RefreshCw } from "../../../../../assets/FeatherIcons";

export const DataTable = ({
  id,
  resource,
  header,
  columns,
  extraQuery,
  pagination,
  paginationOption,
  refresh,
  setRefresh,
  withRefreshButton,
}) => {
  const { t } = useTranslation();
  const { responseMessage } = useMessageContext();
  const { requestAPI } = useAuthContext();

  const { limit } = paginationOption;

  const tableContainerRef = useRef(null);

  const [datas, setDatas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const getRessources = async () => {
    setIsLoading(true);
    try {
      const { data } = await requestAPI(
        `${resource}?${limit ? `limit=${limit}&` : ""}page=${currentPage}${
          extraQuery ? `&${extraQuery}` : ""
        }`
      );
      if (data?.datas?.length === 0) setCurrentPage(1);
      setDatas(data);
      setIsLoading(false);
    } catch (error) {
      responseMessage(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getRessources();
  }, [refresh, currentPage]);

  return (
    <div className="ninja datatable">
      <div className="ninja datatable-header">
        {header && (
          <>
            {header && header}
            {withRefreshButton && (
              <Button
                isLoading={isLoading}
                onClick={() => setRefresh?.(!refresh)}
                icon={<RefreshCw />}
              >
                {t("settings.datatable.reload")}
              </Button>
            )}
          </>
        )}
      </div>
      <Table
        id={id}
        ref={tableContainerRef}
        isLoading={isLoading}
        datas={datas?.datas}
        headers={columns}
        limit={limit}
        totalCount={datas?.infos?.total_count}
        dataLength={datas?.datas?.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        hiddenPagination={!pagination}
      />
    </div>
  );
};

DataTable.propTypes = {
  id: PropTypes.string,
  resource: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      render: PropTypes.func,
      align: PropTypes.string,
      width: PropTypes.string,
    })
  ),
  extraQuery: PropTypes.string,
  pagination: PropTypes.bool,
  paginationOption: PropTypes.shape({
    limit: PropTypes.number,
  }).isRequired,
  refresh: PropTypes.bool,
  setRefresh: PropTypes.func,
  header: PropTypes.element,
  withRefreshButton: PropTypes.bool,
};
DataTable.defaultProps = {
  id: null,
  withRefreshButton: false,
  refresh: false,
  setRefresh: null,
  columns: [],
  pagination: false,
  extraQuery: null,
  header: null,
};
