require('dotenv').config()
var express = require('express');
var app = express();
var bodyParser = require('body-parser')

var port = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

loadRoutes()

function loadRoutes() {

    //Routes  
    const indexRouter = require('./routes/index');
    const usersRouter = require('./routes/userRoute');
    
    app.use(`/users`, usersRouter)
    app.use(indexRouter);

}

app.listen(port);