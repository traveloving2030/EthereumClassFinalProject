// ExpressJS Setup
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const path = require('path');
var session       = require('express-session');
var cors          = require('cors');
// Constants
const PORT = 8800;
const HOST = '0.0.0.0';

// initialize session
app.use(session({
    secret: 'FinalDapp',
    resave: true,
    saveUninitialized: true
   }));
   app.use(cors())


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// use static file
app.use(express.static(path.join(__dirname, 'public')));
// configure app to use body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const apiRouter = require('./router/apiRouter')



app.use('/', apiRouter)

// server start
app.listen(PORT, HOST);
console.log(`Running on http://localhost:${PORT}`);



