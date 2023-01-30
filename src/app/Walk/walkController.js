const jwtMiddleware = require("../../../config/jwtMiddleware");
const walkProvider = require("../../app/Walk/walkProvider");
const walkService = require("../../app/Walk/walkService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const {emit} = require("nodemon");

/**
 * API No. 1
 * API Name : 산책코스 조회 API 
 * [GET] /app/walks/:regionId
 * path variable: regionId
 */

exports.getWalk = async function (req, res) {


    const regionId = req.params.regionId;

    const walkListByRegionId = await walkProvider.retrieveWalkList(regionId);
    return res.send(response(baseResponse.SUCCESS, walkListByRegionId));

};

/**
 * API No. 
 * API Name : 산책코스 시작 위치조회 API 
 * [GET] /app/walks/walkstart:walkId
 * path variable: walkId
 */

exports.getWalkStart = async function (req, res){
    
    const walkId = req.params.walkId;

    const getStartByWalkId = await walkProvider.retrieveStartList(walkId);
    return res.send(response(baseResponse.SUCCESS, getStartByWalkId));
}


/**
 * API No. 
 * API Name : 산책코스 도착 위치 조회 API 
 * [GET] /app/walks/walkstart/:walkId
 * path variable: walkId
 */

exports.getWalkEnd = async function (req, res){
    
    const walkId = req.params.walkId;

    const getEndByWalkId = await walkProvider.retrieveEndList(walkId);
    return res.send(response(baseResponse.SUCCESS, getEndByWalkId));
}



/**
 * API No. 
 * API Name : 산책코스 경유지 조회 API 
 * [GET] /app/walks/walkcourse/:walkId
 * path variable: walkId
 */

exports.getWalkCourse = async function (req, res){
    
    const walkId = req.params.walkId;

    const getCourseByWalkId = await walkProvider.retrieveCourseList(walkId);
    return res.send(response(baseResponse.SUCCESS, getCourseByWalkId));
}




/**
 * API No. 2
 * API Name : 후기 작성 API
 * [POST] /app/walk/reviews
 * body: userId,nickname,walkId,reviewContent
 */
exports.postReview = async function (req, res) {

    /**
     * Body: walkId, userId, nickname, reviewContent
     */

     const {userId,walkId,nickname,reviewContent} = req.body;
     // 빈 값 체크 
     //if (!reviewContent)
       // return res.send(response(baseResponse)) // 따로추가하기
    
    const reviewResponse = await walkService.createReview(
        walkId,
        userId,
        nickname,
        reviewContent
    );

    return res.send(reviewResponse);
    
}

/**
 * API No. 3
 * API Name : 피드백 작성 API
 * [POST] /app/walks/walkId
 * path variable: walkId
 * body: userid,walkid,createAt,feedbackContent
 */
exports.postFeedback = async function (req, res) {

    /**
     * Body: walkId,userId,nickname,feedbackContent, createAt
     */

     const {walkId,userId,nickname,reviewContent,createAt} = req.body;
     // 빈 값 체크 
     if (!feedbackContent)
        return res.send(response(baseResponse)) // 따로추가!
    
    const feedbackResponse = await walkService.createFeedback(
        walkId,
        userId,
        nickname,
        reviewContent,
        createAt
    );

    return res.send(feedbackResponse);
    
}

/**
 * API No. 5
 * API Name : 후기 공감 API
 * [PATCH] /app/walks/:walkId/reviews/:reviewId
 * query parameter : walkId,reviewId
 */

exports.patchReviewPlus = async function (req,res){

    const reviewId = req.params.reviewId;

    const editReviewResult = await walkService.editReview(reviewId)
    return res.send(editReviewResult);
}

/**
 * API No. 6
 * API Name : 후기 조회 API 
 * [GET] /app/walk/reviews/{walkId}
 * path variable: walkId
 */

exports.getReview = async function (req,res) {

    const walkId = req.params.walkId;

    const reviewListByWalkId = await walkProvider.retrieveReviewList(walkId)
    return res.send(response(baseResponse.SUCCESS, reviewListByWalkId));
};


/**
 * API No. 7
 * API Name : 피드백 조회 API 
 * [GET] /app/walk/feedbacks/{walkId}
 * path variable: walkId
 */

exports.getFeedback = async function (req,res) {

    const walkId = req.params.walkId;

    const feedbackListByWalkId = await walkProvider.retriveFeedbackList(walkId)
    return res.send(response(baseResponse.SUCCESS, feedbackListByWalkId));
};

/**
 * API No. 8
 * API Name : 후기 삭제 API 
 * [DELETE] /app/:walkId/reviews/:reviewId
 * query parameter: walkId,reviewId
 */

exports.deleteReview = async function (req,res) {

    const reviewId = req.params.reviewId;

    const deleteReviewResult = await walkService.removeReview(reviewId)
    return res.send(deleteReviewResult);
};

/**
 * API No. 7
 * API Name : 후기 공감 취소 API
 * [PATCH] /app/walks/:walkId/reviews/minusreview?walkId=&reviewId=
 * query parameter : walkId,reviewId
 */

exports.patchReviewMinus = async function (req,res){

    const reviewId = req.params.walkId;

    const minusReviewResult = await walkService.minusReview(reviewId)
    return res.send(minusReviewResult);
}


/**
 * API No. 8
 * API Name : 피드백 공감 API
 * [PATCH] /app/walk/feedbacks/interestPlus?walkId=&reviewId=
 * query parameter : walkId,feedbackId
 */

exports.patchFeedbackPlus = async function (req,res){

    const feedbackId = req.params.feedbackId;

    const editFeedbackResult = await walkService.editFeedback(feedbackId)
    return res.send(editFeedbackResult);
}

/** 
 * API No. 9
 * API Name : 피드백 공감 취소 API
 * [PATCH] /app/walk/feedbacks/interestMinus?walkId=&reviewId=
 * query parameter : walkId,reviewId
 */

exports.patchFeedbackPlus = async function (req,res){


    const reviewId = req.params.reviewId;

    const minusFeedbackResult = await walkService.minusFeedback(feedbackId)
    return res.send(minusFeedbackResult);
}


/**
 * API No. 13
 * API Name : 피드백 삭제 API 
 * [DELETE] /app/:walkId/reviews/:reviewId
 * query parameter: walkId,feedbackId
 */

exports.deleteFeedback= async function (req,res) {

    const walkId = req.query.walkId;
    const reviewId = req.query.reviewId;

    const removeFeedback = await walkService.removeFeedback(walkId,feedbackId)
    return res.send(removeFeedback);
};


/**
 * API No. 14
 * API Name : 후기 공감 개수 조회 API 
 * [GET] /app/walk?walkId=&reviewId=
 * query parameter: walkId,reviewId
 */

exports.getReviewInterest = async function (req,res) {

    const walkId = req.query.walkId;
    const reviewId = req.query.reviewId;

    const reviewCountByWalkId = await walkProvider.retriveReviewCount(walkId,reviewId)
    return res.send(response(baseResponse.SUCCESS, reviewCountByWalkId));
};


/**
 * API No. 15
 * API Name : 피드백 공감 개수 조회 API 
 * [GET] /app/walk?walkId=&reviewId=
 * query parameter: walkId,reviewId
 */

exports.getFeedbackInterest = async function (req,res) {

    const walkId = req.query.walkId;
    const reviewId = req.query.reviewId;

    const feedbackCountByWalkId = await walkProvider.retriveFeedbackCount(walkId,reviewId)
    return res.send(response(baseResponse.SUCCESS, feedbackCountByWalkId));
};

/**
 * API No. 15
 * API Name : 피드백 신고 API
 * [POST] /app/walk/reviews
 * body: userId,nickname,walkId,reviewContent
 */
exports.postReport = async function (req, res) {

     const {userId,feedbackId,reportType} = req.body;

    const reportFeedbackResponse = await walkService.createReport(
        userId,
        feedbackId,
        reportType
    );

    return res.send(reportFeedbackResponse);
    
}