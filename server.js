var express = require('express');
var app = express();

const packages = require('./packages')
const upload = require('./upload')
const auth = require('./auth')

app.use(express.json());
app.use('/packages', packages);
app.use('/upload', upload);
app.use('/auth', auth);

app.get('/', function(req, res) {
    // do something
});

app.listen(5001, () => { console.log("Server started and listening port 5001...")})