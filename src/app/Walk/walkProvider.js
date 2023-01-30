const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const walkDao = require("./walkDao");

// Provider: Read 비즈니스 로직 처리
exports.retrieveWalkList = async function (regionId) {

        const connection = await pool.getConnection(async (conn) => conn);
        const walkListResult = await walkDao.selectWalk(connection,regionId);
        connection.release();
    
        return walkListResult;
  
  };

  exports.retrieveStartList = async function (walkId) {

    const connection = await pool.getConnection(async (conn) => conn);
    const walkStartResult = await walkDao.selectWalkStart(connection,walkId);
    connection.release();

    return walkStartResult;

};

    exports.retrieveEndList = async function (walkId) {

    const connection = await pool.getConnection(async (conn) => conn);
    const walkEndResult = await walkDao.selectWalkEnd(connection,walkId);
    connection.release();

    return walkEndResult;

};

    exports.retrieveCourseList = async function (walkId) {

    const connection = await pool.getConnection(async (conn) => conn);
    const walkCourseResult = await walkDao.selectWalkCoourse(connection,walkId);
    connection.release();

    return walkCourseResult;

};

  exports.retrieveReviewList = async function (walkId) {

      const connection = await pool.getConnection(async (conn) => conn);
      const reviewListResult = await walkDao.selectReview(connection, walkId);
      connection.release();

      return reviewListResult;
  };

  

  
  exports.retriveFeedbackList = async function (walkId) {

      const connection = await pool.getConnection(async (conn) => conn);
      const feedbackListResult = await walkDao.selectFeedback(connection,walkId);
      connection.release();

      return feedbackListResult;
  };

  exports.retrieveReviewCount = async function (walkId,reviewId) {

    const connection = await pool.getConnection(async (conn) => conn);
    const reviewCountResult = await walkDao.getReviewInterest(connection,walkId,reviewId);
    connection.release();

    return reviewCountResult;
};


exports.retriveFeedbackCount = async function (walkId,reviewId) {

    const connection = await pool.getConnection(async (conn) => conn);
    const feedbackCountResult = await walkDao.getFeedbackInterest(connection,walkId,reviewId);
    connection.release();

    return feedbackCountResult;
};