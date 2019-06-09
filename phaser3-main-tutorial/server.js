const express = require('express');

const app = express();

const server = app.listen(80, listen);

// This call back just tells us that the server has started
function listen() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Server listening at http://' + host + ':' + port);
  }

app.use(express.static('public'));