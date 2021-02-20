var Web3 = require('web3');
const ABI = require('../../truffle/build/contracts/Contract').abi;
const CA = "0x6799073390e436EB725aa1728E803D0AB3bFaD3B"
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
var contract = new web3.eth.Contract(ABI, CA);


const ethereumTx = {

    registerStudent : async(request) => {
        try {
            const accounts=await web3.eth.getAccounts() //ajax 통신 바꾸기
            await contract.methods.registerStudent(request.name, request.gender, request.age, request.residence, request.subject, request.resumeHash).send({
                from: accounts[0], //ajax 통신 바꾸기
                gas: 2000000,
                gasPrice:"300000"
            })
    
            return true

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
            const accounts=await web3.eth.getAccounts()
            await contract.methods.registerTutor(request.name, request.gender, request.age, request.residence, request.subject, request.resumeHash).send({
                from: accounts[1], //ajax 통신 바꾸기
                gas: 2000000,
                gasPrice:"300000"
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
            const result = await contract.methods.getStudentInfoByAddress(request.myaddress).call()

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

    getTutorResume : async() => {
        try {
            const accounts=await web3.eth.getAccounts() //ajax 통신 바꾸기
            await contract.methods.getTutorResume().send({
                from: accounts[0], //ajax 통신 바꾸기
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