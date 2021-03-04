const router = require('express').Router()
const path = require('path');
const ipfs = require('../ipfs/ipfs')
const EthereumTx = require('./API/ContractAPI')
const getUser = require('./API/NeedAPI')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' });



var sessionAccount = null; //session 저장변수


router.route('/sessionInfo')
    .post(async (req, res) => {

        sessionAccount = req.body.sessionAccount
        console.log("sessionInfo : ", sessionAccount)
    })

//마이페이지 다시 꾸미기
router.route('/MyPage')
    .get(async (req, res) => {
        let request = {
            account: sessionAccount,
        }
        const result = await EthereumTx.getStudentInfoByAddress(request); //다시!!

        res.render('MyPage', { title: 'MyPage', studentInfo: result });
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


router.route('/ShowTutor/selected')
    .post(async (req, res) => {


        const total = await EthereumTx.getNumOfTutors();

        const totalArray = await getUser.getTotalTutorsArray(total);

        let request = {
            totalArray: totalArray,
            gender: req.body.gender,
            residence: req.body.residence,
            subject: req.body.subject

        }
        const selectedTutors = await getUser.getSelectedTutorsArray(request)

        res.render('ShowTutor', { title: 'ShowTutor' ,selectedTutors: selectedTutors})
    })

router.route('/registerStudent')
    .get(async (req, res) => {
        res.render('registerStudent', { title: "registerStudent" });
    })


router.post('/registerStudent', upload.single('resumeHash'), async function (req, res, next) {
    const newpath = path.join(__dirname, '../', req.file.path) //multer 모듈에 저장되는 path 싱크

    const ipfsHash = await ipfs.add({
        path: newpath
    })

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
    if (result) {
        res.send('<script type="text/javascript">alert("학생이 등록되었습니다!!"); window.location.href = "/"; </script>');
    } else {
        res.send('<script type="text/javascript">alert("학생등록 오류입니다!!"); window.location.href = "/user/registerStudent";</script>');
    }
})

router.route('/getTutorResume')
    .post(async (req, res) => {
        let request = {
            account: sessionAccount
        }
        const result=await EthereumTx.getTutorResume(request)
        res.send({result:result})

    })



////////////////////////////////////////////////////////////////////
//////////////////// 선생님용 //////////////////////////////////////
///////////////////////////////////////////////////////////////////

router.route('/FindStudent')
    .get(async (req, res) => {
        res.render('FindStudent', { title: "FindStudent" });
    })



router.route('/ShowStudent')
    .get(async (req, res) => {
        res.render('ShowStudent', { title: "ShowStudent" });
    })


router.route('/ShowStudent/selected')
    .post(async (req, res) => {


        const total = await EthereumTx.getNumOfStudents();

        const totalArray = await getUser.getTotalStudentsArray(total);

        let request = {
            totalArray: totalArray,
            gender: req.body.gender,
            residence: req.body.residence,
            subject: req.body.subject

        }
        const selectedStudents = await getUser.getSelectedStudentsArray(request)

        res.render('ShowTutor', { title: 'ShowTutor' ,selectedStudents: selectedStudents})
    })

router.route('/registerTutor')
    .get(async (req, res) => {
        res.render('registerTutor', { title: "registerTutor" });
    })

router.post('/registerTutor', upload.single('resumeHash'), async function (req, res, next) {
    const newpath = path.join(__dirname, '../', req.file.path) //multer 모듈에 저장되는 path 싱크

    const ipfsHash = await ipfs.add({
        path: newpath
    })
    console.log("tutor세션", sessionAccount)

    let request = {
        account: sessionAccount,
        name: req.body.name,
        gender: req.body.gender,
        age: req.body.age,
        residence: req.body.residence,
        subject: req.body.subject,
        resumeHash: ipfsHash
    }

    const result = await EthereumTx.registerTutor(request)
    if (result) {
        res.send('<script type="text/javascript">alert("선생님이 등록되었습니다!!"); window.location.href = "/"; </script>');
    } else {
        res.send('<script type="text/javascript">alert("선생님등록 오류입니다!!"); window.location.href = "/user/registerTutor";</script>');
    }
})

router.route('/getStudentResume')
    .post(async (req, res) => {
        let request = {
            account: sessionAccount
        }
        const result=await EthereumTx.getStudentResume(request)
        res.send({result:result})

    })
module.exports = router;

