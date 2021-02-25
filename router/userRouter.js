const router = require('express').Router()
const path=require('path');
const ipfs = require('../ipfs/ipfs')
const EthereumTx = require('./API/ContractAPI')
const multer=require('multer')
const upload=multer({dest:'uploads/'});
const loginRouter = require('./loginRouter.js');


var sessionAccount=null; //session 저장변수


router.route('/sessionInfo')
    .post(async (req, res) => {
        sessionAccount=req.body.sessionAccount
        console.log("sessionInfo : ",sessionAccount)
    })

//마이페이지 꾸미기
router.route('/MyPage')
    .get(async (req, res) => {
      let request = {
      myaddress: sessionAccount,
    }
      const result = await EthereumTx.getStudentInfoByAddress(request);

      res.render('MyPage', { title: 'MyPage', studentInfo: result});
})

////////////////////////////////////////////////////////////////////
//////////////////// 학생용 //////////////////////////////////////
///////////////////////////////////////////////////////////////////


router.route('/FindTutor')
    .get(async (req, res) => {
        res.render('FindTutor', { title: "FindTutor" });
    })

    
router.route('/ShowTutor')
    .get(async (req, res) => {
        res.render('ShowTutor', { title: "ShowTutor" });
    })


router.route('/FindTutor/selected')
    .post(async (req, res) => {
/*     var total = new Array(); //전체 선생님들 정보를 저장하기 위한 임시 배열
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
   })  */
   res.render('ShowTutor', {title: 'ShowTutor'})
    })

router.route('/registerStudent')
    .get(async (req, res) => {
        res.render('registerStudent', { title: "registerStudent" });
    })

    
router.post('/registerStudent', upload.single('resumeHash'), async function (req, res, next) {
         const newpath=path.join(__dirname, '../', req.file.path) //multer 모듈에 저장되는 path 싱크

         const ipfsHash = await ipfs.add({
            path : newpath
        })
        console.log("session테스트",sessionAccount)

        let request = {
            account: sessionAccount,
            name: req.body.name,
            gender: req.body.gender,
            age: req.body.age,
            residence: req.body.residence,
            subject: req.body.subject,
            resumeHash: ipfsHash
        }

        const result = await EthereumTx.registerStudent(request)
        if(result){
             res.send('<script type="text/javascript">alert("학생이 등록되었습니다!!"); window.location.href = "/"; </script>');
        }else{
            res.send('<script type="text/javascript">alert("학생등록 오류입니다!!"); window.location.href = "/user/registerStudent";</script>');
        }
    })



////////////////////////////////////////////////////////////////////
//////////////////// 선생님용 //////////////////////////////////////
///////////////////////////////////////////////////////////////////

router.route('/FindStudent')
    .get(async (req, res) => {
        res.render('FindStudent', { title: "FindStudent" });
    })


router.route('/sessionInfo')
    .post(async (req, res) => {
        var test=req.body.account;
        console.log("hi",test);
    })

router.route('/ShowStudent')
    .get(async (req, res) => {
        res.render('ShowStudent', { title: "ShowStudent" });
    })


router.route('/FindStudent/selected')
    .post(async (req, res) => {
/*     var total = new Array(); //전체 선생님들 정보를 저장하기 위한 임시 배열
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
   })  */
   res.render('ShowStudent', {title: 'ShowStudent'})
    })

router.route('/registerTutor')
    .get(async (req, res) => {
        res.render('registerTutor', { title: "registerTutor" });
    })


module.exports = router;

