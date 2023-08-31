import React from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const TableHead = ({ id, headers }) => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  return (
    <thead id={id && `table-header-${id}`} className="ninja table-header">
      <tr>
        {headers &&
          headers.map(({ label, align, hidden }) => (
            <th
              key={`key-${label}`}
              style={{
                textAlign: align || "left",
              }}
              className={`table-header-name ${label}`}
            >
              {!hidden &&
                t(`pages${pathname.split("/").join(".")}.table.${label}`)}
            </th>
          ))}
      </tr>
    </thead>
  );
};

TableHead.propTypes = {
  id: PropTypes.string,
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      render: PropTypes.func,
      align: PropTypes.string,
      width: PropTypes.string,
    })
  ),
};

TableHead.defaultProps = {
  id: null,
  headers: [],
};
