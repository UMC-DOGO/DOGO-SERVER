const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const chatService = require("../Chat/chatService.js");

//유저별 채팅방조회
exports.getChats = async function (req, res) {
  console.log("채팅내역조회");
  const userId = req.params.userId;
  if (!userId) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));

  const getChatsResponse = await chatService.retrieveChat(userId);
  return res.send(response(baseResponse.SUCCESS), getChatsResponse);
};
