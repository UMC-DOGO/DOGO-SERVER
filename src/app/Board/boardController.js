const boardService = require("../../app/Board/boardService");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");

// 0. 게시글 작성
//카테고리 추가해야함
exports.postBoards = async function (req, res) {
  const { title, content, img } = req.body;
  //제목 체크
  if (!title) return res.send(errResponse(baseResponse.BOARD_TITLE_EMPTY));
  //내용 체크
  if (!content) return res.send(errResponse(baseResponse.BOARD_CONTENT_EMPTY));
  //가격 체크

  const postBoardsResponse = await boardService.createBoard(
    title,
    content,
    img
  );
  return res.send(postBoardsResponse);
};

// 1. 게시글 조회
exports.getBoards = async function (req, res) {
  const boardListResult = await boardService.retrieveBoardList();
  return res.send(response(baseResponse.SUCCESS, boardListResult));
};

// 2. 게시글 세부 조회
exports.getBoard = async function (req, res) {
  const postId = req.params.boardId;
  if (!postId) return res.send(errResponse(baseResponse.BOARD_BOARDID_EMPTY));

  const boardResult = await boardService.retrieveBoard(postId);
  return res.send(response(baseResponse.SUCCESS, boardResult));
};

// 3. 게시글 삭제
exports.deleteBoard = async function (req, res) {
  const postId = req.params.boardId;
  const deleteBoard = await boardService.deleteBoard(postId);

  return res.send(deleteBoard);
};

// 4. 게시글 수정
exports.patchBoard = async function (req, res) {
  const postId = req.params.boardId;
  const { title, content, img } = req.body;
  //제목 체크
  if (!title) return res.send(errResponse(baseResponse.BOARD_TITLE_EMPTY));
  //내용 체크
  if (!content) return res.send(errResponse(baseResponse.BOARD_CONTENT_EMPTY));

  const editBoardInfo = await boardService.editBoard(
    postId,
    title,
    content,
    img
  );
  return res.send(editBoardInfo);
};
