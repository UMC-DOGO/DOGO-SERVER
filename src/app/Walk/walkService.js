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
exports.createReview = async function (userId,nickname,walkId,reviewContent, createdAt) {
    try {

        const insertReviewParams = [userId,walkIreviewContent,createdAt];

        const connection = await pool.getConnection(async (conn) => conn);

        const reviewPostResult = await walkDao.insertReview(connection, insertReviewParams);
        console.log(`추가된 리뷰 : ${reviewPostResult[0].insertid}`)
        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        logger.error(`App - createReview Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

// 피드백 생성 
exports.createFeedback = async function (userId, nickname,walkId, reviewContent, createAt) {
    try {

        const insertFeedbackParams = [userId,nickname,walkId,reviewContent,createAt];

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
exports.editReview = async function (walkId,reviewId,createAt){
    try {

        const updateReviewParams = [walkId,reviewId,createAt];
        const connection = await pool.getConnection(async (conn)=>conn);
        const editReviewResult = await walkDao.updateReview(connection,updateReviewParams);

        return response(baseResponse.SUCCESS);
    } catch (err){
        logger.err(`App  - editReview Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

// 후기 삭제
exports.removeReview = async function (walkId,reviewId){
    try {

        const deleteReviewParams = [walkId,reviewId];
        const connection = await pool.getConnection(async (conn)=>conn);
        const deleteReviewResult = await walkDao.deleteReview(connection,deleteReviewParams)
        connection.release();
        console.log('삭제된 후기:' ,deleteReviewResult[0].deleteid);
        return response(baseResponse.SUCCESS);
    } catch (err){
        logger.err(`App  - deleteReview Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};