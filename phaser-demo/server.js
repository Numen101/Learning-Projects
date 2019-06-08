const express = require('express');

const app = express();
const server = app.listen(80);

app.use(express.static('public'));

console.log("Server started");