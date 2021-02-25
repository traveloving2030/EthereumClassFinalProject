const router = require('express').Router()
const EthereumTx = require('./API/ContractAPI')

router.route('/StudentLogin')
    .get(async (req, res) => {
        res.render('StudentLogin', { title: "StudentLogin" });
    })

router.route('/StudentLogin/loginProcess')
    .post(async (req, res) => {

        const accounts = await EthereumTx.getAccounts()

        for (var i = 0; i < accounts.length; i++) {
            if (req.body.stu_ethAccount == accounts[i]) {
                res.render('StudentLoginProcess', { title: "login....", stu_ethAccount: req.body.stu_ethAccount });
            }
        }
        try {
            res.send('<script type="text/javascript">alert("로그인 실패. 이더리움 주소를 확인하세요!!"); window.location.href = "/login/StudentLogin";</script>');
        } catch (e) {
            console.log(e)
        }

    })



router.route('/TutorLogin')
    .get(async (req, res) => {
        res.render('TutorLogin', { title: "TutorLogin" });
    })

router.route('/TutorLogin/loginProcess')
    .post(async (req, res) => {

        const accounts = await EthereumTx.getAccounts()

        for (var i = 0; i < accounts.length; i++) {
            if (req.body.tutor_ethAccount == accounts[i]) {
                res.render('TutorLoginProcess', { title: "login....", tutor_ethAccount: req.body.tutor_ethAccount });
            }
        }
        try {
            res.send('<script type="text/javascript">alert("로그인 실패. 이더리움 주소를 확인하세요!!"); window.location.href = "/login/TutorLogin"; </script>');
        } catch (e) {
            console.log(e)
        }

    })

router.route('/logout')
    .get(async (req, res) => {
        res.render('LogOut', { title: "logout..." });
    })



module.exports = router;


