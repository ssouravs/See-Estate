const database=require('../database_config')
    const addProperty=async (req,res)=>{
        try{
            const {propertyName,location,propertyPrice,propertyType}=req.body;
            //console.log(req.ownerId);
            const ownerID=req.ownerId;
            console.log(ownerID);
            if(!propertyName || !location || !propertyPrice || !propertyType){
                return res.status(400).json({error: 'Missing required fields'})
            }

            //INsert the property into the database using promises
            const insertQuery='INSERT INTO properties (owner_id,propertyName,location,propertyPrice,propertyType) VALUES (?,?,?,?,?)';
            const values=[ownerID,propertyName,location,propertyPrice,propertyType]


            const insertProperty=()=>{
                return new Promise((resolve,reject)=>{
                database.query(insertQuery,values,(err,result)=>{
                    if(err){
                        console.error('Error inserting the property into the database');
                        reject(err);
                    }else{
                        resolve(result)
                    }
                });
                })
            }
            //wait for the database operation to complete
            await insertProperty();
            res.json({message: 'Property added succesfully'});


        }catch(err){
            console.error('Error adding the property:',err);
            return res.status(500).json({error: 'Internal server error in addProperty'});
        }

    }
module.exports=addProperty;

/*
{
    "owner_id": "8",
    "propertyName": "myComplex",
    "location":"Koramangala",
    "propertyPrice":"20000/month",
    "propertyType":"2 bhk"
}
*/


/*{
    "email": "luka10@gmail.com",
    "password": "halamadrid"
}
*/ 