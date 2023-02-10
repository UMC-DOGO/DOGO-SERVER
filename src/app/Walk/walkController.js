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
 * API No. 2
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
 * API No. 3
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
 * API No. 4
 * API Name : 후기 작성 API
 * [POST] /app/walk/reviews
 * body: walkId,userId,reviewContent
 */
exports.postReview = async function (req, res) {

 

     const {walkId,userId,reviewContent} = req.body;

     // 빈 값 체크 
    // if (!reviewContent)
     //  return res.send(response(baseResponse.WALK_REVIEWCONTENT_EMPTY))
    
    const reviewResponse = await walkService.createReview(
        walkId,
        userId,
        reviewContent
    );

    return res.send(reviewResponse);
    
}

/**
 * API No. 5
 * API Name : 피드백 작성 API
 * [POST] /app/walks/feedbacks
 * path variable: walkId
 * body: walkId,userId,feedbackContent
 */
exports.postFeedback = async function (req, res) {

    /**
     * Body: walkId,userId,feedbackContent
     */

     const {walkId,userId,feedbackContent} = req.body;
     // 빈 값 체크 
     //if (!feedbackContent)
       // return res.send(response(baseResponse.WALK_FEEDBACKONTENT_EMPTY)) 
    
    const feedbackResponse = await walkService.createFeedback(
        walkId,
        userId,
        feedbackContent
    );

    return res.send(feedbackResponse);
    
}

/**
 * API No. 6
 * API Name : 후기 공감 API
 * [PATCH] /app/walk/reviews/addedinterest/:reviewId
 * path variable: reviewId
 */

exports.patchReviewPlus = async function (req,res){

    const reviewId = req.params.reviewId;

    const editReviewResult = await walkService.editReview(reviewId)
    return res.send(editReviewResult);
}

/**
 * API No. 7
 * API Name : 후기 조회 API 
 * [GET] /app/walk/reviews/:walkId
 * path variable: walkId
 */

exports.getReview = async function (req,res) {

    const walkId = req.params.walkId;

    const reviewListByWalkId = await walkProvider.retrieveReviewList(walkId)
    return res.send(response(baseResponse.SUCCESS, reviewListByWalkId));
};


/**
 * API No. 8
 * API Name : 피드백 조회 API 
 * [GET] /app/walk/feedbacks/:walkId
 * path variable: walkId
 */

exports.getFeedback = async function (req,res) {

    const walkId = req.params.walkId;

    const feedbackListByWalkId = await walkProvider.retriveFeedbackList(walkId)
    return res.send(response(baseResponse.SUCCESS, feedbackListByWalkId));
};

/**
 * API No. 9
 * API Name : 후기 삭제 API 
 * [DELETE] /app/:walkId/reviews/:reviewId
 * path variable: reviewId
 */

exports.deleteReview = async function (req,res) {

    const reviewId = req.params.reviewId;

    const deleteReviewResult = await walkService.removeReview(reviewId)
    return res.send(deleteReviewResult);
};

/**
 * API No. 10
 * API Name : 후기 공감 취소 API
 * [PATCH] /app/walk/reviews/decreasedinterest/:reviewId
 * query parameter : reviewId
 */

exports.patchReviewMinus = async function (req,res){

    const reviewId = req.params.reviewId;

    const minusReviewResult = await walkService.minusReview(reviewId)
    return res.send(minusReviewResult);
}


/**
 * API No. 11
 * API Name : 피드백 공감 API
 * [PATCH] /app/walk/feedbacks/addedinterest/:feedbackId
 * path variable: feedbackId
 */

exports.patchFeedbackPlus = async function (req,res){

    const feedbackId = req.params.feedbackId;

    const editFeedbackResult = await walkService.editFeedback(feedbackId)
    return res.send(editFeedbackResult);
    
}

/** 
 * API No. 12
 * API Name : 피드백 공감 취소 API
 * [PATCH] /app/walk/feedbacks/decreasedinterest/:feedbackId
 * path variable: feedbackId
 */

exports.patchFeedbackPlus = async function (req,res){


    const feedbackId = req.params.feedbackId;

    const minusFeedbackResult = await walkService.minusFeedback(feedbackId)
    return res.send(minusFeedbackResult);
}


/**
 * API No. 13
 * API Name : 피드백 삭제 API 
 * [DELETE] /app/:walkId/feedbacks/:feedbackId
 * path variable: feedbackId
 */

exports.deleteFeedback = async function (req,res) {

    const feedbackId = req.params.feedbackId;
  
    const removeFeedbackResult = await walkService.removeFeedback(feedbackId)
    return res.send(removeFeedbackResult);
};


/**
 * API No. 14
 * API Name : 후기 공감 개수 조회 API 
 * [GET] /app/walk?walkId=&reviewId=
 * path variable: reviewId
 */

exports.getReviewInterest = async function (req,res) {

    const reviewId = req.params.reviewId;

    const reviewCountByWalkId = await walkProvider.retrieveReviewCount(reviewId)
    return res.send(response(baseResponse.SUCCESS, reviewCountByWalkId));
};


/**
 * API No. 15
 * API Name : 피드백 공감 개수 조회 API 
 * [GET] /app/walk/feedbacks/interests/:feedbackId
 * path variable: feedbackId
 */

exports.getFeedbackInterest = async function (req,res) {

    const feedbackId = req.params.feedbackId;

    const feedbackCountByWalkId = await walkProvider.retriveFeedbackCount(feedbackId)
    return res.send(response(baseResponse.SUCCESS,feedbackCountByWalkId));
};

/**
 * API No. 16
 * API Name : 피드백 신고 API
 * [POST] /app/walk/feedbacks/report
 * body: userId,feedbackId,reportType
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
