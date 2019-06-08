// Keep track of our socket connection
var socket;

var myShip;

var ships = [];
var zoom = 1;

function setup() {
  var canvas = createCanvas(400, 400);
  canvas.parent('canvasContainer');
  // Start a socket connection to the server
  // Some day we would run this server somewhere else
  socket = io.connect('http://localhost:3000');


  myShip = new Ship(socket.id, random(width), random(height), 8);
  // Make a little object with  and y
  var data = {
    x: myShip.pos.x,
    y: myShip.pos.y
  };
  socket.emit('start', data);

  socket.on('heartbeat',
    function (data) {
      ships = data;
    }
  );
}

function draw() {
  background(0);

  translate(width / 2, height / 2);
  var newzoom = 64 / myShip.r;
  zoom = lerp(zoom, newzoom, 0.1);
  scale(zoom);
  translate(-myShip.pos.x, -myShip.pos.y);

  for (var i = ships.length - 1; i >= 0; i--) {
    var id = ships[i].id;
    if (id !== socket.id) {
      fill(0, 0, 255);
      ellipse(ships[i].x, ships[i].y, ships[i].r * 2, ships[i].r * 2);

      fill(255);
      textAlign(CENTER);
      textSize(4);
      text(ships[i].id, ships[i].x, ships[i].y);
    }
    //if (blob.eats(ships[i])) {
    //  ships.splice(i, 1);
    //}
  }


  fill(255);
  textAlign(CENTER);
  textSize(4);
  text(myShip.id, myShip.pos.x, myShip.pos.y);
  myShip.show();
  myShip.update();
  myShip.constrain();

  var data = {
    x: myShip.pos.x,
    y: myShip.pos.y
  };
  socket.emit('update', data);
}