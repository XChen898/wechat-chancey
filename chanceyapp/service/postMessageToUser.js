var config = require("../../config.js");
var request = require("request");

function printObject(oData){
	for( var a in oData){
		console.log("key: " + a);
		console.log("value: " + oData[a]);
		if( typeof oData[a] === "object"){
			printObject(oData[a]);
		}
	}
}

function sendWCMeaasge(toUser,sMessage){
	console.log("客服消息: " + toUser + " with message: " + sMessage);
    var options = {
            url:"https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=" +
            config.accessToken, 
            method: "POST",
            json:true,
            headers: {
            	"content-type": "application/json"},
            body:{
              "touser":toUser,
              "msgtype":"text",
              "text":
              {
                   "content":sMessage
              }
                }
          };
      request(options,function(error,response,data){
      	console.log("error? " + error);
        console.log("response: " + response);
        console.log("data: " + data);
        console.log("response...............................................");
        //printObject(response);
        console.log("data.....................................................");
        console.log("Status message: " + response.statusMessage);
        console.log("Data error message: " + data.errmsg);
      });
  }

module.exports = sendWCMeaasge;