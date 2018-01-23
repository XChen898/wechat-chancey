module.exports = function(node_name, xml){
    var tmp = xml.split("<"+node_name+">");
    var _tmp = tmp[1].split("</"+node_name+">");
    return _tmp[0];
};