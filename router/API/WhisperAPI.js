var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
// Useful constants
const DEFAULT_CHANNEL = "default";
const DEFAULT_TOPIC = "0x11223344";
const PRIVATE_MESSAGE_REGEX = /^\/msg (0x[A-Za-z0-9]{130}) (.*)$/;

const POW_TIME = 100;
const TTL = 20;
const POW_TARGET = 2;

const WhisperAPI = {


    WhisperChat: async () => {
        // Generate keypair
        const keyPair = await web3.shh.newKeyPair();

        // Obtain public key
        const pubKey = await web3.shh.getPublicKey(keyPair);

        // Generate a symmetric key
        const channelSymKey = await web3.shh.generateSymKeyFromPassword(DEFAULT_CHANNEL);

        const channelTopic = DEFAULT_TOPIC;
    }

}

module.exports = WhisperAPI;