const { logger } = require("../../../config/winston");
const { pool } = require("../../../config/database");

const chatDao = require("./chatDao.js");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");

exports.retrieveChat = async function (userId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const retrievechatResult = await chatDao.selectChat(connection, userId);
  connection.release();
  return retrievechatResult;
};
