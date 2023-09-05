const dataJoin = (array = []) => `(${array.join(", ")})`;

const formatQuery = (data, removeId = false) => {
  const query = [];
  const values = [];
  const result = data;
  if (removeId) delete result.id;

  if (result) {
    Object.entries(result).forEach(([key, value]) => {
      query.push(`${key} = ?`);
      values.push(value);
    });
  }
  return { query, values };
};

const formatInsertQuery = (data) => {
  const query = [];
  const values = [];

  const intoValue = Object.entries(data).map(([key, value]) => {
    query.push(key.toString());
    values.push(value);
    return "?";
  });

  return {
    query: dataJoin(query),
    set: dataJoin(intoValue),
    values,
  };
};

const formatSorter = ({
  orderBy = [],
  isAsc = true,
  limit = null,
  offSet = null,
  join = null,
  table = "",
  type = "",
}) => {
  let sorter = orderBy.length
    ? `order by ${orderBy.join(",")} ${isAsc ? "" : "desc "}`
    : "";

  let joinner = "";

  if (join && table) {
    joinner = join
      .map((j) => {
        return `${type} join ${j} on ${table}.id_${
          j[j.length - 1] === "s" ? j.slice(0, -1) : j
        } = ${j}.id `;
      })
      .join("");
  }
  if (limit && limit > 0) sorter += ` limit ${limit}`;
  if (offSet && offSet > 0) sorter += ` offset ${offSet}`;
  return { joinner, sorter };
};

const formatSelector = (value, table) => {
  const join = value?.join;
  if (join) return [...join, table].map((j) => `${j}.*`);
  return value;
};

export default { formatQuery, formatInsertQuery, formatSorter, formatSelector };
