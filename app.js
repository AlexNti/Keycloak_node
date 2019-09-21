var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var Keycloak = require('keycloak-connect');
var session = require('express-session');



var app = express();
var memoryStore = new session.MemoryStore();


  
  var keycloak = new Keycloak({
      store: null
    });



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use(session({
//   secret: 'mySecret',
//   resave: false,
//   saveUninitialized: true,
//   store: memoryStore
// }));

app.use(keycloak.middleware({
    logout: '/logout',
    admin: '/',
    protected: '/protected/resource'
  }));

  // app.get('/',keycloak.protect(), function (req, res) {
  //   res.render('index', { title: 'Express' });
  // })
app.get('/users',keycloak.protect(), function(req, res, next) {
  res.send('respond with a resource');
});
// app.use('/', indexRouter);
// app.use('/users', usersRouter);

module.exports = app;
