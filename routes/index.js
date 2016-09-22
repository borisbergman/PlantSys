var express = require('express');
var router = express.Router();
var storage = require('../storage')


/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(storage);
  res.render('index', { title: 'Plant System', state: storage });
});

module.exports = router;
