const express = require('express');
const multer = require('multer');

const multerMiddleware =  require('../middlewares/multer');

const router = express.Router();

router.post('/posts',  multer(multerMiddleware).single('file'), (req, res) =>{

    try{
          console.log(req.file);

          return res.json({hello: "teste"});
    }
    catch(err){
        return res.status(400).send({ error: 'Erro loading project' });
    }
});

router.post('/',  multer(multerMiddleware).single('file'), (req, res) =>{

    try{
          console.log(req.file);

          return res.json({hello: "teste"});
    }
    catch(err){
        return res.status(400).send({ error: 'Erro loading project' });
    }
});


module.exports = app => app.use('/upload',router);
