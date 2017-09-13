const fs = require("fs");
const host = '0.0.0.0';
const port = '9022';
const express = require("express");
const http = require("http");
const bodyParser = require('body-parser');
const request = require('request');
let app = express();
let server = http.createServer(app);
server = app.listen(port, host);
let apiRoutes = express.Router();

apiRoutes.use((req, res, next) => { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "http://localhost");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

apiRoutes.use(bodyParser.json());

app.use('/api', apiRoutes);

app.set('view engine', 'html');
app.use(express.static(__dirname + '/public'));

apiRoutes.post('/searchCity', (req, res) => {
  let city = req.body.name;
  request({
    url:'http://kladr-api.ru/api.php',
    encoding: null,
    headers: {
        'content-type': 'application/json'
    },
      qs: {
      query:city,
      contentType : 'city',
      limit: 5
    }
}
    , (error, response, body) => {
    if (!error && response.statusCode === 200) {
      let info = JSON.parse(body);
      res.send(info);
    }
    else {
      res.send({success: false, msg: error});
    }
  })

});

server.on('error',  (err) => {
    console.log('error:' + err);
});

server.on('listening', () => {
      console.log('Application ready to serve requests.');
      console.log('server listening on http://'+host+':'+port);
});