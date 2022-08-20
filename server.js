'use strict';

require("dotenv").config();
require('./MongoDB/DB')

const http = require('http');
const express = require('express');
const cors = require("cors");
const mongoSanitize = require('express-mongo-sanitize');

const app = express();
const server = http.createServer(app)
const port=process.env.PORT||5000;
const passportContol=require("./Passport/index")

//allow this on production mode;
/*
let  allowlist = ['http://example1.com', 'http://example2.com']
let corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}
*/

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(passportContol.initialize());
app.use(mongoSanitize());

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB or API Gateway, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
app.set('trust proxy', 1);

//const router1=require('./Router/Account')

const router2=require('./Router/Post')

//const router2=require('./router/post')
//const router3=require('./router/request')
//const router4=require('./router/settings')

//app.use("/",router1);
app.use("/",router2);

server.listen(port,()=>console.log(`server started.... ${port}`))