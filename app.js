//if u want to run the application type node server.js on localhost :3000
const { find, db } = require("./Schmea/collection");
const cookieParser = require("cookie-parser");
const { EventEmitter } = require("events");
const { parse } = require("path");
const { fstat } = require("fs");

module.exports = function(){
require("dotenv").config();
const csvtojson = require("csvtojson");
const express = require("express"),
app = express(),
fs = require("fs"),
parser = require("body-parser"),
cookie = require("cookie-parser"),
path = require("path"),
mongoose = require("mongoose"),
socket = require("socket.io"),
coll = require("./Schmea/collection"),
upload = require("./multer/multer");
app.engine("html",require("ejs").renderFile);
process.setMaxListeners(0)

app.use(parser.urlencoded({extended:false}))

let Pathvalue = path.join(__dirname,"./views")
let collectionName;

console.log(Pathvalue);
app.use(express.static(path.join(__dirname,"/public")))
var http =  require("http").createServer(app)
var io = socket(http);


/////////////////////////

app.get("/",(req,res)=>{ //rendering the landign page here
    res.sendFile(Pathvalue+"/home.html",()=>{
    })
});

app.post("/upload",upload.single('filename'),(req,res)=>{  

    let scope  = path.join(__dirname,"/public/uploads/");
        collectionName = req.file.filename;
    //connecting to a specific mongodb database with the url provided by the user
     mongoose.connect(req.body.ui,{ useNewUrlParser: true ,useUnifiedTopology: true }).then(()=>{  
        try { 
          console.log("connected with the database")
          csvtojson() //converting .csv file data into the json file s
          .fromFile(scope+collectionName) //location where file is uploaded 
          .then(csvData => {
            let length = csvData.length;
           csvData.forEach((e)=>{ //using foreach on the json object to get the data and create the collection in database
           coll.create({json : e},(err,create)=>{
             if(err)return err;
               console.log("creating in database wait");
               console.log(length--);
               if(length<1 || length == 0){
                 fs.unlink(scope+collectionName,()=>{ //deleting file from server once uploaded
                   console.log("file deleted")
                 })
               } //just printing the length nothing else
           });
          });
      });
    }catch(err){
           console.log(err)
      }
      }).then(()=>{ //disconnecting 
        mongoose.disconnect();
      });
});


return http.listen(process.env.PORT,()=>{
    console.log("connected with server");
});

}

