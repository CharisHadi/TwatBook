var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/chatting.html');
});

io.on('connection', function (socket) {
    console.log('a user connected');
    io.emit('chat message', 'user connected');

    socket.on('disconnect', function () {
        console.log('user disconnected');
        io.emit('chat message', 'user disconnected');
    });
    socket.on('chat message', function (msg) {
        
        io.emit('chat message', msg);
        console.log('msg: ' + msg);
    });
})

http.listen(3000, function () {
    console.log('listening on *:3000');
});

//in order to make this work like a text msg or DM type of app, we will need to:
    //  also log the messages in our DB and load them when connecting
    //  
