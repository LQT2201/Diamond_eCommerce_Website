const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin');
const util = require('../../until/util')

const verifyAdminAccessToken = async (req) => {
  let token, decodedAdmin, admin;
    try {
      token = util.getAdminToken(req);
      if (!token) {
          return {isLogged: false, admin: null};
      }
      decodedAdmin = jwt.verify(token, process.env.adminSecretKey);
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