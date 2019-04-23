var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(__dirname));

const dbConfig = require('./config/database.js');
const mongoose = require('mongoose');
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});

require('./app/routes/img.routes')(app);


var server = app.listen(8081, ()=> {

  var host = server.address().address
  var port = server.address().port

  console.log('Connected..', host, port)

});

