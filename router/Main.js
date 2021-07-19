const router = require('express').Router()
const EthereumTx = require('./API/ContractAPI')
const WhisperAPI = require('./API/WhisperAPI')
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));



let msgs = new Array();






router.route('/')
    .get(async (req, res) => {
     
        res.render('MainPage', { title: 'hello'});
    })




router.route('/Chatting')
    .get(async (req, res) => {
        res.render('Chatting', { title: 'Chatting', msgs: msgs });
    })

router.route('/ChattingForm')
    .post(async (req, res) => {
        var time=new Date();
        const keys = await WhisperAPI.generateKey()
        let request = {
            sendermsg: req.body.sendermsg,
            adminmsg: req.body.adminmsg,
            keypair: keys.keypair,
            UserPubKey: keys.PubKey,
            channelSymKey: keys.channelSymKey,
            msgFilter: keys.msgFilter
        }
        if(req.body.sendermsg!=null && req.body.sendername!=null && req.body.adminmsg==''){
            var result = await WhisperAPI.SenderMessage(request);
            console.log("SenderMessageMethod Result : ", result);
            var getFilterMessages = await WhisperAPI.readMessage(request);
            var msg_hex = getFilterMessages[getFilterMessages.length - 1];

            var sendermsg=web3.utils.toAscii(msg_hex.payload);
            var sendername=req.body.sendername;
            let senderobj={
                sendermsg: sendermsg,
                name: sendername,
                time: time.toLocaleTimeString()
            }
            msgs.push(senderobj);
           
        }else if(req.body.sendermsg=='' && req.body.sendername=='' && req.body.adminmsg!=null){
            var result2 = await WhisperAPI.AdminMessage(request)
            console.log("AdminMessageMethod Result : ", result2)
            var getFilterMessages = await WhisperAPI.readMessage(request);
            var msg_hex = getFilterMessages[getFilterMessages.length - 1];

            var adminmsg=web3.utils.toAscii(msg_hex.payload);
            let adminobj={
                adminmsg: adminmsg,
                name: "Admin",
                time: time.toLocaleTimeString()
            }
            msgs.push(adminobj);
        }

        res.redirect('Chatting')



    })
module.exports = router;

