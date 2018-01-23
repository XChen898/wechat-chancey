var express = require('express');
var routesEngine = require('./chanceyapp/routes/index.js'); 
var app = express();
routesEngine(app);

app.listen(process.env.PORT || 8080, function () {
  console.log('Listening on port, process.cwd(): ' + process.cwd() );
});