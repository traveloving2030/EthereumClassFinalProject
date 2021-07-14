var Web3 = require('web3');
const CA = require('../../truffle/build/contracts/Contract').networks["123"].address;
const ABI = require('../../truffle/build/contracts/Contract').abi
var web3 = new Web3('http://localhost:8545');
var contract = new web3.eth.Contract(ABI, CA);


const ethereumTx = {

    getAccounts : async() => {
        try {
            const account = await web3.eth.getAccounts()
            const result = [];
            for(var i=0; i<account.length; i++){
                result.push(web3.utils.toChecksumAddress(account[i]));
            }
            
            return result

        } catch(error) {
            console.log(error)

            return {
                result : false,
                error : error
            }
        }
    },

    registerStudent : async(request) => {
        try {
            const account=request.account.replace(/\"/g,'');
            const result = await contract.methods.registerStudent(request.name, request.gender, request.age, request.residence, request.subject, request.resumeHash).send({
                from: web3.utils.toChecksumAddress(account),
                gas: 3000000
            })
    
            return result;

        } catch(error) {
            console.log(error)

            return false
        }
    },

    StudentValidCheck : async() => {
        try {
            const result = await contract.methods.StudentValidCheck().call()

            return result

        } catch(error) {
            console.log(error)

            return {
                result : false,
                error : error
            }
        }
    },

    registerTutor : async(request) => {
        try {
            const account=request.account.replace(/\"/g,'');
            await contract.methods.registerTutors(request.name, request.gender, request.age, request.residence, request.subject, request.resumeHash).send({
                from: web3.utils.toChecksumAddress(account), 
                gas: 3500000
            })
    
            return true

        } catch(error) {
            console.log(error)

            return false
        }
    },

    TutorValidCheck : async() => {
        try {
            const result = await contract.methods.TutorValidCheck().call()

            return result

        } catch(error) {
            console.log(error)

            return {
                result : false,
                error : error
            }
        }
    },

    getNumOfStudents : async() => {
        try {
            const result = await contract.methods.getNumOfStudents().call()

            return result

        } catch(error) {
            console.log(error)

            return {
                result : false,
                error : error
            }
        }
    },

    getNumOfTutors : async() => {
        try {
            const result = await contract.methods.getNumOfTutors().call()

            return result

        } catch(error) {
            console.log(error)

            return {
                result : false,
                error : error
            }
        }
    },

    getStudentInfoByAddress : async(request) => {
        try {
            const account=request.account.replace(/\"/g,'');
            const result = await contract.methods.getStudentInfoByAddress(web3.utils.toChecksumAddress(account)).call()

            return result

        } catch(error) {
            console.log(error)

            return {
                result : false,
                error : error
            }
        }
    },

    getTutorInfoByAddress : async(request) => {
        try {
            const result = await contract.methods.getTutorInfoByAddress(request.myaddress).call()

            return result

        } catch(error) {
            console.log(error)

            return {
                result : false,
                error : error
            }
        }
    },

    getStudentInfoByIndex : async(index) => {
        try {
            const result = await contract.methods.getStudentInfoByIndex(index).call()

            return result

        } catch(error) {
            console.log(error)

            return {
                result : false,
                error : error
            }
        }
    },

    getTutorInfoByIndex : async(index) => {
        try {
            const result = await contract.methods.getTutorInfoByIndex(index).call()

            return result

        } catch(error) {
            console.log(error)

            return {
                result : false,
                error : error
            }
        }
    },

    getStudentResume : async() => {
        try {
            const accounts=await web3.eth.getAccounts() //ajax 통신 바꾸기
            await contract.methods.getStudentResume().send({
                from: accounts[0], //ajax 통신 바꾸기
                value: web3.utils.toWei('5', "ether"),
            })
    
            return true

        } catch(error) {
            console.log(error)

            return false
        }
    },

    getTutorResume : async(request) => {
        try {
            const account=request.account.replace(/\"/g,'');
            await contract.methods.getTutorResume().send({
                from: web3.utils.toChecksumAddress(account),
                gas: 3500000,
                value: web3.utils.toWei('5', "ether"),
            })
    
            return true

        } catch(error) {
            console.log(error)

            return false
        }
    }

}


module.exports =  ethereumTx;