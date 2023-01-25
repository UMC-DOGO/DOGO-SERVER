const { pool } = require("../../../config/database");

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("socket 시작!");

    //from클라이언트 to서버
    socket.on("sendMessage", async (data) => {
      //DB랑연결부분
      // const connection = await pool.getConnection(async(conn)=>conn)
      // connection.query(`
      //     INSERT INTO message(,,) VALUES(?,?,?)
      // `,[data.room,data.name,data.msg])
      // connection.release();
      console.log("클라이언트에서보낸 메세지 : ", data);
      data.recpient;
      //방을 만들어서 설정 => 채팅방 ID는 어디서만들지

      //
      io.to(`${소켓아이디}`).emit();
    });
  });
};
