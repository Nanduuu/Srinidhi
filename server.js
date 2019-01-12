const express = require('express');
var bodyParser = require('body-parser');
const mysql = require('mysql');
var multer = require('multer');
var http = require('http');
var upload = multer();
const app = express();
const router = express.Router();
const port = process.env.PORT || 8080;
const newuser = require('./newuser.js')
const login = require('./login.js')
const addclient = require('./addclient.js');

app.use(express.static('public'));

// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));

app.use('/newuser/',newuser);
app.use('/api/login/',login);
app.use('/api/addclient',addclient);

var server = http.createServer(app);

server.listen(port,function(){
	console.log(port);
});
