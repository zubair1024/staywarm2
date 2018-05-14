const http = require('http');
const express = require('express');
const app = express();
const path = require('path');
const cors = require("cors");
const compression = require("compression");

//increase the number sockets
http.globalAgent.maxSockets = Infinity;

// GZIP all assets
app.use(compression());


//allow cross-domain requests to server
var originsWhitelist = [
    "http://localhost:4200",
    "http://localhost:9000"
];
//cors options setup
const corsOptions = {
    origin: function (origin, callback) {
        var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
    },
    credentials: true
};
//here is the magic
app.use(cors(corsOptions));

//setting up global headers for CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
    );
    if ("OPTIONS" == req.method) {
        // res.send(200);
        res.header("Access-Control-Allow-Origin", req.headers.origin);
    } else {
        next();
    }
});


/**
 * Body parser middleware
 */
var bodyParser = require("body-parser");
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

/**
 * setup the public directoy
 */
app.use(express.static(__dirname + '/public', { maxAge: 31557600 }));


app.listen(80, () => console.log('Example app listening on port 80!'))