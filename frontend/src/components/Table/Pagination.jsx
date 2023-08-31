import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import { Button } from "../Buttons/Button";
import { ArrowLeft, ArrowRight } from "../../assets/FeatherIcons";

export const Pagination = ({
  id,
  hidden,
  disabled,
  currentPage,
  setCurrentPage,
  limit,
  dataLength,
  totalCount,
  noNum,
}) => {
  const { t } = useTranslation();
  return (
    !hidden && (
      <div id={id && `pagination-${id}`} className="ninja pagination-basic">
        <Button
          name="link"
          disabled={currentPage <= 1 || disabled}
          onClick={() => setCurrentPage?.((prev) => prev - 1)}
          icon={<ArrowLeft />}
        >
          {t("settings.pagination.previous")}
        </Button>
        {/* TO DO : add numerotation for pagination */}
        <div
          className={`ninja pagination-basic-numerotation ${
            noNum ? "hidden" : ""
          }`}
        >
          {totalCount &&
            Array.from({ length: Math.ceil(totalCount / limit) }).map(
              (_, index) => {
                const idPage = index + 1;
                return (
                  <Button
                    name={`link ${idPage === currentPage ? "disabled" : ""}`}
                    id={id && `pagination-numerotation-${id}`}
                    onClick={() => {
                      if (idPage !== currentPage) setCurrentPage(idPage);
                    }}
                  >
                    {idPage}
                  </Button>
                );
              }
            )}
        </div>
        <Button
          name="link"
          disabled={
            currentPage * limit - limit + dataLength >= totalCount || disabled
          }
          onClick={() => setCurrentPage?.((prev) => prev + 1)}
        >
          {t("settings.pagination.next")} <ArrowRight />
        </Button>
      </div>
    )
  );
};

Pagination.propTypes = {
  id: PropTypes.string,
  limit: PropTypes.number,
  dataLength: PropTypes.number,
  totalCount: PropTypes.number,
  currentPage: PropTypes.number,
  setCurrentPage: PropTypes.func,
  disabled: PropTypes.bool,
  hidden: PropTypes.bool,
  noNum: PropTypes.bool,
};
Pagination.defaultProps = {
  id: null,
  limit: 5,
  dataLength: 5,
  totalCount: 5,
  disabled: false,
  currentPage: 1,
  setCurrentPage: null,
  hidden: false,
  noNum: false,
};
