const { pool } = require("../../../config/database");
const mysql = require("mysql");

const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  port: "3306",
  password: "1234",
  database: "market",
});

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("socket 시작!");

    //from클라이언트 to서버
    socket.on("sendMessage", (data) => {
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
      let rooms = [];
      socket.on("join_room", async (msg) => {
        let roomName = "Room_" + msg.roomName;
        if (!rooms.includes(roomName)) {
          roomName.push(roomName);
        } else {
          //이미 있는방입니다
        }
        socket.join(roomName);
        io.to(roomName).emit("noti_join_room", "방에입장하였습니다.");
      });
      io.to(`${소켓아이디}`).emit();
    });
  });
};
