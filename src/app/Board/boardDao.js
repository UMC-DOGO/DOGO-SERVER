//카테고리추가해야함!!
//0.커뮤니티 게시글 작성
const insertBoard = async (connection, insertBoardParams) => {
  const insertBoardQuery = `
    INSERT INTO posting(userId,title,content,img)
    VALUES(?,?,?,?)`;

  const insertBoardRow = await connection.query(
    insertBoardQuery,
    insertBoardParams
  );

  return insertBoardRow;
};

//1.커뮤니티 게시글 전체 조회
const selectBoard = async (connection) => {
  //---join활용해서 유저사는 지역 첨부해야함
  const selectBoardQuery = `
      SELECT userId,title,content,img,createAt 
      From posting`;

  const [boardRows] = await connection.query(selectBoardQuery);

  return boardRows;
};

//2.커뮤니티 게시글 세부 조회
const selectBoardId = async (connection, boardId) => {
  //---join활용해서 유저사는 지역 첨부
  const selectBoardIdQuery = `
      SELECT userId,title,content,img,createAt 
      From posting
      WHERE postId=?`;

  const [boardRow] = await connection.query(selectBoardIdQuery, boardId);

  return boardRow;
};

//3.커뮤니티 게시글 삭제
const deleteBoard = async (connection, boardId) => {
  const deleteBoardQuery = `
      DELETE FROM posting
      WHERE postId=?
    `;

  const deleteBoardResult = await connection.query(deleteBoardQuery, boardId);
  return deleteBoardResult;
};

//4.커뮤니티 게시글 수정
const patchBoard = async (connection, boardId, title, content, img) => {
  const patchBoardQuery = `
      UPDATE posting
      SET title = ?,content=?,img=?
      WHERE postId=?
    `;

  const patchBoardResult = await connection.query(patchBoardQuery, [
    title,
    content,
    img,
    boardId,
  ]);
  return patchBoardResult[0];
};
//채팅창 리스트 조회
//각 채팅창 별 마지막 채팅 조회
//채팅 상대 프로필 조회

module.exports = {
  insertBoard,
  selectBoard,
  selectBoardId,
  deleteBoard,
  patchBoard,
};
