const jwt = require('jsonwebtoken')
const User = require('../models/User')

const secretKey = "c83c121ed9634881eb16d9df31714b63b2d07d0bd00d9859949b35ed46d15d8a";
const expiresIn = 7 * 3600 * 24;

class Authentication {
  checkCookie(req) {
    return req.cookies['jwt']
  }
  async verifyToken(req, res, next) {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        token = req.headers.authorization.split(' ')[1]
    }
    else {
        token = req.headers["x-access-token"] || checkCookie(req) || null;
    }
    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decodedUser = jwt.verify(token, secretKey);
        const user = await User.findOne({
            username: decodedUser.username,
        });
        if(!user){
            return res.status(401).send("Authorization error");
        }
        let isValid = false;
        for(userToken in user.tokens) {
          if(userToken === token) {
            isValid = true;
            break;
          }
        }
        if(user.username != decodedUser.username || !isValid){
            return res.status(401).send("Invalid Token");
        }
        req.user = decodedUser;
    } catch (err) {
        console.log(err);
        return res.status(401).send("Invalid Token");
    }
    next();
  }
}