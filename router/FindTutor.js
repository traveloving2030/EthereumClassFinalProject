var express = require('express');
var router = express.Router();
var Web3 = require('web3');
const ABI = require('../truffle/build/contracts/Contract').abi;
const CA = "0x6799073390e436EB725aa1728E803D0AB3bFaD3B"

var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
var contract = new web3.eth.Contract(ABI, CA);




router.get('/', function (req, res, next) {
    res.render('FindTutor', { title: "FindTutor" });
});

router.post('/', function (req, res) {
    const accounts = await web3.eth.getAccounts();
    var total = new Array(); //전체 선생님들 정보를 저장하기 위한 임시 배열
    var array2 = new Array(); //전체 선생님들 중 특정 과목과 성별을 만족하는 선생님들을 필터링하여 저장하기 위한 임시 배열

    const totalTutors = await storehash.methods.getNumOfTutors().call();
    
    for (var i = 0; i < totalTutors; i++) {
        const tutorInfo = await storehash.methods.getTutorInfo(i).call();
        total.push(tutorInfo);
    }
    total.map(tutors, function(){
        if(tutors[1]==req.body.gender && tutors[4]==req.body.subject){
            
        }
    })

});

module.exports = router;