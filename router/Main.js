const router = require('express').Router()
const EthereumTx = require('./API/ContractAPI')
const WhisperAPI = require('./API/WhisperAPI')
var Web3 = require('web3');

const asymKeyId = await web3.shh.newKeyPair();
const asymPubKey = await web3.shh.getPublicKey(asymKeyId);

let filter = {
    topics: ['0x07678231'],
    privateKeyID=asymKeyId
};

const msgFilter=await web3.shh.newMessageFilter(filter);


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
            sendermsg: req.body.sendermsg

        }
        const result = await WhisperAPI.WhisperChatSender(request)
        console.log("msg : ",result)
        // res.render('Chatting', { title: 'Chatting'})
    })
module.exports = router;

