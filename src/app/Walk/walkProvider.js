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

  //산책코스 시작위치 조회 

  exports.retrieveStartList = async function (walkId) {

    const connection = await pool.getConnection(async (conn) => conn);
    const walkStartResult = await walkDao.selectWalkStart(connection,walkId);
    connection.release();

    return walkStartResult;

};

//산책코스 도착위치 조회

    exports.retrieveEndList = async function (walkId) {

    const connection = await pool.getConnection(async (conn) => conn);
    const walkEndResult = await walkDao.selectWalkEnd(connection,walkId);
    connection.release();

    return walkEndResult;

};

// 산책코스 경유지 모두 조회 
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

  

  //피드백 리스트 조회
  exports.retriveFeedbackList = async function (walkId) {

      const connection = await pool.getConnection(async (conn) => conn);
      const feedbackListResult = await walkDao.selectFeedback(connection,walkId);
      connection.release();

      return feedbackListResult;
  };

  // 리뷰 공감 수 조회
  exports.retrieveReviewCount = async function (reviewId) {

    const connection = await pool.getConnection(async (conn) => conn);
    const reviewCountResult = await walkDao.getReviewInterest(connection,reviewId);
    connection.release();

    return reviewCountResult;
};


// 피드백 공감 개수 조회

exports.retriveFeedbackCount = async function (feedbackId) {

    const connection = await pool.getConnection(async (conn) => conn);
    const feedbackCountResult = await walkDao.getFeedbackInterest(connection,feedbackId);
    connection.release();

    return feedbackCountResult;
};
