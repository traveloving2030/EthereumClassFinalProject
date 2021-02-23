const router = require('express').Router()


router.route('/')
    .get(async (req, res) => {
      res.render('MainPage', { title: 'hello'});
    })

//마이페이지 꾸미기
router.route('/MyPage')
    .get(async (req, res) => {
      res.render('MyPage', { title: 'MyPage'});
    })

//채팅페이지 꾸미기
router.route('/Chatting')
    .get(async (req, res) => {
      res.render('Chatting', { title: 'Chatting'});
    })

  
module.exports = router;

