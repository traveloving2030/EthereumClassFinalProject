var express = require('express');
var router = express.Router();
var Web3 = require('web3');
const ABI = require('../truffle/build/contracts/Contract').abi;
const CA = "0x6799073390e436EB725aa1728E803D0AB3bFaD3B"

var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
var contract = new web3.eth.Contract(ABI, CA);




router.get('/', function (req, res, next) {
    res.render('FindTutor', { title: "FindTutor" });
});