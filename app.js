var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.get('/', function(req, res) {
  res.sendfile('index.html');
});

app.get('/js/html2canvas.min.js', function(req, res) {
  res.sendfile('bower_components/html2canvas/build/html2canvas.min.js');
});

io.on('connection', function(socket) {
  console.log('user connected');

  socket.on('screenshot', function(screenshot) {
    socket.broadcast.emit('sync', screenshot);
  });

  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
});


http.listen(8989, function() {
  console.log('Listening on port 8989');
});

