//Miriam Wojcik
//go_sip AB testing website
//v 2
//18/3/2020

import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import mongoose from 'mongoose'
import crypto from 'crypto'
import cors from 'cors'
import helmet from 'helmet'
import counterRoutes from './routes/counter.routes.js'

const __dirname = path.resolve();
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())

app.use(express.static("public"));
app.use('/', counterRoutes)

app.set('views', path.join(__dirname, 'views/pages/'));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.render('index');
});

export default app