const mongoose = require('../../database');
const bcrypt = require('bcryptjs');

const aws = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const s3 = new aws.S3();

const uploadImageSchema = new mongoose.Schema({

    name:{
        type: String,
    },
    size:{
        type: Number,
    },
    key:{
        type: String,
    },
    url:{
        type: String,  
    },
 
    createIndexes:{
        type:Date,
        default: Date.now,
    },
});


uploadImageSchema.pre('save', function(){
    if (!this.url){
        this.url = `${process.env.APP_URL}/files/${this.key}`
    }
});

uploadImageSchema.pre('remove', function(){

    if(process.env.STORAGE_TYPE == 's3')  {
        return s3.deleteObject({
            Bucket: `${process.env.AWS_BUCKET}`,
            Key:this.key,
        }).promise();        
    }else{
        return promisify(fs.unlink)(
            path.resolve(__dirname,"..","..","tmp","uploads",this.key)
        );

    }    
});
const uploadImage = mongoose.model('uploadImage',uploadImageSchema);

module.exports = uploadImage;