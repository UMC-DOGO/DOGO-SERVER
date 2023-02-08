const { logger } = require("../../../config/winston");
const { pool } = require("../../../config/database");
const secret_config = require("../../../config/secret");

const marketDao = require("./marketDao");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");

// 0. 마켓 작성
exports.createMarket = async function (title, content, price, img) {
  try {
    const createMarketParams = [1, title, content, price, img];

    const connection = await pool.getConnection(async (conn) => conn);

    const createMarketResult = await marketDao.insertMarket(
      connection,
      createMarketParams
    );
    connection.release();
    return response(baseResponse.SUCCESS);
  } catch (err) {
    logger.error(`App - createUser Service error\n: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  }
};

// 1. 마켓 조회
//페이지네이션 여부 안드 or 서버
exports.retrieveMarketList = async function () {
  const connection = await pool.getConnection(async (conn) => conn);
  const marketListResult = await marketDao.selectMarket(connection);
  connection.release();
  return marketListResult;
};

// 2. 마켓 세부 조회
exports.retrieveMarket = async function (marketId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const marketResult = await marketDao.selectMarketId(connection, marketId);
  connection.release();
  return marketResult[0];
};

// 3. 마켓 삭제
exports.deleteMarket = async function (marketId) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    const deleteMarketResult = await marketDao.deleteMarket(
      connection,
      marketId
    );
    connection.release();

    return response(baseResponse.SUCCESS);
  } catch (err) {
    logger.error(`App - editUser Service error\n: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  }
};

// 4. 마켓 수정
exports.editMarket = async function (
  marketId,
  title,
  content,
  price,
  sale,
  img
) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    const editMarketResult = await marketDao.patchMarket(
      connection,
      marketId,
      title,
      content,
      price,
      sale,
      img
    );
    return response(baseResponse.SUCCESS);
  } catch (err) {
    logger.error(`App - editUser Service error\n: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  }
};
