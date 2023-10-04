const bodyParser=require('body-parser')
const database=require('./database_config');
const authRouter=require('./routes/authRoutes');
const propertyRoutes=require('./routes/propertyRoutes')
const cors=require('cors');


/**/
const express=require("express");
const app=express();
app.use(cors());
const port=8000;
app.use(bodyParser.json()); 
app.get("/",(req,res)=>{
    res.send("okkkkay");
})

app.use('/api',authRouter);
app.use('/api',propertyRoutes);
app.listen(port,(err)=>{
    if(err){
        console.log("Error connecting the server",err);
        return;
    }
    console.log("Server listening to the port: "+port);
})