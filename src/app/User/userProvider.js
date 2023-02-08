const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const userDao = require("./userDao");

// Provider: Read 비즈니스 로직 처리

exports.retrieveUserList = async function (email) {
  if (!email) {
    const connection = await pool.getConnection(async (conn) => conn);
    const userListResult = await userDao.selectUser(connection);
    connection.release();

    return userListResult;

  } else {
    const connection = await pool.getConnection(async (conn) => conn);
    const userListResult = await userDao.selectUserEmail(connection, email);
    connection.release();

    return userListResult;
  }
};

exports.emailCheck = async function (email) {
  const connection = await pool.getConnection(async (conn) => conn);
  const emailCheckResult = await userDao.selectUserEmail(connection, email);
  connection.release();

  return emailCheckResult;
};

exports.passwordCheck = async function (selectUserPasswordParams) {
  const connection = await pool.getConnection(async (conn) => conn);
  const passwordCheckResult = await userDao.selectUserPassword(
      connection,
      selectUserPasswordParams
  );
  connection.release();
  return passwordCheckResult[0];
};

exports.accountCheck = async function (email) {
  const connection = await pool.getConnection(async (conn) => conn);
  const userAccountResult = await userDao.selectUserAccount(connection, email);
  connection.release();

  return userAccountResult;
};


/////////////////////

// API 3
// 유저 정보
exports.retrieveUser = async function (userId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const userResult = await userDao.selectUserId(connection, userId);

  connection.release();

  return userResult[0];
};

// API 5
// 내가 쓴 글
exports.retrieveUserPostList = async function (userId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const myPostListResult = await userDao.selectUserPost(connection, userId);
  connection.release();

  return myPostListResult;
};

// API 7
// 내가 스크랩한 글
exports.retrieveUserScrapList = async function (userId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const myScrapListResult = await userDao.selectUserScrap(connection, userId);
  connection.release();

  return myScrapListResult;
};

// API 8
// 댓글 전체 조회
exports.retrievePostCommList = async function (postId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const postCommentListResult = await userDao.selectPostComment(connection, postId);
  connection.release();

  return postCommentListResult;
};

// API 12
// 대댓글 전체보기
exports.retrievePostRecommList = async function (postId, commentId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const postRecommentListResult = await userDao.selectPostRecomment(connection, postId, commentId);
  connection.release();

  return postRecommentListResult;
};