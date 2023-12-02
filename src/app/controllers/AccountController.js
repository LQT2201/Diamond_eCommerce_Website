const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const secretKey = "c83c121ed9634881eb16d9df31714b63b2d07d0bd00d9859949b35ed46d15d8a";
const expiresIn = 7 * 3600 * 24 * 1000;
const util = require('../../until/util')

class AccountController {
    // [GET] /account 
    // Hiển thị thông tin tài khoản 
    showAccount(req,res) {
        if(!req.user)
            res.redirect('/login');
        else
        res.render('pages/account/account-detail',{
            title: 'Account-detail',
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
            title:'Login',
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
            title:'Register',
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
        res.render('pages/account/orders-history',{
            title: 'Order history',
            style: '/css/orders-history.css',
            isAdmin: 0,
            user: req.user.toObject(),
        });
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
}

module.exports = new AccountController;