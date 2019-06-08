var ships = [];

function Ship_Data(id, x, y) {
  this.id = id;
  this.x = x;
  this.y = y;
}

// Using express: http://expressjs.com/
var express = require('express');
// Create the app
var app = express();

// Set up the server
// process.env.PORT is related to deploying on heroku
var server = app.listen(process.env.PORT || 3000, listen);

// This call back just tells us that the server has started
function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://' + host + ':' + port);
}

app.use(express.static('public'));


// WebSocket Portion
// WebSockets work with the HTTP server
var io = require('socket.io')(server);

setInterval(heartbeat, 33);

function heartbeat() {
  io.sockets.emit('heartbeat', ships);
}



// Register a callback function to run when we have an individual connection
// This is run for each individual user that connects
io.sockets.on('connection',
  // We are given a websocket object in our function
  function (socket) {

    console.log("We have a new client: " + socket.id);


    socket.on('start',
      function (data) {
        console.log(socket.id + " " + data.x + " " + data.y);
        var ship = new Ship_Data(socket.id, data.x, data.y);
        ships.push(ship);
      }
    );

    socket.on('update',
      function (data) {
        var ship;
        for (var i = 0; i < ships.length; i++) {
          if (socket.id === ships[i].id) {
            ship = ships[i];
			      break;
          }
        }
        ship.x = data.x;
        ship.y = data.y;
      }
    );



    socket.on('disconnect', function () {
      console.log("Client has disconnected");
    });
  }
);