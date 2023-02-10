const mysql = require("mysql2/promise");
const { logger } = require("./winston");

// TODO: 본인의 DB 계정 입력
const pool = mysql.createPool({
  host: "42.201.81.193",
  user: "dogo",
  port: "3306",
  password: "umc1234",
  database: "mydb",
});

module.exports = {
  pool: pool,
};
