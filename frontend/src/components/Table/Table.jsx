import React from "react";
import PropTypes from "prop-types";
import { TableRow } from "./TableRow";
import { TableHead } from "./TableHead";
import { Pagination } from "./Pagination";

const Table = ({
  id,
  ref,
  isLoading,
  datas,
  headers,
  pagination,
  children,
  dataLength,
  totalCount,
  limit,
  hiddenPagination,
  currentPage,
  setCurrentPage,
}) => {
  return (
    <>
      <table ref={ref} className="ninja table-container">
        {/* TO DO : pass all props for each element inside children props */}
        {children || (
          <>
            <TableHead id={id} headers={headers} />
            <TableRow
              id={id}
              isLoading={isLoading}
              datas={datas}
              headers={headers}
              defaultLimit={limit}
            />
          </>
        )}
      </table>
      {pagination || (
        <Pagination
          id={id}
          limit={limit}
          dataLength={dataLength}
          totalCount={totalCount}
          hidden={hiddenPagination}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </>
  );
};

Table.propTypes = {
  id: PropTypes.string,
  ref: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  datas: PropTypes.arrayOf({}),
  isLoading: PropTypes.bool,
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      render: PropTypes.func,
      align: PropTypes.string,
      width: PropTypes.string,
    })
  ),
  children: PropTypes.node,
  pagination: PropTypes.element,
  paginationOption: PropTypes.shape({
    limit: PropTypes.number,
  }).isRequired,
  dataLength: PropTypes.number,
  totalCount: PropTypes.number,
  limit: PropTypes.number,
  hiddenPagination: PropTypes.bool,
  currentPage: PropTypes.number,
  setCurrentPage: PropTypes.func,
};
Table.defaultProps = {
  id: null,
  ref: null,
  isLoading: false,
  datas: null,
  children: null,
  headers: [],
  pagination: null,
  dataLength: 0,
  totalCount: null,
  limit: PropTypes.number,
  hiddenPagination: false,
  currentPage: null,
  setCurrentPage: null,
};

export default {
  Table,
  TableHead,
  TableRow,
  Pagination,
};
