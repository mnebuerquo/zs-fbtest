var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  console.log("called index router");
  res.render('index', { title: 'Your Facebook Picture' });
});


/* GET Hello World page. */
router.get('/helloworld', function(req, res) {
  res.render('helloworld', { title: 'Hello, World!' })
});


module.exports = router;
