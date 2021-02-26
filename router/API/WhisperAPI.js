var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));


const WhisperAPI = {


    WhisperChatSender: async (request) => {
        try{
            //실습시 바꿔줘야함
            // const keypair="227b814af4b372faeaf01b65d36217ec8c20d0463a55c4ee677555cc222df599";
            // const Receiversymkey = "94b298316f8f0773a7f4d16ad26599ea7cd7a06bf544ea931599c725c3a5b192";
            const symkey = await  web3.shh.newSymKey();
            const keypair= await web3.shh.newKeyPair();
            const subscription = await web3.shh.subscribe("messages",{
                symKeyID: symkey,
                topics: ['0xffaadd11']
            })
            
             let postData = {
                symKeyID: symkey,
                sig: keypair,
                ttl: 20,
                topic: '0xffaadd11',
                powTarget: 2.01,
                powTime: 100,
                payload: web3.utils.fromAscii(request.sendermsg)
            };
    
            const result=await web3.shh.post(postData); 
            // const result=await web3.utils.toUtf8(hexresult)

            return result
        }catch(error){
            console.log(error)
        }


    },

    WhisperChatReceiver: async (request) => {
        try{
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

            const hexresult=await web3.shh.post(postData);
            const result=await web3.utils.hexToUtf8(hexresult)
            return result
        }catch(error){
            console.log(error)
        }


    }

}

module.exports = WhisperAPI;