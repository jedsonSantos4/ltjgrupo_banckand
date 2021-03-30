require("dotenv").config();

const express = require('express');
const bodyParser = require('body-parser');
//fase 2
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}))
app.use(cors());
app.use(morgan('dev'));
app.use('/files',express.static(path.resolve(__dirname,'..','tmp','upload')))

require('./app/controllers/index')(app);

//app.listen(process.env.port || 3000);
//app.listen(process.env.PORT || 5000);

 


