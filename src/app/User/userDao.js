// 모든 유저 조회
async function selectUser(connection) {
  const selectUserListQuery = `
                SELECT *
                FROM UserInfo;
                `;
  const [userRows] = await connection.query(selectUserListQuery);
  return userRows;
}

// 이메일로 회원 조회
async function selectUserEmail(connection, email) {
  const selectUserEmailQuery = `
                SELECT email 
                FROM UserInfo 
                WHERE email = ?;
                `;
  const [emailRows] = await connection.query(selectUserEmailQuery, email);
  return emailRows;
}

// userId 회원 조회
async function selectUserId(connection, userId) {
  const selectUserIdQuery = `
                 SELECT userId, email, nickname 
                 FROM UserInfo 
                 WHERE userId = ?;
                 `;
  const [userRow] = await connection.query(selectUserIdQuery, userId);
  return userRow;
}
//한줄 소개로 회원 조회-> 값 받아옴
async function selectUserIntroduce(connection, introduce) {
  const selectUserIntroduceQuery = `
                SELECT introduce , nickname 
                FROM UserInfo 
                WHERE introduce = ?;
                `;
  const [introduceRows] = await connection.query(selectUserIntroduceQuery, introduce);
  return introduceRows;
}
// 유저 생성
async function insertUserInfo(connection, insertUserInfoParams) {
  const insertUserInfoQuery = `
      INSERT INTO UserInfo(nickname, address, age, gender, breed, dogAge, introduce, profileImage,status,email,password)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;
  const insertUserInfoRow = await connection.query(
    insertUserInfoQuery,
    insertUserInfoParams
  );

  return insertUserInfoRow;
}

// 패스워드 체크
async function selectUserPassword(connection, selectUserPasswordParams) {
  const selectUserPasswordQuery = `
        SELECT email, nickname, password
        FROM UserInfo 
        WHERE email = ? AND password = ?;`;
  const selectUserPasswordRow = await connection.query(
      selectUserPasswordQuery,
      selectUserPasswordParams
  );

  return selectUserPasswordRow;
}

//여기서 jwt반환값 설정
// 유저 계정 상태 체크 (jwt 생성 위해 id 값도 가져온다.)
async function selectUserAccount(connection, email) {
  const selectUserAccountQuery = `
        SELECT status, userId,nickname
        FROM UserInfo 
        WHERE email = ?;`;
  const selectUserAccountRow = await connection.query(
      selectUserAccountQuery,
      email
  );
  return selectUserAccountRow[0];
}

async function updateUserInfo(connection, userId, nickname) {
  const updateUserQuery = `
  UPDATE UserInfo 
  SET nickname = ?
  WHERE userId = ?;`;
  const updateUserRow = await connection.query(updateUserQuery, [
    nickname,
    userId,
  ]);
  return updateUserRow[0];
}

////////////////////

// API 2. 유저
// 주소 수정
async function updateUserAdd(connection, userId, address) {
  const updateUserQuery = `
  UPDATE user 
  SET address = ?
  WHERE userId = ?;`;
  const updateUserRow = await connection.query(updateUserQuery, [
    address,
    userId,
  ]);
  return updateUserRow[0];
}

// 나이 수정
async function updateUserAge(connection, userId, age) {
  const updateUserQuery = `
  UPDATE user 
  SET age = ?
  WHERE userId = ?;`;
  const updateUserRow = await connection.query(updateUserQuery, [age, userId]);
  return updateUserRow[0];
}

// 성별 수정
async function updateUserGender(connection, userId, gender) {
  const updateUserQuery = `
  UPDATE user 
  SET gender = ?
  WHERE userId = ?;`;
  const updateUserRow = await connection.query(updateUserQuery, [
    gender,
    userId,
  ]);
  return updateUserRow[0];
}

// 견종 수정
async function updateUserBreed(connection, userId, breed) {
  const updateUserQuery = `
  UPDATE user 
  SET breed = ?
  WHERE userId = ?;`;
  const updateUserRow = await connection.query(updateUserQuery, [
    breed,
    userId,
  ]);
  return updateUserRow[0];
}

// 강아지 나이 수정
async function updateUserDogAge(connection, userId, dogAge) {
  const updateUserQuery = `
  UPDATE user 
  SET dogAge = ?
  WHERE userId = ?;`;
  const updateUserRow = await connection.query(updateUserQuery, [
    dogAge,
    userId,
  ]);
  return updateUserRow[0];
}

// API 3. 유저 프로필 조회
async function selectUserId(connection, userId) {
  const selectUserIdQuery = `
                 SELECT userId, email, nickname, address, age, gender, breed, dogAge, introduce, profileImage
                 FROM user 
                 WHERE userId = ?;
                 `;
  const [userRow] = await connection.query(selectUserIdQuery, userId);
  return userRow;
}

// API 5. 특정 유저의 모든 게시글 조회
async function selectUserPost(connection, userId) {
  const selectUserPostQuery = `
          SELECT * from posting where userId = ?;
          `;
  const [userPost] = await connection.query(selectUserPostQuery, userId);
  return userPost;
}

// API 6. 유저 삭제
async function deleteUserInfo(connection, userId) {
  const deleteUserInfoQuery = `delete from user where userId = ?;`;
  const deleteUserRow = await connection.query(deleteUserInfoQuery, userId);
  return deleteUserRow[0];
}

// API 7. 특정 유저의 스크랩한 글 모두 조회
async function selectUserScrap(connection, userId) {
  const selectUserScrapQuery = `
          SELECT * from scrap where userId = ?;
          `;
  const [userScrap] = await connection.query(selectUserScrapQuery, userId);
  return userScrap;
}

// API 8. 댓글 전체 조회
async function selectPostComment(connection, postId) {
  const selectPostCommentQuery = `
          SELECT * from comment where postId = ?;
          `;
  const [postComment] = await connection.query(selectPostCommentQuery, postId);
  return postComment;
}

// API 9. 댓글 생성
async function insertCommentInfo(connection, insertCommentInfoParams) {
  const insertCommentInfoQuery = `
        INSERT INTO comment(postId, userId, content)
        VALUES (?, ?, ?);`;
  const insertPostInfoRow = await connection.query(
    insertCommentInfoQuery,
    insertCommentInfoParams
  );

  return insertPostInfoRow;
}

// API 10. 댓글 좋아요 여부
async function selectCommentLikeInfo(connection, selectCommentLikeInfoParams) {
  const selectCommentLikeInfoQuery = `
          SELECT status from commentLike where postId = ? and commentId =? and userId = ?
          `;
  const selectCommentLikeInfoRow = await connection.query(
    selectCommentLikeInfoQuery,
    selectCommentLikeInfoParams
  );

  return selectCommentLikeInfoRow;
}

// API 10. 댓글 좋아요
async function insertCommentLikeInfo(connection, insertCommentLikeInfoParams) {
  const insertCommentLikeInfoQuery = `
        INSERT INTO commentLike(postId, commentId, userId)
        VALUES (?, ?, ?);`;
  const insertCommentLikeInfoRow = await connection.query(
    insertCommentLikeInfoQuery,
    insertCommentLikeInfoParams
  );

  return insertCommentLikeInfoRow;
}

// API 10. 좋아요 취소
async function deleteCommentLikeInfo(connection, deleteCommentLikeInfoParams) {
  const deleteCommentLikeInfoQuery = `
        delete from commentLike where postId = ? and commentId = ? and userId = ?;`;
  const deleteCommentLikeInfoRow = await connection.query(
    deleteCommentLikeInfoQuery,
    deleteCommentLikeInfoParams
  );

  return deleteCommentLikeInfoRow[0];
}

// API 11. 댓글 삭제 (PATCH)
async function deleteCommentInfo(connection, postId, commentId) {
  const deleteCommentInfoQuery = `delete from comment where postId = ? and commentId = ?;`;
  const deleteCommentRow = await connection.query(
    deleteCommentInfoQuery,
    postId,
    commentId
  );
  return deleteCommentRow[0];
}

// API 12. 대댓글 전체보기 (GET)
async function selectPostRecomment(connection, postId, commentId) {
  const selectPostRecommentQuery = `
          SELECT * from reply where postId = ? and commentId = ?;
          `;
  const [postRecomment] = await connection.query(
    selectPostRecommentQuery,
    postId,
    commentId
  );
  return postRecomment;
}

// API 13. 대댓글 작성 (POST)
async function insertRecommentInfo(connection, insertRecommentInfoParams) {
  const insertRecommentInfoQuery = `
        INSERT INTO reply(postId, commentId, userId, content)
        VALUES (?, ?, ?, ?);`;
  const insertRecommentInfoRow = await connection.query(
    insertRecommentInfoQuery,
    insertRecommentInfoParams
  );

  return insertRecommentInfoRow;
}

// API 15. 대댓글 삭제 (PATCH)
async function deleteRecommentInfo(connection, postId, commentId, replyId) {
  const deleteRecommentInfoQuery = `delete from reply where postId = ? and commentId = ? and replayId = ?;`;
  const deleteRecommentRow = await connection.query(
    deleteRecommentInfoQuery,
    postId,
    commentId,
    replyId
  );
  return deleteRecommentRow[0];
}

module.exports = {
  selectUser,
  selectUserEmail,
  selectUserId,
  selectUserPost,
  updateUserAdd,
  updateUserAge,
  updateUserGender,
  updateUserBreed,
  updateUserDogAge,
  deleteUserInfo,
  selectUserScrap,
  selectPostComment,
  insertCommentInfo,
  deleteCommentInfo,
  insertRecommentInfo,
  selectPostRecomment,
  insertCommentLikeInfo,
  deleteRecommentInfo,
  deleteCommentLikeInfo,
  selectCommentLikeInfo,

  selectUserIntroduce,
  insertUserInfo,
  selectUserPassword,
  selectUserAccount,
  updateUserInfo,
};
