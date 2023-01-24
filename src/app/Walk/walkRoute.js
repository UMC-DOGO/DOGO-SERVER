module.exports = function(app){
    const walk = require('./walkController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 1. 설정된 지역 산책코스 목록 조회
    app.get('/app/walk', walk.getWalk)

    // 2. 산책코스 시작 위치 조회

    // 3. 산책코스 도착 위치 조회

    // 추가 ( 산책코스 경유지 조회 )

    // 4. 후기 작성
    app.post('/app/walks/:walkId/reviews',walk.postReview)

    // 5. 피드백 작성
    app.post('/app/walks/:walkId',walk.postFeedback) 

    // 6. 후기 공감
    app.patch('/app/walk?walkId=&reviewId=',walk.patchReviewPlus)
    
    // 7. 후기 공감 취소
  //  app.patch('/app/walk?walkId=&reviewId=',walk.patchReviewMinus)

    // 8. 피드백 공감
    // app.patch('/app/walk?walkId=&reviewId=',walk.patchReviewPlus)
  
     //9. 피드백 공감 취소 
    // app.patch('/app/walk?walkId=&reviewId=',walk.patchReviewMinus)

    // 10. 후기 조회
    app.get('/app/walk/reviews/:walkId',walk.getReview)
    
    // 11. 피드백 조회
    app.get('/app/walk/feedback/:walkId', walk.getFeedback)

    // 12. 후기 삭제
    app.delete('/app/walk?walkId=&reviewId=',walk.deleteReview)

    // 13. 피드백 삭제
    // app.delete('/app/walk?walkId=&feedbackId=', walk.deleteFeedback)

    // 14. 후기 공감 개수 조회
    // app.get('/app/walk?walkId=&reviewId=',walk.getReviewInterest)


    // 15. 피드백 공감 개수 조회
    // app.get('/app/walk?walkId=&reviewId=',walk.getReviewInterest)


      // 15. 피드백 신고 
};