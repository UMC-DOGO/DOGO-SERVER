module.exports = function(app){
  const user = require('./userController');
  const jwtMiddleware = require('../../../config/jwtMiddleware');

  // 0. 테스트 API
  // app.get('/app/test', user.getTest)

  // 1. 유저 생성 (회원가입) API
  app.post('/app/users', user.postUsers);

  // 2. 유저 조회 API (+ 검색)
  app.get('/app/users',user.getUsers); 

  // 3. 특정 유저 조회 API
  app.get('/app/users/:userId', user.getUserById);

  // TODO: After 로그인 인증 방법 (JWT)
  // 로그인 하기 API (JWT 생성)
  app.post('/app/login', user.login);

  // 회원 정보 수정 API (JWT 검증 및 Validation - 메소드 체이닝 방식으로 jwtMiddleware 사용)
  app.patch("/app/users/:userId", jwtMiddleware, user.patchUsers);

  /////////////////////////

  // 1. 프로필 사진 편집 (PATCH)
  // /user/profileImg/{userId}

  // 2. 프로필 편집 (PATCH)
  app.patch("/user/profile/:userId", user.patchUser);

  // 3. 유저 프로필 조회 (GET)
  // 4. 내 프로필 조회 (GET)
  app.get("/user/profile/:userId", user.getUserById);

  // 5. 내가 쓴 글 조회 (GET)
  app.get('/user/board/:userId', user.getMyPost);

  // 6. 유저 삭제 (PATCH)
  app.patch("/user/delete/:userId", user.deleteUser);

  // 7. 스크랩 조회 (GET)
  app.get('/user/board/scrap/:userId', user.getMyScrap);

  // 8. 댓글 전체 조회 (GET)
  app.get('/comments/:postId', user.getComment);

  // 9. 댓글 작성 (POST)
  app.post('/comments/:postId', user.postComment);

  // 10. 댓글 좋아요 / 좋아요 취소 (POST)
  app.post('/comments/like/:postId/:commentId', user.postLikeComment);

  // 11. 댓글 삭제 (PATCH)
  app.patch("/comments/delete/:postId/:commentId", user.deleteComment);

  // 12. 대댓글 전체보기 (GET)
  app.get('/comments/re/:postId/:commentId', user.getRecomment);

  // 13. 대댓글 작성 (POST)
  app.post('/comments/re/:postId/:commentId', user.postRecomment);

  // 14. 대댓글 삭제 (PATCH)
  app.patch("/comments/delete/:postId/:commentId/:replyId", user.deleteRecomment);
};
