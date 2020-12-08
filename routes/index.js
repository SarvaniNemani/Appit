var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {


    res.send({ 
      "message": "Welcome to ProEdge APIs", 
      "Environment": `${process.env.NODE_ENV}`,
      "Port": `${process.env.PORT}`
    })
});

module.exports = router;
