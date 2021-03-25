const multer = require('multer');
const path = require('path');
const crypto = require('crypto');


module.exports ={

    dest: path.resolve(__dirname, '..','..','tmp','upload'),
    storage: multer.diskStorage({
        destination:(req,file,cb)=> {
            cb(null, path.resolve(__dirname, '..','..','..','tmp','upload'));
        },
        filename:(req,file,cb) => {
            crypto.randomBytes( 16,(err,has) =>{
                if(err) cb(err);

                const fileName = `${has.toString('hex')}-${file.originalname}`;
                cb(null,fileName);
            });
        }
    }),
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

