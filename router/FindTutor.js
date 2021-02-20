var express = require('express');
var router = express.Router();
const EthereumTx = require('./API/ContractAPI')



router.get('/', function (req, res, next) {
    res.render('FindTutor', { title: "FindTutor" });
});

 router.post('/', async function (req, res) {
    var total = new Array(); //전체 선생님들 정보를 저장하기 위한 임시 배열
    var teachers = new Array(); //전체 선생님들 중 특정 과목과 성별을 만족하는 선생님들을 필터링하여 저장하기 위한 임시 배열
    
    const totalTutors = await EthereumTx.getNumOfTutors();
    
    for (var i = 0; i < totalTutors; i++) {
        const tutorInfo = await EthereumTx.getTutorInfoByIndex(i);
        total.push(tutorInfo);
    }
    total.map(tutors, function(){
        if(tutors[1]==req.body.gender && tutors[4]==req.body.subject){
            teachers.push(tutors)
            // res.render('ShowTutor', {title: 'ShowTutor', tutorArray: tutors})
        }
    })
    res.render('ShowTutor', {title: 'ShowTutor', tutorArray: tutors})

}); 

router.post('/getSession', function (req, res) {
    var test=req.body.account;
    console.log(test);

}); 



module.exports = router;