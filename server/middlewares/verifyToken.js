const jwt=require("jsonwebtoken");
const SECRET_KEY="someStringForToken";

const verifyToken=(req,res,next)=>{
    const token = req.get('Authorization');
    try {
        if (token) {
          // Remove "Bearer " prefix if present
          const tokenValue = token.startsWith('Bearer ') ? token.slice(7) : token;
          const owner = jwt.verify(tokenValue, SECRET_KEY);
          console.log(JSON.stringify(owner)+"this is the payload");
          req.ownerId=owner.ownerId;
          
          next();
        } else {
          res.status(401).json({ message: 'Unauthorized user' });
        }
      } catch (err) {
        console.error(err);
        if (err.name === 'TokenExpiredError') {
          res.status(401).json({ message: 'Token has expired' });
        } else {
          res.status(403).json({ message: 'Invalid token' });
        }
      }

}

module.exports=verifyToken;