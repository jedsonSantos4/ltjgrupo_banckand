const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}))
app.use(cors());


require('./app/controllers/index')(app);

//app.listen(process.env.port || 3000);
app.listen(process.env.PORT || 5000)

 console.log("server rodando no teste");


