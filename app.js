require('dotenv').config()
var express = require('express');
var app = express();
var bodyParser = require('body-parser')

var port = process.env.PORT || 3000;

var logger = require('morgan');
app.use(logger('dev'));

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static('static'));

loadRoutes()

function loadRoutes() {
    // const path = `/users`;
    //Routes  
    const indexRouter = require('./routes/index');
    const authorizationRouter = require('./routes/authorizationRoute');
    const usersRouter = require('./routes/userRoute');
    
    app.use(indexRouter)
    app.use(`/auth`, authorizationRouter)
    app.use(`/users`, usersRouter)
}

app.listen(port);