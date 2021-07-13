

//access our local copy to contract deployed on rinkeby testnet
//use your own contract address
const address = '0xb1882612E5EF47d10339CF5953BCe48f2ea5708B';
//use the ABI from your contract
const ABI = require('../truffle/build/contracts/Contract').abi
module.exports={address, ABI};
