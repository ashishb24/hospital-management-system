import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import mongoose from 'mongoose'; // library of mongoDb
import dotenv from "dotenv"
dotenv.config();
import logger from "morgan"; // For tracing logs.
const app = express();
const port = 3000;
const host = '0.0.0.0';
app.use(logger("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


mongoose['connect'](process.env.MONGO_URL);
const connection = mongoose['connection']; // for connecting database with node js.

connection.on('open', () => {
    console.log('database is Connected...');
});

require('./router').default(app, express);  // Require router/index.js file for routing.

app.listen(process.env.PORT || port, process.env.HOST || host, function () {
    console.log(`Server listening at http://localhost:${process.env.PORT}`);
});