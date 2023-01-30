//유저별 채팅조회
const selectChat = async (connection, userId) => {
  const selectChatQuery = `
        SELECT content,chatRoomId
        From messages
        where senderId = ? 
        OR recieverId = ?
    `;
  const [chatRows] = await connection.query(selectChatQuery, [userId, userId]);
  return chatRows;
};
