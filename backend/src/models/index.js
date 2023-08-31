import { config } from "dotenv";
import mysql from "mysql2/promise";
import log from "../services/logger.js";
import FileSystem from "../utils/FileSystem.js";

const { loggingError } = log;
const { getIndexDirectory, loadModules } = FileSystem;

config();

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const pool = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

pool.getConnection().catch(() => {
  loggingError(
    "Warning:",
    " Failed to get a DB connection. Did you create a .env file with valid credentials? Routes using models won't work as intended"
  );
});

const directory = getIndexDirectory(import.meta.url);

const launchManagerConnection = ({ Manager, subDir }) => {
  if (Manager.setConnection) Manager.setConnection(pool);
  else loggingError("Cannot set connection with:", ` [${subDir}] directory`);
};

export default await loadModules(directory, launchManagerConnection);
