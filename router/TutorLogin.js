var express = require('express');
var router = express.Router();
var Web3 = require('web3');
const ABI = require('../truffle/build/contracts/Contract').abi;
const CA = "0x6799073390e436EB725aa1728E803D0AB3bFaD3B"

var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
var contract = new web3.eth.Contract(ABI, CA);




router.get('/', function (req, res, next) {
    res.render('TutorLogin', { title: "TutorLogin" });
});

router.post('/', function (req, res) {
    
        web3.eth.getAccounts().then(function (accounts) {
        var i;
        for (i = 0; i < accounts.length; i++) {
            if (req.body.tutor_ethAccount == accounts[i]) {
                res.render('TutorLoginProcess', { title: "login....", tutor_ethAccount: req.body.tutor_ethAccount });
            }
        }
        try{
            res.send('<script type="text/javascript">alert("로그인 실패. 이더리움 주소를 확인하세요!!");</script>');
        }catch(e){
            console.log(e)
        }



    })
});

module.exports = router;