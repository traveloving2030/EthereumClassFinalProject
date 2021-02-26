const router = require('express').Router()
const EthereumTx = require('./API/ContractAPI')
const WhisperAPI = require('./API/WhisperAPI')

router.route('/')
    .get(async (req, res) => {
      res.render('MainPage', { title: 'hello'});
    })



//채팅페이지 꾸미기
router.route('/Chatting')
    .get(async (req, res) => {
      res.render('Chatting', { title: 'Chatting'});
    })

router.route('/sender')
    .post(async (req, res) => {


        let request = {
            sendermsg: req.body.sendermsg

        }
        const result = await WhisperAPI.WhisperChatSender(request)
        console.log("msg : ",result)
        // res.render('Chatting', { title: 'Chatting'})
    })
module.exports = router;

