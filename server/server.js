"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//後で消す。CORSの許可
var cors = require('cors');
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var server = http_1.default.createServer();
//socket.io の準備　corsを許可
var io = new socket_io_1.Server(server, {
    cors: {
        origin: '*',
        // methods:['POST'],
        // allowHeaders: ['Authorization'],
        // credentials: true
    }
});
//コネクションの許可
io.on('connection', function (socket) {
    console.log('A user connected.');
    //メッセージのやり取り
    socket.on('message', function (msg) {
        console.log('Received message: ' + msg);
        io.emit('message', msg);
    });
});
// サーバーの起動
server.listen(3010, function () {
    console.log('Server is running on port 3010.');
});
