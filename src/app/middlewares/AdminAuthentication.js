const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin');
const util = require('../../until/util')
const adminSecretKey = "b6d5ddf1cde676bb2290a30f0dec482fd3346022623a3a917bab058b95d766c9";
const domainOrigin = 'localhost:3000';
const verifyAdminAccessToken = async (req) => {
  let token, decodedAdmin, admin;
    try {
      token = util.getAdminToken(req);
      if (!token) {
          return {isLogged: false, admin: null};
      }
      decodedAdmin = jwt.verify(token, adminSecretKey);
      admin = await Admin.findOne({
          username: decodedAdmin.username,
          token: token,
      });
      if(!admin){
          return {isLogged: false, admin: null};
      }
    } catch (err) {
        return {isLogged: false, admin: null};
    }
  return {isLogged: true, admin: admin};
}
class AdminAuthentication {
  async isAuth(req, res, next) {
    const {isLogged, admin} = await verifyAdminAccessToken(req);
    req.admin = admin || null;
    req.isLogged = isLogged;
    next();
  }
  async checkOrigin(req, res, next) {
    let reqOrigin = req.headers.host;
    console.log(req.ip);
    if(reqOrigin != domainOrigin) {
      return res.status(403);
    }
    next();
  }
}
module.exports = new AdminAuthentication;