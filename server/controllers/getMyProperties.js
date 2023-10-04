const database=require('../database_config');
const getMyProperties=async (req,res)=>{
    try{
        const owner_ID=req.ownerId;


        //Write the query for which every property of owner to be fetched
        const fetchQuery='SELECT * FROM properties WHERE owner_id=?';
        //const myProperties=await database.query(fetchQuery,[owner_ID]);
        const properties = await new Promise((resolve, reject) => {
            database.query(fetchQuery, owner_ID, (err, rows) => {
              if (err) {
                reject(err);
              } else {
                // Extract relevant data from the rows
                const propertiesData = rows.map((row) => ({
                  propertyId: row.propertyId,
                  propertyName: row.propertyName,
                  location: row.location,
                  propertyPrice: row.propertyPrice,
                  propertyType: row.propertyType,
                  // Add more fields as needed
                }));
                resolve(propertiesData);
              }
            });
          });
    
        res.json(properties);
        
        //console.log(myProperties);
        
        // Convert the result to plain objects to remove circular references
        //const plainProperties = JSON.parse(JSON.stringify(myProperties));
    
        //res.status(200).json(myProperties);
    }catch(err){
        console.error('Error fetching properties:', err);
        return res.status(500).json({ error: 'Internal server error in getMyProperties' });
    }
}
module.exports=getMyProperties;