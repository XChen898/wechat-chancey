var getXMLNodeValue = require("../tool/xmlparse.js");
var replyMessage = require("../tool/replyMessage.js");
const content_pattern = /<!\[CDATA\[(.*)\]\]>/;
module.exports = function(req, res){
  var _da;
   req.on("data",function(data){
        _da = data.toString("utf-8");
    });
    req.on("end",function(){
        var Content = getXMLNodeValue('Content',_da);
        var body = content_pattern.exec(Content);
        if( body.length === 2) {
            Content = "Add by Chancey: " + body[1];
        } 
        var xml = replyMessage(_da, Content);
        res.send(xml);
    });
};