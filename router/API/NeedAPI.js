const EthereumTx = require('./ContractAPI')

const getUser = {

    getTotalTutorsArray : async(totalTuterNum) => {
        try {
            var total = new Array(); //전체 선생님들 정보를 저장하기 위한 임시 배열
            for (var i = 0; i < totalTuterNum; i++) {
                const tutorInfo = await EthereumTx.getTutorInfoByIndex(i);
                total.push(tutorInfo);
            }

            return total

        } catch(error) {
            console.log(error)

            return {
                result : false,
                error : error
            }
        }
    },

    getSelectedTutorsArray : async(request) => {
        try {
            var teachers = new Array();
            await request.totalArray.map(tutors => {
                if (tutors[1] == request.gender && tutors[3] == request.residence && tutors[4] == request.subject) {
                    teachers.push(tutors)
                }
            })
            return teachers

        } catch(error) {
            console.log(error)

            return false
        }
    },


}


module.exports =  getUser;