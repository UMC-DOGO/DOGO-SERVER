const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const walkProvider = require("./walkProvider");
const walkDao = require("./walkDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");

// Service: Create, Update, Delete 비즈니스 로직 처리



// 후기 생성 
exports.createReview = async function (userId,walkId,reviewContent) {
    try {

        const insertReviewParams = [userId,walkId,reviewContent];

        const connection = await pool.getConnection(async (conn) => conn);

        const reviewPostResult = await walkDao.insertReview(connection, insertReviewParams);
        console.log(`추가된 리뷰 : ${reviewPostResult[0].insertid}`)
        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        console.log(err)
        // logger.error(`App - createReview Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

// 피드백 생성 
exports.createFeedback = async function (walkId,userId,feedbackContent) {
    try {

        const insertFeedbackParams = [walkId,userId,feedbackContent];

        const connection = await pool.getConnection(async (conn) => conn);

        const feedbackPostResult = await walkDao.insertFeedback(connection, insertFeedbackParams);
        console.log(`추가된 피드백 : ${feedbackPostResult[0].insertid}`)
        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        logger.error(`App - createFeedback Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

// 후기 공감
exports.editReview = async function (reviewId){
    try {

        const updateReviewParams = [reviewId];
        const connection = await pool.getConnection(async (conn)=>conn);
        const editReviewResult = await walkDao.updateReview(connection,updateReviewParams);

        return response(baseResponse.SUCCESS);
    } catch (err){
        logger.err(`App  - editReview Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

// 후기 공감 취소
exports.minusReview = async function (reviewId){
    try {

        const minusReviewParams = [reviewId];
        const connection = await pool.getConnection(async (conn)=>conn);
        const minusReviewResult = await walkDao.updateMinusReview(connection,minusReviewParams);

        return response(baseResponse.SUCCESS);
    } catch (err){
        logger.err(`App  - minusReview Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

// 후기 삭제
exports.removeReview = async function (reviewId){
    try {

        const deleteReviewParams = [reviewId];
        const connection = await pool.getConnection(async (conn)=>conn);
        const deleteReviewResult = await walkDao.deleteReview(connection,deleteReviewParams)
        //connection.release();
        return response(baseResponse.SUCCESS);
    } catch (err){
     //   console.log(err)
      // logger.err(`App  - deleteReview Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

// 피드백 삭제
exports.removeFeedback = async function (feedbackId){
  try {

      const deleteFeedbackParams = [feedbackId];
      const connection = await pool.getConnection(async (conn)=>conn);
      const removeFeedbackResult = await walkDao.deleteFeedback(connection,deleteFeedbackParams);
      //connection.release();
      return response(baseResponse.SUCCESS);
  } catch (err){
   //   console.log(err)
    // logger.err(`App  - deleteReview Service error\n: ${err.message}`);
      return errResponse(baseResponse.DB_ERROR);
  }
};

// 피드백 공감
exports.editFeedback = async function (feedbackId){
    try {

        const updateFeedbackParams = [feedbackId];
        const connection = await pool.getConnection(async (conn)=>conn);
        const editFeedbackResult = await walkDao.updateFeedback(connection,updateFeedbackParams);

        return response(baseResponse.SUCCESS);
    } catch (err){
        console.log(err);
      //  logger.err(`App  - editFeedback Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

// 피드백 공감 취소
exports.minusFeedback = async function (feedbackId){
    try {

        const minusFeedbackParams = [feedbackId];
        const connection = await pool.getConnection(async (conn)=>conn);
     //   const minusFeedbackResult = await walkDao.minusFeedback(connection,minusFeedbackParams);

        return response(baseResponse.SUCCESS);
    } catch (err){
        console.log(err);
  //     logger.err(`App  - minusFeedback Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

// 피드백 신고 
exports.createReport = async function (userId,feedbackId,reportType) {
    try {

        const insertReportParams = [userId,feedbackId,reportType];

        const connection = await pool.getConnection(async (conn) => conn);

        const reportPostResult = await walkDao.insertReport(connection, insertReportParams);
   //     console.log(`추가된 신고 : ${reportPostResult[0].reportId}`)
        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        logger.error(`App - createReport Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};
