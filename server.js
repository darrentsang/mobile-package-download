var express = require('express');
var app = express();

app.get('/', function(req, res) {
    // do something
});

app.listen(5001, () => { console.log("Server started and listening port 5001...")})