

//access our local copy to contract deployed on rinkeby testnet
//use your own contract address
const address = '0x47cb4093B34fC92983E520E2D1b54BF407dDDe99';
//use the ABI from your contract
const ABI = require('../truffle/build/contracts/Contract').abi
module.exports={address, ABI};
