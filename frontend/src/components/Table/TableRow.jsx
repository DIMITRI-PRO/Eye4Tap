import React from "react";
import PropTypes from "prop-types";

export const TableRow = ({ id, isLoading, headers, datas, defaultLimit }) => {
  const datasLength = datas?.length || 0;
  const ArrayIncludeData = defaultLimit - datasLength;

  const defaultDatas = Array.from({
    length: datasLength > 0 ? ArrayIncludeData : defaultLimit,
  }).map((_, index) => {
    const idRow = `row-number-${index + 1}`;
    return {
      id: idRow,
      defaultValue: " ",
    };
  });

  const renderRowByHeader = (dataToRender = []) =>
    dataToRender?.length &&
    dataToRender?.map((data, index) => (
      <tr
        key={data.id}
        style={{ animationDelay: `${0.1 * index}s` }}
        className={`ninja table-body tr-row loading-${
          !isLoading ? "once" : "infinite"
        }`}
      >
        {headers.map(({ render, align, width }, j) => {
          const idTd = `${data.id}-${j}`;
          return (
            <td
              key={idTd}
              className="ninja table-body td-row"
              style={{
                width,
                textAlign: align || "left",
              }}
            >
              {data.defaultValue || render?.(data)}
            </td>
          );
        })}
      </tr>
    ));

  return (
    headers && (
      <tbody id={id && `table-body-${id}`} className="ninja table-body">
        {!datas
          ? renderRowByHeader(defaultDatas)
          : renderRowByHeader([...datas, ...defaultDatas])}
      </tbody>
    )
  );
};

TableRow.propTypes = {
  id: PropTypes.string,
  defaultLimit: PropTypes.number,
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      render: PropTypes.func,
      align: PropTypes.string,
      width: PropTypes.string,
    })
  ),
  datas: PropTypes.arrayOf(PropTypes.shape({})),
  isLoading: PropTypes.bool,
};
TableRow.defaultProps = {
  id: null,
  headers: [],
  defaultLimit: 5,
  datas: [],
  isLoading: false,
};
