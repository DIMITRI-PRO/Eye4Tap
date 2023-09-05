import dotenv from "dotenv";
import fs from "fs";
import mysql from "mysql2/promise";
import { Command } from "commander";

const { config } = dotenv;

config();

const program = new Command();

program
  .option("-c, --clear", "Clear the database and create a new one")
  .parse(process.argv);

const options = program.opts();

const migrate = async () => {
  const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

  const connection = await mysql.createConnection({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    multipleStatements: true,
  });

  if (options.clear) {
    await connection.query(`drop database if exists ${DB_NAME}`);
    await connection.query(`create database ${DB_NAME}`);
    console.warn(`Database [${DB_NAME}] cleared.`);
  }

  const [rows] = await connection.query(`show databases like '${DB_NAME}'`);
  const databaseExists = rows.length > 0;

  if (!databaseExists) {
    await connection.query(`create database ${DB_NAME}`);
    console.warn(`Database [${DB_NAME}] created.`);
  }

  await connection.query(`use ${DB_NAME}`);

  const sql = fs.readFileSync("./database.sql", "utf8");

  await connection.query(sql);

  console.warn(`End migration for : ${DB_NAME} database`);

  connection.end();
};

try {
  migrate();
} catch (err) {
  console.error(err);
}
