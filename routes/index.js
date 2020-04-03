var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'God is awesome' });
// });

router.get('/', (req, res) =>  res.sendFile(path.resolve("")));

module.exports = router;
