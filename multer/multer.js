const multer = require("multer");

var storage = multer.diskStorage({
    destination : "./public/uploads",
    filename : function(req,file,cb){
        cb(null, file.filename+"-"+Date.now()+"-"+file.originalname)
    }
});
let upload = multer({storage:storage})
module.exports = upload;