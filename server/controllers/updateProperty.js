const database  = require('../database_config');

const updateProperty = async (req, res) => {
  try {
    const propertyId = req.params.id;
    const { propertyName, location, propertyPrice, propertyType } = req.body;
    // ownerId from authentication
    //const ownerID = req.ownerId; 

    if (!propertyName || !location || !propertyPrice || !propertyType) {
      return res.status(400).json({ error: 'Missing required fields' });
    }


    // Update the property details in the database
    const updateQuery = 'UPDATE properties SET propertyName = ?, location = ?, propertyPrice = ?, propertyType = ? WHERE property_id = ?';
    const values = [propertyName, location, propertyPrice, propertyType, propertyId];

    const result=await new Promise((resolve, reject) => {
      database.query(updateQuery, values, (err) => {
        if (err) {
          reject(err);
        } else {
          // Extract relevant data from the rows                
          resolve(values);
        }
      });
    });
    res.json({ message: 'Property updated successfully with value: '+result});
  } catch (err) {
    console.error('Error updating the property:', err);
    return res.status(500).json({ error: 'Internal server error in updateProperty' });
  }
};

module.exports = updateProperty ;
