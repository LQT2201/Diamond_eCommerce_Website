const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Order = require('../models/Order')
const Product = require('../models/Product')
const User = require('../models/User');
class AdminController {
  showAdmin(req,res) {
    if(!req.admin)
        res.redirect('/admin/login');
    else
    res.render('admin/admin-dashboard',{
        title: 'Admin detail',
        isAdmin: 1,
        style: '/css/admin-view.css',
        admin: req.admin?.toObject(),
    });
  }
  showAdminLogin(req, res) {
    if(req.admin)
        res.redirect('/pages/account/login');
    else
    res.render('admin/admin-login',{
      title:'Login',
      isAdmin: 1,
      style: '/css/login.css',
      script: '/js/admin-login.js',
    });
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
      let token = jwt.sign({ username }, process.env.adminSecretKey, {
          expiresIn: process.env.expiresIn,
      });
      admin.token = token;
      await admin.save();
      res.cookie("jwt-admin", token, { 
          maxAge: process.env.expiresIn,
          httpOnly: true,
      });
      return res.status(201).send(token);
    } catch (error) {
        console.log(error);
        res.status(401).send(error);
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
          let token = jwt.sign({ username }, process.env.adminSecretKey, {
              expiresIn: process.env.expiresIn,
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
              maxAge: process.env.expiresIn,
              httpOnly: true,
          });
          return res.status(200).send(token);
      }
    } catch (error) {
        console.log(error);
        res.status(409).send(error);
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
  async showUsers(req, res) {
    if(!req.admin) {
        res.redirect('/admin/login');
    }
    else{
        const users = await User.find({}).lean();
        res.render('admin/admin-account',{
            title: 'Admin orders',
            style: '/css/admin_content_order.css',
            isAdmin: 1,
            admin: req.admin.toObject(),
            users: users,
        });
    }
  }
  async showProducts(req, res) {
    if(!req.admin) {
        res.redirect('/admin/login');
    }
    else{
        const products = await Product.find({}).lean();
        res.render('admin/admin-product',{
            title: 'Admin products',
            style: '/css/admin-product.css',
            isAdmin: 1,
            admin: req.admin.toObject(),
            products: products,
        });
    }
  }
}

module.exports = new AdminController;