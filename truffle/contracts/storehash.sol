
//0xb84b12e953f5bcf01b05f926728e855f2d4a67a9  contract address on rinkeby
//deployed using remix 
pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract Contract {

       struct User {
        string name;
        string gender;
        uint age;
        string residence;
        string subject;
        string resumeHash;
    }

    address payable owner;
    
    mapping(address => User) studentInfo;
    mapping(address => User) tutorInfo;
    
    User[] students;
    User[] tutors;
    
    uint numberOfStudents;
    uint numberOfTutors;
    
    constructor () public {
      owner=msg.sender;
    }


    function registerStudent(string memory _name, string memory _gender, uint _age, string memory _residence, string memory _subject, string memory _resumeHash) public {
        studentInfo[msg.sender].name=_name;
        studentInfo[msg.sender].gender=_gender;
        studentInfo[msg.sender].age=_age;
        studentInfo[msg.sender].residence=_residence;
        studentInfo[msg.sender].subject=_subject;
        studentInfo[msg.sender].resumeHash=_resumeHash;
        students.push(User(_name, _gender, _age, _residence, _subject, _resumeHash));
        numberOfStudents++;
    }
    
    function StudentValidCheck(address myaddress) public view returns(bool) {
        require(bytes(studentInfo[myaddress].name).length != 0);
        require(bytes(studentInfo[myaddress].gender).length != 0);
        require(studentInfo[myaddress].age!=0);
        require(bytes(studentInfo[myaddress].residence).length != 0);
        require(bytes(studentInfo[myaddress].subject).length != 0);
        require(bytes(studentInfo[myaddress].resumeHash).length == 46);
        return true;
    }

    function registerTutors(string memory _name, string memory _gender, uint _age, string memory _residence, string memory _subject, string memory _resumeHash) public {
        tutorInfo[msg.sender].name=_name;
        tutorInfo[msg.sender].gender=_gender;
        tutorInfo[msg.sender].age=_age;
        tutorInfo[msg.sender].residence=_residence;
        tutorInfo[msg.sender].subject=_subject;
        tutorInfo[msg.sender].resumeHash=_resumeHash;
        tutors.push(User(_name, _gender, _age, _residence, _subject, _resumeHash)) ;
        numberOfTutors++;
    }

    function TutorValidCheck(address myaddress) public view returns(bool) {
        require(bytes(tutorInfo[myaddress].name).length != 0);
        require(bytes(tutorInfo[myaddress].gender).length != 0);
        require(tutorInfo[myaddress].age!=0);
        require(bytes(tutorInfo[myaddress].residence).length != 0);
        require(bytes(tutorInfo[myaddress].subject).length != 0);
        require(bytes(tutorInfo[myaddress].resumeHash).length == 46);
        return true;
    }
    
    function getNumOfStudents() public view returns(uint) {
        return numberOfStudents;
    }

    function getNumOfTutors() public view returns(uint) {
        return numberOfTutors;
    }
    

    
    function getStudentInfoByAddress(address myaddress) public view returns (string memory, string memory, uint , string memory, string memory, string memory) {
        return (studentInfo[myaddress].name, studentInfo[myaddress].gender, studentInfo[myaddress].age, studentInfo[myaddress].residence, studentInfo[myaddress].subject, studentInfo[myaddress].resumeHash);
    }
    
    function getTutorInfoByAddress(address myaddress) public view returns (string memory, string memory, uint , string memory, string memory, string memory) {
        return (tutorInfo[myaddress].name, tutorInfo[myaddress].gender, tutorInfo[myaddress].age, tutorInfo[myaddress].residence, tutorInfo[myaddress].subject, tutorInfo[myaddress].resumeHash);
    }
    
    function getStudentInfoByIndex(uint _index) public view returns (string memory, string memory, uint , string memory, string memory, string memory) {
        return (students[_index].name, students[_index].gender, students[_index].age, students[_index].residence, students[_index].subject, students[_index].resumeHash);
    }

    function getTutorInfoByIndex(uint _index) public view returns (string memory, string memory, uint , string memory, string memory, string memory) {
        return (tutors[_index].name, tutors[_index].gender, tutors[_index].age, tutors[_index].residence, tutors[_index].subject, tutors[_index].resumeHash);
    }

    function getStudentResume() public payable {
      TutorValidCheck(msg.sender);
      owner.transfer(msg.value);
 
    }

    function getTutorResume() public payable {
      StudentValidCheck(msg.sender);
      owner.transfer(msg.value);
     
    }


    


}