import http from 'http';
import { Server,Socket } from 'socket.io';

//後で消す。CORSの許可
const cors = require('cors');


const server:http.Server = http.createServer();

//socket.io の準備　corsを許可
const io = new Server(server, {
  cors: {
    origin:'*',
    // methods:['POST'],
    // allowHeaders: ['Authorization'],
    // credentials: true
  }
});

//コネクションの許可
io.on('connection', (socket:Socket) => {
  console.log('A user connected.');

  //メッセージのやり取り
  socket.on('message', (msg:string) => {
    console.log('Received message: ' + msg);
    io.emit('message', msg);
  });
});

// サーバーの起動
server.listen(3010, () => {
  console.log('Server is running on port 3010.');
});
