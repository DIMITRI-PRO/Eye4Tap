const dataJoin = (array = []) => `(${array.join(", ")})`;

const formatQuery = (data) => {
  const query = [];
  const values = [];

  Object.entries(data).forEach(([key, value]) => {
    query.push(`${key} = ?`);
    values.push(value);
  });

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

const formatSorter = (sorter = [], asc = true) => {
  return sorter.length
    ? `order by ${sorter.join(",")} ${asc ? "" : "desc"}`
    : "";
};

export default { formatQuery, formatInsertQuery, formatSorter };
