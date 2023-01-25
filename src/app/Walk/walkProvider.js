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

  exports.retrieveReviewList = async function (walkId) {

      const connection = await pool.getConnection(async (conn) => conn);
      const reviewListResult = await walkDao.selectReview(connection,walkId);
      connection.release();

      return reviewListResult;
  };

  
  exports.retriveFeedbackList = async function (walkId) {

      const connection = await pool.getConnection(async (conn) => conn);
      const feedbackListResult = await walkDao.selectFeedback(connection,walkId);
      connection.release();

      return feedbackListResult;
  };