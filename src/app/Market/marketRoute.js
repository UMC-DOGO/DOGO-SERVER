module.exports = function (app) {
  const jwtMiddleware = require("../../../config/jwtMiddleware");
  const market = require("./marketController");

  // 0. 마켓 작성
  app.post("/market", jwtMiddleware, market.postMarkets);
  // 1. 마켓 조회
  app.get("/market", market.getMarkets);

  // 2. 마켓 세부 조회
  app.get("/market/:marketId", market.getMarket);
  // 3. 마켓 삭제
  app.delete("/market/:marketId", market.deleteMarket);
  // 4. 마켓 수정
  app.patch("/market/:marketId", market.patchMarket);
};
