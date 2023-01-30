const marketService = require("../../app/Market/marketService");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");

// 0. 마켓 작성
exports.postMarkets = async function (req, res) {
  const { title, content, price, img } = req.body;
  //제목 체크
  if (!title) return res.send(errResponse(baseResponse.MARKET_TITLE_EMPTY));
  //내용 체크
  if (!content) return res.send(errResponse(baseResponse.MARKET_CONTENT_EMPTY));
  //가격 체크
  if (!price) return res.send(errResponse(baseResponse.MARKET_PRICE_EMPTY));

  const postMarketsResponse = await marketService.createMarket(
    title,
    content,
    price,
    img
  );
  return res.send(postMarketsResponse);
};

// 1. 마켓 조회
exports.getMarkets = async function (req, res) {
  const marketListResult = await marketService.retrieveMarketList();
  return res.send(response(baseResponse.SUCCESS, marketListResult));
};

// 2. 마켓 세부 조회
exports.getMarket = async function (req, res) {
  const marketId = req.params.marketId;
  if (!marketId)
    return res.send(errResponse(baseResponse.MARKET_MARKETID_EMPTY));

  const marketResult = await marketService.retrieveMarket(marketId);
  return res.send(response(baseResponse.SUCCESS, marketResult));
};

// 3. 마켓 삭제
exports.deleteMarket = async function (req, res) {
  const marketId = req.params.marketId;
  const deleteMarket = await marketService.deleteMarket(marketId);

  return res.send(deleteMarket);
};

// 4. 마켓 수정
exports.patchMarket = async function (req, res) {
  // const title = req.params.title
  // const content = req.params.content
  // const price = req.params.price
  const marketId = req.params.marketId;
  const { title, content, price, img } = req.body;
  //제목 체크
  if (!title) return res.send(errResponse(baseResponse.MARKET_TITLE_EMPTY));
  //내용 체크
  if (!content) return res.send(errResponse(baseResponse.MARKET_CONTENT_EMPTY));
  //가격 체크
  if (!price) return res.send(errResponse(baseResponse.MARKET_PRICE_EMPTY));

  const editMarketInfo = await marketService.editMarket(
    marketId,
    title,
    content,
    price,
    img
  );
  return res.send(editMarketInfo);
};