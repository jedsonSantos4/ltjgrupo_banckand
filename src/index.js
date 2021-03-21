const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}))

require('./app/controllers/index')(app);

app.listen(process.env.port || 3000);

 console.log("server rodando no teste");


