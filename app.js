// Get dependencies
const path = require('path');
var express     = require('express');
var bodyParser  = require('body-parser');
var morgan      = require('morgan');

var app = express();
var server = require('http').Server(app);
port = process.env.PORT || 8080;

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// use morgan to log requests to the console
app.use(morgan('dev')); 

server.listen(port);
console.log('Magic happens at http://localhost:' + port);
