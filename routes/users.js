// var express = require('express');
// var con =require('../RSmysqlconnection');
// var router = express.Router();
//
// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
//
// /* /users/God. */
// router.get('/God', function(req, res, next) {
//   res.send('God is best');
// });
//
// // POST /users/Godji
// router.post('/Godji', function(req, res, next) {
//   let a=req.body.love;
//   res.send(a);
// });
//
//
//
//
// // GET /users/Godjikijai
// router.get('/Godjikijai', function(req, res, next) {
//   let a=req.body.love;
//
//   con.query("SELECT * FROM love",(err,rows,fields)=>{
//     if (!err)
//     {
//       return res.send(rows);
//
//     }else {
//       console.log(err);
//     }
//   });
// });
//
//
// module.exports = router;
