const { request } = require('express');
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

const DEFAULT_CHANNEL = "default";

/* const defaultRecipientPubKey = "0x04ffb2647c10767095de83d45c7c0f780e483fb2221a1431cb97a5c61becd3c22938abfe83dd6706fc1154485b80bc8fcd94aea61bf19dd3206f37d55191b9a9c4";
const defaultTopic = "0x5a4ea131";
 */

// 1. key 생성
// 2. Filter 생성
// 3. 메세지 post 요청

const WhisperAPI = {

    generateKey: async () => {
        try{
            const keypair = await web3.shh.newKeyPair();
            const PubKey = await web3.shh.getPublicKey(keypair);
            const channelSymKey = await web3.shh.generateSymKeyFromPassword(DEFAULT_CHANNEL);
           let filter = {
                topics: ['0x07678231'],
                symKeyID: channelSymKey
            };
            const msgFilter=await web3.shh.newMessageFilter(filter); 
            const result = {
                keypair: keypair,
                PubKey: PubKey,
                channelSymKey: channelSymKey,
                msgFilter: msgFilter
            }
            return result;
            

            
           

        }catch(error){
            console.log(error)
        }
    },
    //request : asym(checkbox t/f유무), asymKeyId, sendermsg, name , recipientPubKey(복붙하는 상대방 공개키)
    SenderMessage: async (request) => {
        try {

            let postData = {
                symKeyID: request.channelSymKey,
                sig: request.keypair,
                ttl: 7,
                topic: '0x07678231',
                powTarget: 2.01,
                powTime: 100,
                payload: await web3.utils.fromAscii(request.sendermsg)
            };


            //결과 확인해보기
            const result = await web3.shh.post(postData);


            return result
        } catch (error) {
            console.log(error)
        }


    },

    AdminMessage: async (request) => {
        try {

            let postData = {
                symKeyID: request.channelSymKey,
                sig: request.keypair,
                ttl: 7,
                topic: '0x07678231',
                powTarget: 2.01,
                powTime: 100,
                payload: await web3.utils.fromAscii(request.adminmsg)
            };


            //결과 확인해보기
            const result = await web3.shh.post(postData);


            return result
        } catch (error) {
            console.log(error)
        }


    },
    readMessage: async (request) => {
        const getFilterMessage=await web3.shh.getFilterMessages(request.msgFilter);
        return getFilterMessage;

    },

    WhisperChatReceiver: async (request) => {
        try {
            const SenderkeyPair = await web3.shh.newKeyPair();
            const SenderpubKey = await web3.shh.getPublicKey(SenderkeyPair);
            await web3.shh.newMessageFilter()
            let postData = {
                pubkey: SenderpubKey,
                ttl: 20,
                powTarget: 2.01,
                powTime: 100,
                payload: web3.utils.fromAscii(request.recivermsg),
            };

            const hexresult = await web3.shh.post(postData);
            const result = await web3.utils.hexToUtf8(hexresult)
            return result
        } catch (error) {
            console.log(error)
        }


    }

}

module.exports = WhisperAPI;