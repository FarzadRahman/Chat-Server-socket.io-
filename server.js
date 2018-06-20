var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(3000);


function handler (req, res) {
    fs.readFile(__dirname + '/index.html',
        function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading index.html');
            }

            res.writeHead(200);
            res.end(data);
        });
}

var numUsers = 0;
io.on('connection', function(socket){
    var addedUser = false;
    socket.on('chat message', function(msg){
        socket.broadcast.emit('customEmit', {
            from: msg.username,
            message: msg.message,
            username:"bot"
        });
        console.log('message: ' + msg.message);
        console.log('User: ' + socket.id);
    });
});
io.on('connect', (socket) => {
    numUsers++;
    console.log("Client Connected");
    // console.log(socket.id);
    // console.log("Total Users: "+numUsers);

});
io.on('disconnect', (socket) => {
    numUsers--;
    // console.log("Client Connected");
    // console.log(socket.id);
    console.log("Total Users: "+numUsers);

});


