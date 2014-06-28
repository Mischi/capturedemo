var app   = require('express')(),
    http  = require('http').Server(app),
    io    = require('socket.io')(http);


app.get('/', function(req, res) {
  res.sendfile('index.html');
});

app.get('/js/html2canvas.min.js', function(req, res) {
  res.sendfile('bower_components/html2canvas/build/html2canvas.min.js');
});

io.on('connection', function(socket) {
  socket.on('screenshot', function(screenshot) {
    socket.broadcast.emit('sync', screenshot);
  });
});


http.listen(8989, function() {
  console.log('Listening on port 8989');
});

