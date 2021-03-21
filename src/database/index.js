const mongoose = require('mongoose');

//mongoose.connect('mongodb://localhost/noderesetltj',;
mongoose.connect('mongodb://localhost/noderesetltj', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(()=> {
    console.log("Mongo conectado")
}).catch((err)=> {
   console.log("Erro ao acessar o Mongo: "+err) 
});

mongoose.Promise = global.Promise;

module.exports = mongoose;