module.exports=(dir)=>{
    const multer = require("multer");
    const storage = multer.diskStorage({
        destination: (req, file, cb)=>{
            cb(null, './uploads/');
        },
        filename: (req, file, cb)=>{
            //console.log(file)
            cb(null, Date.now() + file.originalname);
        }, 
    });
    const fileFilter=(req,file,cb)=>{
        if(file.mimetype==='image/jpeg' || file.mimetype==='image/png'){
            cb(null,true);
        }
        else{
            cb(null,false);
        }
    }
    return multer({
        storage: storage,
        limits:{
            fileSize: 1024*1024*10,
        },
        fileFilter:fileFilter,
    });
}