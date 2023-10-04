const sql=require("mysql");
const database=sql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'see-estate',

});

database.connect((err)=>{
    if(err){
        console.log("Error connecting to Database:"+err);
        return;
    }
    console.log("Connected to MySQL server");
    
})
module.exports=database;