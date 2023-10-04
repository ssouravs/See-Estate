const database=require('../database_config')
const deleteProperty = async (req, res) => {
    const ownerID = req.ownerId;
    const propertyID = req.params.id;

    const deleteQuery = "DELETE FROM properties WHERE property_id=?";
    try {
       
        const result = await new Promise((resolve, reject) => {
            database.query(deleteQuery, ownerID, (err) => {
              if (err) {
                reject(err);
              } else {
                // Extract relevant data from the rows                
                resolve("Property deleted");
              }
            });
          });
    
        res.json(result);
    } catch (error) {
        console.error('Error deleting property:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
module.exports=deleteProperty;