// 모든 산책코스 조회
async function selectWalk(connection, regionId) {
  const selectWalkListQuery = `
                SELECT courseTitle,courseContent
                FROM walk
                WHERE regionID = ?;
                `;
  const [walkRows] = await connection.query(selectWalkListQuery, regionId);
  return walkRows;
}

// 산책코스 시작위치 조회 -- 수정하기~~
async function selectWalkStart(connection, walkId) {
  const selectWalkStartQuery = `
                SELECT courseLong, courseLat
                FROM walkStartEnd, walkCourse
                WHERE walkStartEnd.startID = walkCourse.placeID AND walkStartEnd.courseID = walkCourse.courseID AND courseID = ?;
                `;
  const [walkStartRows] = await connection.query(selectWalkStartQuery, walkId);
  return walkStartRows;
}

// 산책코스 도착위치 조회 -- 수정하기~~
async function selectWalkEnd(connection, walkId) {
  const selectWalkEndQuery = `
                SELECT courseLong, courseLat
                FROM walkCourse
                WHERE walkStartEnd.arriveID = walkCourse.placeID AND walkStartEnd.courseID = walkCourse.courseID AND courseID = ?;
                `;
  const [walkEndRows] = await connection.query(selectWalkEndQuery, walkId);
  return walkEndRows;
}

// 산책코스 경유지 조회 -- 수정하기~~
async function selectWalkCoourse(connection, walkId) {
  const selectWalkCourseQuery = `
                SELECT courseName 
                FROM walkCourse
                WHERE walkID = ?;
                `;
  const [walkCourseRows] = await connection.query(selectWalkCourseQuery, walkId);
  return walkCourseRows;
}


// 후기 작성
async function insertReview(connection,insertReviewParams) {
const insertReviewQuery = `
                INSERT INTO walkReview(courseID,writerID,reviewContent)
                VALUES (?, ?, ?);
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
          INSERT INTO walkFeedback(courseID,writerID,feedbackContent)
          VALUES (?, ?, ?);  
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
          UPDATE walkReview
          SET interestCount = interestCount + 1
          WHERE reviewID = ?;
          `;
const updateReviewRow = await connection.query(updateReviewQuery,updateReviewParams);
return updateReviewRow[0];
}


// 후기 공감 취소

async function updateMinusReview(connection,minusReviewParams){
const minusReviewQuery = `
          UPDATE walkReview
          SET interestCount = interestCount -1
          WHERE interestCount > 0 AND reviewID = ?;
          `;
const minusReviewRow = await connection.query(minusReviewQuery,minusReviewParams);
return minusReviewRow[0];
}

// 피드백 공감

async function updateFeedback(connection,updateFeedbackParams){
const updateFeedbackQuery = `
          UPDATE walkfeedback
          SET interestCount = interestCount + 1
          WHERE feedbackID = ?;
          `;
const updateFeedbackRow = await connection.query(updateFeedbackQuery,updateFeedbackParams);
return updateFeedbackRow[0];
}


// 피드백 공감 취소

async function minusFeeback(connection,minusFeedbackParams){
const minusFeedbackQuery = `
          UPDATE walkfeedback
          SET interestCount = interestCount - 1
          WHERE interestCount > 0 AND feedbackID = ?;
          `;
const minusFeedbackRow = await connection.query(minusFeedbackQuery,minusFeedbackParams);
return minusFeedbackRow[0];
}


// 후기 조회
async function selectReview(connection,walkId) {
const selectReviewListQuery = `
              SELECT UserInfo.nickname,reviewContent
              FROM walkReview,UserInfo
              WHERE UserInfo.userId = walkReview.writerID AND courseID = ?
              ORDER BY walkReview.createAt;
              `;
const [reviewRows] = await connection.query(selectReviewListQuery,walkId);
return reviewRows;
}

// 피드백 조회
async function selectFeedback(connection,walkId) {
const selectFeedbackListQuery = `
              SELECT UserInfo.nickname, feedbackContent
              FROM walkFeedback, UserInfo
              WHERE walkFeedback.writerID = UserInfo.userId AND courseID = ?
              ORDER BY walkFeedback.createAt;
              `;
const [feedbackRows] = await connection.query(selectFeedbackListQuery,walkId);
return feedbackRows;
}


// 후기 삭제
async function deleteReview(connection, deleteReviewParams) {
const deleteReviewQuery = `
              DELETE FROM walkReview
              WHERE reviewID = ?;
              `;
const deleteReviewRow = await connection.query(deleteReviewQuery,deleteReviewParams);
return deleteReviewRow[0];
}

// 피드백 삭제
async function deleteFeedback(connection, deleteFeedbackParams) {
const deleteFeedbackQuery = `
              DELETE FROM walkFeedback
              WHERE feedbackID = ?;
              `;
const deleteFeedbackRow = await connection.query(deleteFeedbackQuery,deleteFeedbackParams);
return deleteFeedbackRow[0];
}

// 후기 공감 개수 조회
async function getReviewInterest(connection,reviewId) {
const selectReviewInterestQuery = `
              SELECT interestCount
              FROM walkReview
              WHERE reviewID = ?;
              `;
const [reviewInterestRows] = await connection.query(selectReviewInterestQuery,reviewId);
return reviewInterestRows;
}

// 피드백 공감 개수 조회
async function getFeedbackInterest(connection,feedbackId) {
const selectFeedbackInterestQuery = `
              SELECT interestCount
              FROM walkFeedback
              WHERE feedbackID = ?;
              `;
const [feedbackInterestRows] = await connection.query(selectFeedbackInterestQuery,feedbackId);
return feedbackInterestRows;
}


// 피드백 신고
async function insertReport(connection,insertReportParams) {
  const insertReportQuery = `
                  INSERT INTO Report(userID,feedbackID,reportType)
                  VALUES (?, ?, ?);
                `;
  const insertReportRow = await connection.query(
    insertReportQuery,
    insertReportParams
  );
  
  return insertReportRow;
  }

module.exports={
selectWalk,
insertReview,
insertFeedback,
updateReview,
updateFeedback,
selectReview,
selectFeedback,
deleteReview,
deleteFeedback,
getReviewInterest,
getFeedbackInterest,
minusFeeback,
updateMinusReview,
insertReport
}
