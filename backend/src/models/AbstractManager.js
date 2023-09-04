import logger from "../services/logger.js";
import format from "../utils/formatQuery.js";

const { formatQuery, formatInsertQuery, formatSorter, formatSelector } = format;
const { loggingError } = logger;

export default class AbstractManager {
  constructor({ table, schema }) {
    this.table = table;
    this.schema = schema;
    this.validateSchema = this.validateSchema.bind(this);
    this.insert = this.insert.bind(this);
    this.find = this.find.bind(this);
    this.setConnection = this.setConnection.bind(this);
  }

  insert(body) {
    const { query, values, set } = formatInsertQuery(body);
    return this.connection.query(
      `insert into ${this.table}${query} values ${set};`,
      values
    );
  }

  async find({ selector = "", by = null, options = null }) {
    const finalSelector =
      selector || formatSelector(options, this.table) || "*";
    const { query, values } = formatQuery(by);
    const { sorter, joinner } = formatSorter({ ...options, table: this.table });

    const [count] = await this.connection.query(
      `select count(*) as total_count from ${this.table} ${
        query.length ? "where " : ""
      } ${query?.join(" and ")}`,
      [...values]
    );

    const [datas] = await this.connection.query(
      `select ${finalSelector} from ${this.table} ${joinner} ${
        query.length ? "where " : ""
      } ${query?.join(" and ")} ${sorter}`,
      [...values]
    );

    return { datas, infos: count[0] };
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
