var express = require('express');
var router = express.Router();
const EthereumTx = require('./API/ContractAPI')



router.get('/', function (req, res, next) {
    res.render('ShowTutor', { title: "ShowTutor" });
});




module.exports = router;