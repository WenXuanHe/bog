var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cookie = require('cookie-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login/login');
var register = require('./routes/login/register');
var session = require('express-session');
var messages  = require('./lib/message.js');
var page  = require('./lib/page.js');
var user_menu  = require('./lib/user_menu.js');
var checkMiddle  = require('./lib/checkMiddle.js');
var catalogueRoute = require('./routes/blog/catalogueRoute.js');
var addBlog = require('./routes/blog/addBlogRoute.js');
var showContentDetail = require('./routes/blog/showContentDetail.js');
var baseFilePath = require('./lib/baseFilePath.js');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookie());
////session无法保存值问题:将secure改为false
///推荐选项是将sercure属性的值设为true（即secure: true）
///。然而，它需要网站是https-enabled,也就是说HTTPS这货对于secure cookies是必须的。
//// If secure is set, and you access your site over HTTP, the cookie will not be set.
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));
////自定义的中间件
app.use(messages);
app.use(user_menu);
  //保存根目录
app.use(baseFilePath.BASE_PATH_(__dirname));
////访问路径
app.use('/', routes);
app.use('/users', users);
app.use('/addBlog', addBlog);
app.use('/showContentDetail', showContentDetail);
app.use('/login', login);
app.use('/register', register);
app.use('/catalogue', catalogueRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//app.use(errorHandle);
//
//function errorHandle(err, req, res, next){
//    console.log(err.stack);
//    res.setHeader('Content-Type', 'application/json');
//    if(err.notFound){
//        res.notFound=404;
//        res.end(JSON.stringify({error:err.message}));
//    }else{
//        res.statusCode = 500;
//        res.end(JSON.stringify({error:"Internal Server Error"}));
//    }
//}

module.exports = app;
