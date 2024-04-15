const express = require("express");
const app = express();
const bodyP = require("body-parser");
const compiler = require("compilex");

const options = { stats: true };
compiler.init(options);

// Configuring body-parser middleware
app.use(bodyP.urlencoded({ extended: true }));
app.use(bodyP.json());

// Serving static files
app.use("/codemirror-5.65.16", express.static("D:/PBL_Project_SEM4/Code_Editor/codemirror/codemirror-5.65.16"));

// Sending file as response for the root route
app.get("/", function(req, res) {
  compiler.flush(function(){
    console.log("deleted")
  })
  res.sendFile("D:/PBL_Project_SEM4/Code_Editor/codemirror/index1.html");
});

// Handling compilation process
app.post("/compile", function(req, res) {
    var code=req.body.code 
    var input=req.body.input
    var lang=req.body.lang
     
    try{
      if(lang==="Cpp"){
        if(!input){
          //if windows  
            var envData = { OS : "windows" , cmd : "g++", options:{timeout:10000}}; 
    
            compiler.compileCPP(envData , code , function (data) {
            if(data.output){
            res.send(data);
           }
           else {
            res.send({output:"Error"})
           }
           });
        }
        else{
          var envData = { OS : "windows" , cmd : "g++", options:{timeout:10000}}; 
             
          compiler.compileCPPWithInput(envData , code , input , function (data) {
          if(data.output){
            res.send(data);
           }
           else {
            res.send({output:"Error"})
           }
         });
        }
      }
      else if(lang==="Java"){
        if(!input){
             var envData = { OS : "windows"}; 
    
            compiler.compileJava( envData , code , function(data){
            if(data.output){
            res.send(data);
           }
           else {
            res.send({output:"Error"})
           }
          }); 
        }
        else{
              
         var envData = { OS : "windows"}; 
    
         compiler.compileJavaWithInput( envData , code , input ,  function(data){
         if(data.output){
            res.send(data);
           }
           else {
            res.send({output:"Error"})
           }
         });
        }        
      }
      else if(lang==="Python"){
        if(!input){ 
           var envData = { OS : "windows"}; 
    
           compiler.compilePython( envData , code , function(data){
           if(data.output){
            res.send(data);
           }
           else {
            res.send({output:"Error"})
           }
          });    
        }
        else{ 
        var envData = { OS : "windows"}; 
    
        compiler.compilePythonWithInput( envData , code , input ,  function(data){
        if(data.output){
            res.send(data);
           }
           else {
            res.send({output:"Error"})
           }       
        });
        }
      }
    }
    catch(e){
      console.log("Error")
    }
});

// Listening on port 8000
app.listen(8000, function() {
  console.log("Server is running on port 8000");
});
