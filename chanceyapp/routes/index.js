var request = require('request');
var userParameterSet = require("../service/userParameterSet.js");
//var notifyWechatUser = require("../service/getAccountinC4C.js");
var getXMLNodeValue = require("../tool/xmlparse.js");
var formattedValue = require("../tool/formatValue.js");
var replyMessage = require("../tool/replyMessage.js");
var express = require('express');
var jsSHA = require('jssha');

module.exports = function (app) {
  app.use('/ui5', express.static(process.cwd() + '/webapp'));

  /*app.route('/c4c').post(function (req, res) {
    var _da;
    console.log("new event from C4C ---------");
    req.on("data", function (data) {
      _da = data.toString("utf-8");
    });

    req.on("end", function () {
      var payload = JSON.parse(_da);
      var AccountBOguid = payload.businessObjectId;
      notifyWechatUser(AccountBOguid, res);
    });
  });*/

  app.route('/').post(function(req,res){
    var _da;
    req.on("data",function(data){
      _da = data.toString("utf-8");
    });
    req.on("end",function(){
      var replyxml = replyMessage(_da, "The plant of user 'A_XLIMING' will be queried for you.");
      var fromUserName = formattedValue(getXMLNodeValue('FromUserName',_da));
      userParameterSet(fromUserName);
      res.send(replyxml);
    });
  });

  app.route('/').get(function(req,res){
    var token="chancey"; // replace it with your own token
    var signature = req.query.signature,
    timestamp = req.query.timestamp,
    echostr   = req.query.echostr,
    nonce     = req.query.nonce;
    oriArray = new Array();
    oriArray[0] = nonce;
    oriArray[1] = timestamp;
    oriArray[2] = token;
    oriArray.sort();
    var original = oriArray.join('');

    var shaObj = new jsSHA("SHA-1", 'TEXT');
    shaObj.update(original);
    var scyptoString = shaObj.getHash('HEX');
    console.log("calculated string: " + scyptoString);
    if (signature == scyptoString) {
      res.send(echostr);
    } else {
      res.send('bad token');
    }
  });
};
