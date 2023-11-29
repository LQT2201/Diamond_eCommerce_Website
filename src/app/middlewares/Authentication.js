const jwt = require('jsonwebtoken')
const User = require('../models/User');
const util = require('../../until/token')
const secretKey = "c83c121ed9634881eb16d9df31714b63b2d07d0bd00d9859949b35ed46d15d8a";
const expiresIn = 7 * 3600 * 24;



const verifyAccessToken = async (req) => {
  let token, decodedUser, user;
    try {
      token = util.getToken(req);
      if (!token) {
          return {isLogged: false, user: null};
      }
      decodedUser = jwt.verify(token, secretKey);
      user = await User.findOne({
          username: decodedUser.username,
          tokens: {$in: [token]}
      });
      if(!user){
          return {isLogged: false, user: null};
      }
      if(user.username != decodedUser.username){
          return {isLogged: false, user: null};
      }
    } catch (err) {
        if(err.name == "TokenExpiredError") {
          await User.findOneAndUpdate(
            { username : jwt.decode(token).username },
            { $pull: { tokens: token } },
            { safe: true }
          );
          return {isLogged: false, user: null};
        }
        return {isLogged: false, user: null};
    }
  return {isLogged: true, user: user};
}
class Authentication {
  
  async verifyToken(req, res, next) {
    const {isLogged, user} = await verifyAccessToken(req);
    if(req.url === '/login' || req.url === '/register') {
      if(!isLogged) {
        next();
      }
      else {
        res.redirect('/account');
      }
    }
    else {
      if(isLogged){
        req.user = user;
        next();
      }
      else {
        res.redirect('/login');
      }
    }
  }
}

module.exports = new Authentication;