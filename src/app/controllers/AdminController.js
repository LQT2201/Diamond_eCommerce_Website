const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const adminSecretKey = "b6d5ddf1cde676bb2290a30f0dec482fd3346022623a3a917bab058b95d766c9";
const expiresIn = 7 * 3600 * 24 * 1000;
const util = require('../../until/util');
const Order = require('../models/Order');
const Product = require('../models/Product')
const User = require('../models/User');
class AdminController {
  showAdmin(req,res) {
    if(!req.admin)
        res.redirect('/admin/login');
    else
    res.render('admin/admin-account',{
        title: 'Trang quản lí',
        isAdmin: 1,
        admin: req.admin?.toObject(),
    });
  }
  showAdminLogin(req, res) {
    if(req.admin) {
        res.redirect('/admin')
    }
    else{
        res.render('admin/admin-login',{
            title:'Login',
            isAdmin: 1,
            style: '/css/login.css',
            script: '/js/admin-login.js',
          });
    }
    
  }
  async login(req, res) {
    try {
      const { username, password } = req.body;
      if(!username || !password) {
          return res.status(400).send("Missing username or password");
      }
      const admin = await Admin.findOne({ username: username });
      if(!admin) {
          return res.status(401).send("Wrong username or password");
      }
      const isValid = await bcrypt.compare(password, admin.password); 
      if(!isValid){
          return res.status(401).send("Wrong username or password");
      }
      let token = jwt.sign({ username }, adminSecretKey, {
          expiresIn: expiresIn,
      });
      admin.token = token;
      await admin.save();
      res.cookie("jwt-admin", token, { 
          maxAge: expiresIn,
          httpOnly: true,
      });
      return res.status(201).send(token);
    } catch (error) {
        console.log(error);
        res.status(401).send(error);
    }
  }
  async showUsers(req, res) {
    if(!req.admin) {
        res.redirect('/admin/login');
    }
    else {
        const users = await User.find({}).lean();
        res.render('admin/admin-user', {
            title: 'User management',
            style: '/css/admin',
            isAdmin: 1,
            admin: req.admin.toObject(),
            users: users,
        });
    }
  }
  async showOrders(req, res) {
    if(!req.admin) {
        res.redirect('/admin/login');
    }
    else{
        const orders = await Order.find({}).lean();
        res.render('admin/admin-order',{
            title: 'Admin orders',
            style: '/css/admin_content_order.css',
            isAdmin: 1,
            admin: req.admin.toObject(),
            orders: orders,
        });
    }
  }
  async showProducts(req, res) {
    if(!req.admin) {
        res.redirect('/admin/login');
    }
    else{
        const products = await Product.find({}).lean();
        console.log(products);
        res.render('admin/admin-product',{
            title: 'Admin products',
            style: '/css/admin_content_product.css',
            isAdmin: 1,
            admin: req.admin.toObject(),
            products: products,
        });
    }
  }
  async logout(req, res) {

  }
  async register(req, res) {
    try {
      const { username, password } = req.body;
      if(!username || !password) {
          return res.status(400).send("Missing information");
      }
      let admin = await Admin.findOne({ username: username });
      if(admin) {
          return res.status(400).send("Username already taken!")
      } else {
          let token = jwt.sign({ username }, adminSecretKey, {
              expiresIn: expiresIn,
          });
          admin = await Admin.create({
              username: username,
              password: await bcrypt.hash(password, 10),
              token: token,
          });
          await admin.save();
          if(!admin) {
              return res.status(409).send("Register failed. Please try again!");
          }
          res.cookie("jwt-admin", token, { 
              maxAge: expiresIn,
              httpOnly: true,
          });
          return res.status(200).send(token);
      }
    } catch (error) {
        console.log(error);
        res.status(409).send(error);
    }
  }
}

module.exports = new AdminController;