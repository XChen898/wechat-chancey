var getXMLNodeValue = require("./xmlparse.js");
module.exports = function(originalBody, contentToReply){
  var ToUserName = getXMLNodeValue('ToUserName', originalBody);
  var FromUserName = getXMLNodeValue('FromUserName',originalBody);
  var CreateTime = getXMLNodeValue('CreateTime',originalBody);
  var MsgType = getXMLNodeValue('MsgType',originalBody);
  var Content = contentToReply;
  var MsgId = getXMLNodeValue('MsgId', originalBody);
  var xml = '<xml><ToUserName>'+FromUserName+'</ToUserName><FromUserName>'+ToUserName+'</FromUserName><CreateTime>'+CreateTime+'</CreateTime><MsgType>'+MsgType+'</MsgType><Content>'+Content+'</Content></xml>';
  console.log("被动回复用户消息: " + xml);
  return xml;
};