const router = require('express').Router()
const EthereumTx = require('./API/ContractAPI')
const WhisperAPI = require('./API/WhisperAPI')
var Web3 = require('web3');




let msgs=new Array();





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
            sendermsg: req.body.sendermsg,
            asymKeyId: asymKeyId,
            recipientPubKey: asymPubKey,
            msgFilter: msgFilter
        }
        const result = await WhisperAPI.SendMessage(request)
        console.log("SendMessageMethod Result : ",result)
        
        setInterval(() => {
            var logs=await WhisperAPI.readMessage(request)
            console.log(logs)
        }, 1000);
        // res.render('Chatting', { title: 'Chatting'})
    })
module.exports = router;

