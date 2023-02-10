module.exports = function(app){
  const walk = require('./walkController');
  const jwtMiddleware = require('../../../config/jwtMiddleware');

  // 1. 설정된 지역 산책코스 목록 조회 
  app.get('/app/walks/:regionId', walk.getWalk)

  // 2. 산책코스 시작 위치 조회 
  app.get('/app/walks/walkstart/:walkId', walk.getWalkStart)

  // 3. 산책코스 도착 위치 조회
  app.get('/app/walks/walkend/:walkId', walk.getWalkEnd)

  // 4. 추가 ( 산책코스 경유지 조회 )
  app.get('/app/walks/walkcourse/:walkId', walk.getWalkCourse)

  // 4. 후기 작성
  app.post('/app/walk/reviews',jwtMiddleware,walk.postReview)

  // 5. 피드백 작성
  app.post('/app/walks/feedbacks',jwtMiddleware,walk.postFeedback) 

  // 6. 후기 공감
  app.patch('/app/walk/reviews/addedinterest/:reviewId',walk.patchReviewPlus)
  
  // 7. 후기 공감 취소
  app.patch('/app/walk/reviews/decreasedinterest/:reviewId',walk.patchReviewMinus)

  // 8. 피드백 공감
  app.patch('/app/walk/feedbacks/addedinterest/:feedbackId',walk.patchFeedbackPlus)

   //9. 피드백 공감 취소 
  app.patch('/app/walk/feedbacks/decreasedinterest/:feedbackId',walk.patchReviewMinus)

  // 10. 후기 조회
  app.get('/app/walk/reviews/:walkId',walk.getReview)
  
  // 11. 피드백 조회
  app.get('/app/walk/feedbacks/:walkId', walk.getFeedback)

  // 12. 후기 삭제
  app.delete('/app/walk/reviews/:reviewId',walk.deleteReview)

  // 13. 피드백 삭제
  app.delete('/app/walk/feedbacks/:feedbackId', walk.deleteFeedback)

  // 14. 후기 공감 개수 조회
  app.get('/app/walk/reviews/interests/:reviewId',walk.getReviewInterest)

  // 15. 피드백 공감 개수 조회
  app.get('/app/walk/feedbacks/interests/:feedbackId',walk.getFeedbackInterest)

  // 16. 피드백 신고 
  app.post('/app/walk/feedbacks/report',walk.postReport)

};
