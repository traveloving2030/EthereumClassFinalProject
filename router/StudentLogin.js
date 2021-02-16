var express = require('express');
var router = express.Router();
var Web3 = require('web3');
const ABI = require('../truffle/build/contracts/Contract').abi;
const CA = "0x2d5C149563dafC4242bB82A29bCA015942F33c3d"

var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
var contract = new web3.eth.Contract(ABI, CA);




router.get('/', function (req, res, next) {
    res.render('StudentLogin', { title: "StudentLogin" });
});

router.post('/', function (req, res) {
    
        web3.eth.getAccounts().then(function (accounts) {
        var i;
        for (i = 0; i < accounts.length; i++) {
            if (req.body.stu_ethAccount == accounts[i]) {
                res.render('StudentLoginProcess', { title: "login....", stu_ethAccount: req.body.stu_ethAccount });
            }
        }
        try{
            if (i == accounts.length) {
                res.send('<script type="text/javascript">alert("로그인 실패. 이더리움 주소를 확인하세요!!");</script>');
                
            }
        }catch(e){
            console.log(e)
        }



    })
});

module.exports = router;