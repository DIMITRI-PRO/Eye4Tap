import logger from "../services/logger.js";
import format from "../utils/formatQuery.js";

const { formatQuery, formatInsertQuery, formatSorter } = format;

const { loggingError } = logger;
class AbstractManager {
  constructor({ table, schema }) {
    this.table = table;
    this.schema = schema;
    this.validateSchema = this.validateSchema.bind(this);
    this.insert = this.insert.bind(this);
  }

  insert(body) {
    const { query, values, set } = formatInsertQuery(body);
    return this.connection.query(
      `insert into ${this.table}${query} values ${set};`,
      values
    );
  }

  find(findSet = "*", body = {}, sorterBy = { orderBy: [], isAsc: true }) {
    let data = body;
    let selector = findSet;
    let sorters = sorterBy;
    if (typeof findSet === "object") {
      data = findSet;
      selector = "*";
      sorters = body;
    }
    const { query, values } = formatQuery(data);
    const sorter = formatSorter(sorters.orderBy, sorters.isAsc);

    return this.connection.query(
      `select ${selector} from ${this.table} ${
        query.length ? "where " : ""
      } ${query?.join(" and ")} ${sorter}`,
      [...values]
    );
  }

  update(body) {
    const { query, values } = formatQuery(body);
    return this.connection.query(
      `update ${this.table} set ${query} where id = ?`,
      [...values, body.id]
    );
  }

  delete(id) {
    return this.connection.query(`delete from ${this.table} where id = ?`, [
      id,
    ]);
  }

  async validateSchema(req, res, next) {
    const { body } = req;
    try {
      const { error } = this.schema.validate(body, { abortEarly: false });
      if (error?.details)
        res.status(422).json({ validationErrors: error.details });
      else next();
    } catch (err) {
      loggingError("[ERROR] :", `error validate ${this.table}...`);
    }
  }

  setConnection(connection) {
    this.connection = connection;
  }
}

export default AbstractManager;
