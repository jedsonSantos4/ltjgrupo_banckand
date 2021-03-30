const mongoose = require('mongoose');

//mongoose.connect('mongodb://localhost/noderesetltj',;
mongoose.connect(`${process.env.MONGO_URL}`, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(()=> {
    
}).catch((err)=> {
   console.log("Erro ao acessar o Mongo: "+err) 
});

mongoose.Promise = global.Promise;

module.exports = mongoose;