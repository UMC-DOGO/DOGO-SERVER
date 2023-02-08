const jwtMiddleware = require("../../../config/jwtMiddleware");
const userProvider = require("../../app/User/userProvider");
const userService = require("../../app/User/userService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");
const {emit} = require("nodemon");

/**
 * API No. 0
 * API Name : 테스트 API
 * [GET] /app/test
 */
// exports.getTest = async function (req, res) {
//     return res.send(response(baseResponse.SUCCESS))
// }

/**
 * API No. 1
 * API Name : 유저 생성 (회원가입) API
 * [POST] /app/users
 */
exports.postUsers = async function (req, res) {

    /**
     * Body: email, password, nickname
     */
    const {nickname, address, age, gender, breed, dogAge, introduce, profileImage,status, email, password} = req.body;

    // 빈 값 체크
    if (!email)
        return res.send(response(baseResponse.SIGNUP_EMAIL_EMPTY));
    if (!introduce) return res.send(response(baseResponse.SIGNUP_EMAIL_EMPTY));
    if (!nickname) return res.send(response(baseResponse.SIGNUP_EMAIL_EMPTY));

    // 길이 체크
    if (email.length > 30)
        return res.send(response(baseResponse.SIGNUP_EMAIL_LENGTH));
    if (introduce.length > 20)
    return res.send(response(baseResponse.SIGNUP_INTRODUCE_LENGTH));

    if (nickname.length > 7)
    return res.send(response(baseResponse.SIGNUP_NICKNAME_LENGTH));
    if(password.length <6 ) {
    return res.send(response(baseResponse.SIGNUP_PASSWORD_LENGTH));
    }    
    // 형식 체크 (by 정규표현식)
    if (!regexEmail.test(email))
        return res.send(response(baseResponse.SIGNUP_EMAIL_ERROR_TYPE));

    // 기타 등등 - 추가하기


    const signUpResponse = await userService.createUser(
        nickname,address, age, gender, breed, dogAge, introduce, profileImage,status, email,password
      );
    return res.send(signUpResponse);
};

/**
 * API No. 2
 * API Name : 유저 조회 API (+ 이메일로 검색 조회)
 * [GET] /app/users
 */
exports.getUsers = async function (req, res) {

    /**
     * Query String: email
     */
    const email = req.query.email;

    if (!email) {
        // 유저 전체 조회
        const userListResult = await userProvider.retrieveUserList();
        return res.send(response(baseResponse.SUCCESS, userListResult));
    } else {
        // 유저 검색 조회
        const userListByEmail = await userProvider.retrieveUserList(email);
        return res.send(response(baseResponse.SUCCESS, userListByEmail));
    }
};

/**
 * API No. 3
 * API Name : 특정 유저 조회 API
 * [GET] /app/users/{userId}
 */
exports.getUserById = async function (req, res) {
  /**
   * Path Variable: userId
   */
  const userId = req.params.userId;

  if (!userId) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));

  const userByUserId = await userProvider.retrieveUser(userId);
  return res.send(response(baseResponse.SUCCESS, userByUserId));
};

// TODO: After 로그인 인증 방법 (JWT)
/**
 * API No. 4
 * API Name : 로그인 API
 * [POST] /app/login
 * body : email, passsword
 */
exports.login = async function (req, res) {

    const {email, password} = req.body;

    // TODO: email, password 형식적 Validation

    const signInResponse = await userService.postSignIn(email, password);

    return res.send(signInResponse);
};


/**
 * API No. 5
 * API Name : 회원 정보 수정 API + JWT + Validation
 * [PATCH] /app/users/:userId
 * path variable : userId
 * body : nickname
 */
exports.patchUsers = async function (req, res) {

    // jwt - userId 가 path variable :userId와 일치하는지

    const userIdFromJWT = req.verifiedToken.userId

    const userId = req.params.userId;
    const nickname = req.body.nickname;

    if (userIdFromJWT != userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        if (!nickname) return res.send(errResponse(baseResponse.USER_NICKNAME_EMPTY));

        const editUserInfo = await userService.editUser(userId, nickname)
        return res.send(editUserInfo);
    }
};











/** JWT 토큰 검증 API
 * [GET] /app/auto-login
 */
exports.check = async function (req, res) {
    const userIdResult = req.verifiedToken.userId;
    console.log(userIdResult);
    return res.send(response(baseResponse.TOKEN_VERIFICATION_SUCCESS));
};

///////////
/**
 * API Name : 2. 프로필 수정 (PATCH)
 * [PATCH] /user/profile/:userId
 * path variable : userId
 * body : address / age / gender / breed / dogAge
 */
exports.patchUser = async function (req, res) {
  const userId = req.params.userId;
  const address = req.body.address;
  const age = req.body.age;
  const gender = req.body.gender;
  const breed = req.body.breed;
  const dogAge = req.body.dogAge;

  if (address){
    const editUserAdd = await userService.editUserAddress(userId, address);
    return res.send(editUserAdd);
  }
  if (age){
    const editUserAge = await userService.editUserAge(userId, age);
    return res.send(editUserAge);
  }
  if (gender){
    const editUserGend = await userService.editUserGender(userId, gender);
    return res.send(editUserGend);
  }
  if (breed){
    const editUserBree = await userService.editUserBreed(userId, breed);
    return res.send(editUserBree);
  }
  if (dogAge){
    const editUserDog = await userService.editUserDogAge(userId, dogAge);
    return res.send(editUserDog);
  }
};

/**
 * API Name : 3. 유저 프로필 조회 (GET) / 4. 내 프로필 조회 (GET)
 * [GET] /user/profile/:userId
 */
exports.getUserById = async function (req, res) {
  /**
   * Path Variable: userId
   */
  const userId = req.params.userId;
  if (!userId) return res.send(errResponse(baseResponse.USER_USERID_NOT_EXIST));

  const userByUserId = await userProvider.retrieveUser(userId);
  return res.send(response(baseResponse.SUCCESS, userByUserId));
};

/**
* API Name : 5. 내가 쓴 글 조회 (GET)
* [GET] /user/board/{userId}
* * path variable : userId
*/
exports.getMyPost = async function (req, res) {
   const userId = req.params.userId;
   if (!userId) res.send(errResponse(baseResponse.USER_POSTING_NOT_EXIST));

   const MyPostList = await userProvider.retrieveUserPostList(userId);
   return res.send(response(baseResponse.SUCCESS, MyPostList));
};

/**
 * API Name : 6. 유저 삭제 (PATCH)
 * [DELETE] /user/delete/:userId
 * * path variable : userId
 */
exports.deleteUser = async function (req, res) {
  const userId = req.params.userId;
  if (!userId) res.send(errResponse(baseResponse.USER_USERID_NOT_EXIST));

  const deleteUserInfo = await userService.deleteUser(userId)
  return res.send(response(baseResponse.SUCCESS, deleteUserInfo));
};

/**
* API Name : 7. 내가 스크랩한 글 조회 (GET)
* [GET] /user/board/scrap/:userId
* * path variable : userId
*/
exports.getMyScrap = async function (req, res) {
  const userId = req.params.userId;
  if (!userId) res.send(errResponse(baseResponse.USER_USERID_NOT_EXIST));

  const MyScrapList = await userProvider.retrieveUserScrapList(userId);
  return res.send(response(baseResponse.SUCCESS, MyScrapList));
};

/**
* API Name : 8. 댓글 전체 조회 (GET)
* [GET] /comments/:postId
* * path variable : postId
*/
exports.getComment = async function (req, res) {
  const postId = req.params.postId;
  if (!postId) res.send(errResponse(baseResponse.USER_POSTING_NOT_EXIST));

  const PostCommentList = await userProvider.retrievePostCommList(postId);
  return res.send(response(baseResponse.SUCCESS, PostCommentList));
};

/**
 * API Name : 9. 댓글 작성 (POST)
 * [POST] /comments
 */
exports.postComment = async function (req, res) {

  /**
   * Body: content
   */
  const postId = req.params.postId;
  const content = req.body.content;
  const userId = req.body.userId;

  if (!postId) res.send(errResponse(baseResponse.USER_POSTING_NOT_EXIST));
  if (!content) res.send(response(baseResponse.SIGNUP_CONTENT_EMPTY));
  if (!userId) res.send(response(baseResponse.USER_USERID_NOT_EXIST));

  // 길이 체크
  if (content.length > 100)
      return res.send(response(baseResponse.SIGNUP_CONTENT_LENGTH));

  const signUpResponse = await userService.createComment(
      postId,
      userId,
      content
  );

  return res.send(signUpResponse);
};

/**
 * API Name : 10. 댓글 좋아요 / 좋아요 취소 (POST)
 * [POST] /comments/like/:postId/:commentId
 */
exports.postLikeComment = async function (req, res) {

  /**
   * Body: userId
   */
  const postId = req.params.postId;
  const commentId = req.params.commentId;
  const userId = req.body.userId;

  if (!postId) res.send(errResponse(baseResponse.USER_POSTING_NOT_EXIST));
  if (!commentId) res.send(response(baseResponse.USER_COMMENT_NOT_EXIST));
  if (!userId) res.send(response(baseResponse.USER_USERID_NOT_EXIST));

  const signUpResponse = await userService.createCommentLike(
      postId,
      commentId,
      userId
  );

  return res.send(signUpResponse);
};

/**
 * API Name : 11. 댓글 삭제 (PATCH)
 * [DELETE] /comments/delete/:postId/:commentId
 * * path variable : postId, commentId
 */
exports.deleteComment = async function (req, res) {
  const postId = req.params.postId;
  const commentId = req.params.commentId;
  if (!postId) res.send(errResponse(baseResponse.USER_POSTING_NOT_EXIST));
  if (!commentId) res.send(errResponse(baseResponse.USER_COMMENT_NOT_EXIST));

  const deleteCommentInfo = await userService.deleteComment(postId, commentId);
  return res.send(response(baseResponse.SUCCESS, deleteCommentInfo));
};

/**
* API Name : 12. 대댓글 전체보기 (GET)
* [GET] /comments/re/:postId/:commentId
* * path variable : postId, commentId
*/
exports.getRecomment = async function (req, res) {
  const postId = req.params.postId;
  const commentId = req.params.commentId;
  if (!postId) res.send(errResponse(baseResponse.USER_POSTING_NOT_EXIST));
  if (!commentId) res.send(errResponse(baseResponse.USER_COMMENT_NOT_EXIST));

  const PostReommentList = await userProvider.retrievePostRecommList(postId, commentId);
  return res.send(response(baseResponse.SUCCESS, PostReommentList));
};

/**
 * API Name : 13. 대댓글 작성 (POST)
 * [POST] /comments/re/:postId/:commentId
 */
exports.postRecomment = async function (req, res) {

  /**
   * Body: content
   */
  const postId = req.params.postId;
  const commentId = req.params.commentId;
  const userId = req.body.userId;
  const content = req.body.content;

  if (!postId) res.send(errResponse(baseResponse.USER_POSTING_NOT_EXIST));
  if (!commentId) res.send(response(baseResponse.USER_COMMENT_NOT_EXIST));
  if (!userId) res.send(response(baseResponse.USER_USERID_NOT_EXIST));
  if (!content) res.send(response(baseResponse.SIGNUP_CONTENT_EMPTY));

  // 길이 체크
  if (content.length > 100)
      return res.send(response(baseResponse.SIGNUP_CONTENT_LENGTH));

  const signUpResponse = await userService.createRecomment(
      postId,
      commentId,
      userId,
      content
  );

  return res.send(signUpResponse);
};

/**
 * API Name : 15. 대댓글 삭제 (PATCH)
 * [DELETE] /comments/delete/:postId/:commentId/:replyId
 * * path variable : postId, commentId, replyId
 */
exports.deleteRecomment = async function (req, res) {
  const postId = req.params.postId;
  const commentId = req.params.commentId;
  const replyId = req.params.replyId;
  if (!postId) res.send(errResponse(baseResponse.USER_POSTING_NOT_EXIST));
  if (!commentId) res.send(errResponse(baseResponse.USER_COMMENT_NOT_EXIST));
  if (!replyId) res.send(errResponse(baseResponse.USER_RECOMMENT_NOT_EXIST));

  const deleteRecommentInfo = await userService.deleteRecomment(postId, commentId, replyId);
  return res.send(response(baseResponse.SUCCESS, deleteRecommentInfo));
};
