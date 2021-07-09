const jwt = require('jsonwebtoken');
const env = require("../config/environment");
const { statusCode } = require("../lib/constants");

verifyToken  = (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  
  if (!bearerHeader) {
    return res.status(statusCode.Forbidden).json({ //refuses to authorize
        message: 'No token provided' ,
        success: false,
    });
  }

  const bearerToken = bearerHeader.split(' ')[1];

  jwt.verify(bearerToken, env.jwt_secret, (err, user) => {
    if (err) {
    return res.status(statusCode.InternalServerError).json({ 
        message: 'Failed to authenticate token',
        success: false, 
    });
  }
    
    // if everything good, save to request for use in other routes
    req.userId = user._id;
    next();
  }); 
}

module.exports = verifyToken;