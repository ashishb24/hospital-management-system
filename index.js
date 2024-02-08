const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); // library of mongoDb
require('dotenv').config();
const logger = require("morgan"); // For tracing logs.
const app = express();
const port = 3000;
const host = '0.0.0.0';
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

mongoose['connect'](process.env.MONGO_URL);
const connection = mongoose['connection']; // for connecting database with node js.

connection.on('open', () => {
    console.log('database is Connected...');
});

require('./router')(app, express);  // Require router/index.js file for routing.

app.listen(process.env.PORT || port, process.env.HOST || host, function () {
    console.log(`Server listening at http://localhost:${process.env.PORT}`);
});