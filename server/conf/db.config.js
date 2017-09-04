//this configuration file uses mongoDb as a databases
var mongoose=require('mongoose');
var env={
    development:{
        database:"test",
        username:"admin",
        password:"admin",
        port:27017,
        authSource:""
    },
    staging:{
        database:"staging",
        username:"",
        password:"",
        port:27017,
        authSource:""
    },
    production:{
        database:"production",
        username:"",
        password:"",
        port:27017,
        authSource:""
    }

};
var buildUrl=function(config){
    if(typeof(config.username)=="undefined" && typeof(config.password)=="undefined")
        return "mongodb://@localhost:"+config.port+"/"+config.database;
    else
    return "mongodb://"+config.username+":"+config.password+"@localhost:"+config.port+"/"+config.database;
};

module.exports=function(mode, callback){
    var db=env[mode];
    db.dbUrl=buildUrl(db);
    //connecting to database
    mongoose.connect(db.dbUrl, function(err){
    if(err)
        console.log(err);
    
    else
        console.log("Successfully connected to - %s",db.database);
    });
   return mongoose;
};
