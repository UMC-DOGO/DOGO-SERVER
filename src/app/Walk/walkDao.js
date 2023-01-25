// 모든 산책코스 조회
async function selectWalk(connection, regionid) {
    const selectWalkListQuery = `
                  SELECT courseTitle,courseContent
                  FROM walk
                  WHERE regionID = ?;
                  `;
    const [walkRows] = await connection.query(selectWalkListQuery, regionid);
    return walkRows;
  }

// 후기 작성
async function insertReview(connection,insertReviewParams) {
  const insertReviewQuery = `
                  INSERT INTO walkReview(courseID,writerID,nickname,reviewContent)
                  VALUES (?, ?, ?, ?);
                `;
  const insertReviewRow = await connection.query(
    insertReviewQuery,
    insertReviewParams
  );

  return insertReviewRow;
}

// 피드백 작성
async function insertFeedback(connection,insertFeedbackParams) {
  const insertFeedbackQuery = `
            INSERT INTO walkFeedback(courseID,writerID,nickname,feedbackContent)
            VALUES (?, ?, ?, ?);  
                `;
  const insertFeedbackwRow = await connection.query(
    insertFeedbackQuery,
    insertFeedbackParams
  );

  return insertFeedbackwRow;
}

// 후기 공감

async function updateReview(connection,updateReviewParams){
  const updateReviewQuery = `
            UPDATE Review
            SET interestCount = interestCount + 1
            WHERE courseID = ? AND reviewid = ?;
            `;
  const updateReviewRow = await connection.query(updateReviewQuery,updateReviewParams);
  return updateReviewRow[0];
}

// 후기 조회
async function selectReview(connection) {
  const selectReviewListQuery = `
                SELECT nickname, reviewContent
                FROM Review
                WHERE walkid = ?;
                `;
  const [reviewRows] = await connection.query(selectReviewListQuery);
  return reviewRows;
}

// 피드백 조회
async function selectFeedback(connection) {
  const selectFeedbackListQuery = `
                SELECT nickname, FeedbackContent
                FROM walkFeedback
                WHERE courseID = ?;
                `;
  const [feedbackRows] = await connection.query(selectFeedbackListQuery);
  return feedbackRows;
}


// 후기 삭제
async function deleteReview(connection, deleteReviewParams) {
  const deleteReviewQuery = `
                DELTE FROM walkReview
                WHERE courseID = ? AND reviewID = ?;
                `;
  const deleteReviewRow = await connection.query(deleteReviewQuery,deleteReviewParams);
  return deleteReviewRow[0];
}


module.exports={
  selectWalk,
  insertReview,
  insertFeedback,
  updateReview,
  selectFeedback,
  selectReview,

}