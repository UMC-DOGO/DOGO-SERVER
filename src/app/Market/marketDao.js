//0.중고시장 게시글 작성
const insertMarket = async (connection, insertMarketParams) => {
  const insertMarketQuery = `
  INSERT INTO marketPosting(userId,title,content,price,img)
  VALUES(?,?,?,?)`;

  const insertMarketRow = await connection.query(
    insertMarketQuery,
    insertMarketParams
  );

  return insertMarketRow;
};

//1.중고시장 게시글 전체 조회
const selectMarket = async (connection) => {
  //---join활용해서 유저사는 지역 첨부해야함
  const selectMarketQuery = `
    SELECT title,price,sale,img,createAt 
    From marketPosting`;

  const [marketRows] = await connection.query(selectMarketQuery);

  return marketRows;
};

//2.중고시장 게시글 세부 조회
const selectMarketId = async (connection, marketId) => {
  //---join활용해서 유저사는 지역 첨부
  const selectMarketIdQuery = `
    SELECT title,content,price,sale,img,createAt 
    From marketPosting
    WHERE marketId=?`;

  const [marketRow] = await connection.query(selectMarketIdQuery, marketId);

  return marketRow;
};

//3.중고시장 게시글 삭제
const deleteMarket = async (connection, marketId) => {
  const deleteMarketQuery = `
    DELETE FROM marketPosting
    WHERE marketId=?
  `;

  const deleteMarketResult = await connection.query(
    deleteMarketQuery,
    marketId
  );
  return deleteMarketResult;
};

//4.중고시장 게시글 수정
const patchMarket = async (
  connection,
  marketId,
  title,
  content,
  price,
  img,
  sale
) => {
  const patchMarketQuery = `
    UPDATE marketPosting
    SET title = ?,content=?,price=?,img=?,sale=?
    WHERE marketId=?
  `;

  const patchMarketResult = await connection.query(patchMarketQuery, [
    title,
    content,
    price,
    img,
    sale,
    marketId,
  ]);
  return patchMarketResult[0];
};
//채팅창 리스트 조회
//각 채팅창 별 마지막 채팅 조회
//채팅 상대 프로필 조회

module.exports = {
  insertMarket,
  selectMarket,
  selectMarketId,
  deleteMarket,
  patchMarket,
};
