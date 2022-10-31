'use strict';

require("dotenv").config();
require('./MongoDB/db')

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


var corsOptions = {
  exposedHeaders: ["set-cookie"],
  credentials: true// some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))
app.use('/', function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin","http://localhost:3000")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET" )
  next();
})
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(passportContol.initialize());
app.use(mongoSanitize());

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB or API Gateway, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
app.set('trust proxy', 1);

const router=require('./router/router')

//app.
router(app);

server.listen(port,()=>console.log(`server started.... ${port}`))

/**
  this help to solve mongodb error whe trying to connect
    from Control Panel -> Administration -> Services -> MongoDB
    control panel  -> system and security  ->Administrative tools  -> Services -> MongoDB
 */