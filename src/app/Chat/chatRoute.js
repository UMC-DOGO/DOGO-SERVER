module.exports = function (app) {
  const chatController = require("./chatController.js");

  //채팅창 리스트 조회
  app.get("/chat/:userId", chatController.getChats);
};
