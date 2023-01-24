const jwtMiddleware = require("../../../config/jwtMiddleware");
const walkProvider = require("../../app/Walk/walkProvider");
const walkService = require("../../app/Walk/walkService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const {emit} = require("nodemon");

/**
 * API No. 1
 * API Name : 산책코스 조회 API 
 * [GET] /app/:regionId/walks
 */

// 수정하기!!!!!
exports.getWalk = async function (req, res) {

    /*
        Query String: regionId 
    */

    const regionId = req.query.regionid;

    const walkListByRegionId = await walkProvider.retrieveWalkList(regionId);
    return res.send(response(baseResponse.SUCCESS, walkListByRegionId));

};

/**
 * API No. 2
 * API Name : 후기 작성 API
 * [POST] /app/walks/walkId
 */
exports.postReview = async function (req, res) {

    /**
     * Body: walkId, userId, nickname, reviewContent, createdAt
     */

     const {walkId,userId,nickname,reviewContent} = req.body;
     // 빈 값 체크 
     if (!reviewContent)
        return res.send(response(baseResponse)) // 따로추가하기
    
    const reviewResponse = await walkService.createReview(
        walkId,
        userId,
        nickname,
        reviewContent,
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

    const walkId = req.query.walkId;
    const reviewId = req.query.reviewId;

    const editReviewResult = await walkService.editReview(walkId,reviewId)
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

    const reviewListByWalkId = await walkProvider.retriveReviewList(walkId)
    return res.send(response(baseResponse.SUCCESS, reviewListByWalkId));
};


/**
 * API No. 7
 * API Name : 피드백 조회 API 
 * [GET] /app/walk/feedbacks/{walkId}
 * path variable: walkId
 */

exports.getFeedback = async function (req,res) {

    const walkId = req.query.walkId;

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

    const walkId = req.params.walkId;
    const reviewId = req.params.reviewId;

    const removeReview = await walkService.removeReview(walkId,reviewId)
    return res.send(removeReview);
};




