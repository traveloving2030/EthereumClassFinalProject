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

// Router
var MainPage = require('./router/MainPage');
var StudentLogin = require('./router/StudentLogin');
var TutorLogin = require('./router/TutorLogin');
var Logout = require('./router/Logout');
// var FindStudent = require('./router/FindStudent');
var FindTutor = require('./router/FindTutor');

// var registerStudent = require('./router/registerStudent');
// var registerTutor = require('./router/registerTutor');
// var ShowStudent = require('./router/ShowStudent');
// var ShowTutor = require('./router/ShowTutor');



app.use('/', MainPage);
app.use('/MainPage', MainPage);
app.use('/StudentLogin', StudentLogin);
app.use('/StudentLoginProcess', StudentLogin);
app.use('/TutorLogin', TutorLogin);
app.use('/TutorLoginProcess', TutorLogin);
app.use('/Logout', Logout);
// app.use('/FindStudent', FindStudent);
app.use('/FindTutor', FindTutor);

// app.use('/registerStudent', registerStudent);
// app.use('/registerTutor', registerTutor);
// app.use('/ShowStudent', ShowStudent);
// app.use('/ShowTutor', ShowTutor);



// server start
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);



