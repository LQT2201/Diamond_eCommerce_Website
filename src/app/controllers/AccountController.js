const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const secretKey = "c83c121ed9634881eb16d9df31714b63b2d07d0bd00d9859949b35ed46d15d8a";
const expiresIn = 7 * 3600 * 24 * 1000;
const util = require('../../until/util');
const Order = require('../models/Order');
class AccountController {
    // [GET] /account 
    // Hiển thị thông tin tài khoản 
    showAccount(req,res) {
        if(!req.user)
            res.redirect('/login');
        else
        res.render('pages/account/account-detail',{
            title: 'Thông tin tài khoản',
            style: '/css/account-detail.css',
            script: '/js/account-detail.js',
            user: req.user.toObject(),
        });
    }
    //[GET] /login
    // Hiển thị trang đăng nhập tài khoản
    showLogin(req, res) {
        if(req.user)
            res.redirect('/account');
        else
        res.render('pages/account/login',{
            title:'Đăng nhập',
            style: '/css/login.css',
            script: '/js/account-login.js',
        })
    }
    //[GET] /register
    //Hiển thị trang đăng ký tài khoản
    showRegister(req, res) {
        if(req.user)
            res.redirect('/account');
        else
        res.render('pages/account/register', {
            title:'Đăng ký',
            style:'/css/register.css',
            script: '/js/account-register.js',
            isAdmin: 0,
        })
    }
    // [GET] /orders-history 
    // Hiện thị lịch sử đơn hàng 
    showOrders(req,res) {
        if(!req.user)
            res.redirect('/login');
        else{
            const orders = Order.find({username: req.user.username}).lean();
            res.render('pages/account/orders-history',{
                title: 'Order history',
                style: '/css/orders-history.css',
                isAdmin: 0,
                user: req.user.toObject(),
                orders: orders,
            });
        }
    }

    // [GET] /wishlist
    // Hiện thị thông tin wishlist
    showWishlist(req,res) {
        if(!req.user){
            res.redirect('/login');
        }
        else{
            res.render('pages/account/wishlist-cart',{
                title: 'Wishlist cart',
                style: '/css/wishlist-cart.css',
                isAdmin: 0,
                user: req.user.toObject(),
            });
        }
    }
    async register(req, res) {
        try {
            const { username, password, fullname } = req.body;
            const phone = req.body.phone || null;
            if(!username || !password || !fullname) {
                return res.status(400).send("Missing information");
            }
            let user = await User.findOne({ username: username });
            if(user) {
                return res.status(400).send("Username already taken!")
            } else {
                let token = jwt.sign({ username }, secretKey, {
                    expiresIn: expiresIn,
                });
                user = await User.create({
                    username: username,
                    password: await bcrypt.hash(password, 10),
                    fullname: fullname,
                    phone: phone,
                });
                user.tokens.push(token);
                await user.save();
                if(!user) {
                    return res.status(409).send("Register failed. Please try again!");
                }
                res.cookie("jwt", token, { 
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
    async login(req, res) {
        try {
            const { username, password } = req.body;
            if(!username || !password) {
                return res.status(400).send("Missing username or password");
            }
            const user = await User.findOne({ username: username });
            if(!user) {
                return res.status(401).send("Wrong username or password");
            }
            const isValid = await bcrypt.compare(password, user.password); 
            if(!isValid){
                return res.status(401).send("Wrong username or password");
            }
            let token = jwt.sign({ username }, secretKey, {
                expiresIn: expiresIn,
            });
            user.tokens.push(token);
            await user.save();
            res.cookie("jwt", token, { 
                maxAge: expiresIn,
                httpOnly: true,
            });
            return res.status(201).send(token);
        } catch (error) {
            console.log(error);
            res.status(401).send(error);
        }
    }
    async logout(req, res) {
        try{
            const token = util.getToken(req);
            const user = jwt.verify(token, secretKey);
            await User.findOneAndUpdate(
                { username :  user.username},
                { $pull: { tokens: token } },
                { safe: true }
            );
            return res.redirect('/');
        }
        catch(err){
            console.log(err);
            return res.redirect('/');
        }
    }
    async changeInformation(req, res) {
        if(!req.user)
            return res.redirect('/login');
        try {
            console.log(req.body);
            const user = await User.findOne({
                username: req.user.username,
                tokens: {$in: [util.getToken(req)]}
            });
            if(!user)
                return res.status(401).send(error);
            user.fullname = req.body.fullname ? req.body.fullname : user.fullname;
            user.phone = req.body.phone ? req.body.phone : user.phone;
            user.address = req.body.address ? req.body.address : user.address;
            if(req.body.fixpass === '1' && req.body.pass && req.body.repass) {
                if(!req.body.pass === req.body.repass)
                    return res.status(401).send("New password are not matched");
                const isValid = await bcrypt.compare(req.body.oldpass, user.password);
                console.log(isValid);
                if(!isValid)
                    return res.status(401).send('Wrong current password');
                user.password = await bcrypt.hash(req.body.pass, 10);
                const username = user.username;
                let token = jwt.sign({username}, secretKey, {
                    expiresIn: expiresIn,
                });
                await user.updateOne(
                    { tokens: [token] },
                )
                res.cookie("jwt", token, { 
                    maxAge: expiresIn,
                    httpOnly: true,
                });
            }
            await user.save();
            return res.status(200).send('Change user information success.');
        } catch (error) {
            console.log(error);
            return res.status(401).send(error);
        }
    }
}

module.exports = new AccountController;