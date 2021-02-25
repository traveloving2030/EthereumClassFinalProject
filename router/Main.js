const router = require('express').Router()
const EthereumTx = require('./API/ContractAPI')

router.route('/')
    .get(async (req, res) => {
      res.render('MainPage', { title: 'hello'});
    })



//채팅페이지 꾸미기
router.route('/Chatting')
    .get(async (req, res) => {
      res.render('Chatting', { title: 'Chatting'});
    })

  
module.exports = router;

