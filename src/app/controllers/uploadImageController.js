const express = require('express');
const multer = require('multer');

const multerMiddleware =  require('../middlewares/multer');

const uploadImage = require('../models/uploadImage');

const router = express.Router();

router.get('/List', async(req,res) =>{
    try{
        const image = await uploadImage.find();
    
    return res.json(image);
    }
    catch(err){
        return res.status(400).send({ error: 'Erro receiving image list' });
    }
    

});

router.post('/post',  multer(multerMiddleware).single('file'), async(req, res) =>{

    const {originalname:name,size, key, location: url = ""} = req.file
    
    const image = await uploadImage.create({
        name,
        size,
        key,
        url,
    });
    try{
        return res.json(image);
    }
    catch(err){
        return res.status(400).send({ error: 'Erro upload  image' });
    }
});

router.delete('/:id', async(req,res) =>{
    try{
        const image = await uploadImage.findById(req.params.id);
        
        await image.remove();

        return res.send('ok');
    }
    catch(err){          
        return res.status(400).send({ error: 'Erro when trying to remove image' });
    }
    

});


module.exports = app => app.use('/uploadimage',router);
