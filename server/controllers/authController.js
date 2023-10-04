const database=require('../database_config')
const jwt=require('jsonwebtoken');
const SECRET_KEY="someStringForToken";

/*-------controller for signup---------*/
const signup=(req,res)=>{
    const {name,email,password,confirm_password}=req.body;
    const values=[name,email,password];

    console.log(database);
    //check for same password
    if(password!==confirm_password)
    {
        return res.status(500).json({message:'password doesnot match'})
    }
    
    // Check if the email is in a valid format using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }


    //check for uniqueness of the email
    const checkEmailQuery='SELECT * FROM owners WHERE email = ?';
    database.query(checkEmailQuery,email,(err,result)=>{
        if(err){
            console.error('Error querying MySQL:', err);
            return res.status(500).json({message:'internal server error'});
        }
        if(result.length>0){
            return res.status(400).json({message:'Email already exist'});
        
        }
    })



    //register the owner and populate the table of database
    const insertQuery='INSERT INTO owners (name,email,password) VALUES (?,?,?)';
    database.query(insertQuery, values, (err, result) => {
        if (err) {
          console.error('Error inserting user into MySQL:', err);
          return res.status(500).json({ error: 'Internal server error' });
        }
        res.json({ message: 'User signed up successfully!' });
        console.log("the result is:",result);
      });
}



/**Controller  for login */
const login=(req,res)=>{
    const {email,password}=req.body;
    
    //query to check email exist or not
    const checkEmailQuery='SELECT * FROM owners WHERE email=?';
    database.query(checkEmailQuery,email,(err,result)=>{
        if(err){
            return res.status(500).json({error: 'Internal Server Error'});
        }
        if(result.length===0){
            return res.status(401).json({error: 'User not found'})
        }
        const owner=result[0];
        console.log(owner);
        if(owner.password!==password){
            return res.status(401).json({error: 'Invalid username or password'});
        }
        //Generate a JWT token
        const token=jwt.sign({email:owner.email,ownerId:owner.owner_id}, SECRET_KEY, {expiresIn: '1h'});
        res.json({token});
    })

}



module.exports = { signup,login };