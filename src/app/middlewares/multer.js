const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const aws = require('aws-sdk');
const multers3 = require('multer-s3');


const storageTypes ={
    local: multer.diskStorage({
        destination:(req,file,cb)=> {
            cb(null, path.resolve(__dirname, '..','..','..','tmp','upload'));
        },
        filename:(req,file,cb) => {
            crypto.randomBytes( 16,(err,has) =>{
                if(err) cb(err);

                file.key = `${has.toString('hex')}-${file.originalname}`;
                cb(null, file.key );
            });
        }
    }),
    s3: multers3({
        s3: new aws.S3(),
        bucket:`${process.env.AWS_BUCKET}`,
        contentType: multers3.AUTO_CONTENT_TYPE,
        acl:'public-read',
        key:(req,file,cb) =>{
            crypto.randomBytes( 16,(err,has) =>{
                if(err) cb(err);

                file.key = `${has.toString('hex')}-${file.originalname}`;
                cb(null, file.key );
            });
        },
    }),
};



module.exports ={

    dest: path.resolve(__dirname, '..','..','tmp','upload'),
    storage: storageTypes[process.env.STORAGE_TYPE],
    limits:{
        fileSize: 2 *1024 *1024,
    },
    fileFilter: (req, file, cb) =>{
        const allowerMimes =[
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/gif',
        ];
        
        if(allowerMimes.includes(file.mimetype)){
            cb(null,true)
        }  else{
            cb(new Error("Invalid file type."));
        }

    },

};

