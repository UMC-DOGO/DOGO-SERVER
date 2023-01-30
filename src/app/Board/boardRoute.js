module.exports = function (app) {
  const board = require("./boardController");

  // 0. 커뮤니티 작성
  app.post("/board", board.postBoards);
  // 1. 커뮤니티 조회
  app.get("/board", board.getBoards);

  // 2. 커뮤니티 세부 조회
  app.get("/board/:boardId", board.getBoard);
  // 3. 커뮤니티 삭제
  app.delete("/board/:boardId", board.deleteBoard);
  // 4. 커뮤니티 수정
  app.patch("/board/:boardId", board.patchBoard);
  //5. 게시물 신고
  app.patch("")
};
