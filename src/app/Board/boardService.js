const { logger } = require("../../../config/winston");
const { pool } = require("../../../config/database");
const secret_config = require("../../../config/secret");

const boardDao = require("./boardDao");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");

//나중에-카테고리 여러개면 배열로전달이올텐데 db에 복수저장이가능한가
//사는지역 추가
// 0. 게시글 작성
exports.createBoard = async function (userId, nickname, title, content, img) {
  try {
    const createBoardParams = [userId, nickname, title, content, img];

    const connection = await pool.getConnection(async (conn) => conn);

    const createBoardResult = await boardDao.insertBoard(
      connection,
      createBoardParams
    );
    connection.release();
    return response(baseResponse.SUCCESS);
  } catch (err) {
    logger.error(`App - createUser Service error\n: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  }
};

// 1. 게시글 조회
//페이지네이션 여부 안드 or 서버
exports.retrieveBoardList = async function () {
  const connection = await pool.getConnection(async (conn) => conn);
  const boardListResult = await boardDao.selectBoard(connection);
  connection.release();
  return boardListResult;
};

// 2. 게시글 세부 조회
exports.retrieveBoard = async function (boardId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const boardResult = await boardDao.selectBoardId(connection, boardId);
  connection.release();
  return boardResult[0];
};

// 3. 게시글 삭제
exports.deleteBoard = async function (boardId) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    const deleteBoardResult = await boardDao.deleteBoard(connection, boardId);
    connection.release();

    return response(baseResponse.SUCCESS);
  } catch (err) {
    logger.error(`App - editUser Service error\n: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  }
};

// 4. 게시글 수정
exports.editBoard = async function (boardId, title, content, img) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    const editBoardResult = await boardDao.patchBoard(
      connection,
      boardId,
      title,
      content,
      img
    );
    return response(baseResponse.SUCCESS);
  } catch (err) {
    logger.error(`App - editUser Service error\n: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  }
};
