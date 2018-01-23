var config = require("../../config.js");
var request = require('request');
var postWCMessage = require("./postMessageToUser.js");

var getTokenOptions = {
  url: config.url,
  method: "GET",
  json:true,
  headers: {
    "content-type": "application/json",
    'Authorization': 'Basic ' + new Buffer(config.credential).toString('base64'),
    "x-csrf-token" :"fetch"
  }
};

function getToken() {
  return new Promise(function(resolve,reject){
    var requestC = request.defaults({jar: true});
    requestC(getTokenOptions,function(error,response,body){
     var csrfToken = response.headers['x-csrf-token'];
     if(!csrfToken){
      reject({message:"token fetch error"});
      return;
    }
    resolve(csrfToken);
      }); // end of requestC
  });
}

function _userParameterSet(token){
	return new Promise(function(resolve, reject){
		var oPostData = {
			"FirstName":"Wechat",
//      "LastName":fromUserName,
      "RoleCode": "ZCRM01",
      "CountryCode": "US",
      "StatusCode": "2"
    };
    var requestC = request.defaults({jar: true});
    var serviceOptions = {
      url: config.url,
      method: "GET",//"POST",
      json:true,
      headers: {
        "content-type": "application/json",
        'x-csrf-token': token
      }
//      body:oPostData
    };

    requestC(serviceOptions,function(error,response,data){
      if(error){
        reject(error.message);
      }else {
       resolve(data);
     }
        });// end of requestC
  });
}

module.exports = function userParameterSet(fromUserName){
  getToken().then(function(token) {
    console.log("'x-csrf-token' received: " + token);
    _userParameterSet(token).then(function(data){
      var message = "Plant: " + data.d.results[0].Plant;
      console.log(message);
      postWCMessage(fromUserName, message);
    });
  });
};