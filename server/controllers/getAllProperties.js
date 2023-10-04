const database=require('../database_config')

const getAllProperties=async (req,res)=>{
    try {
        // Write the query to fetch all properties
        const fetchQuery = 'SELECT * FROM properties';
    
        const properties = await new Promise((resolve, reject) => {
          database.query(fetchQuery, (err, rows) => {
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
        //res.json("test successful");
    
        res.json(properties);
      } catch (err) {
        console.error('Error fetching properties:', err);
        return res.status(500).json({ error: 'Internal server error in getAllProperty' });
      }
}
module.exports=getAllProperties;