const Test1 = require('../models/Colection1');
const Product = require('../models/Product');


class ProductController {


    //  [GET] hiển thị trang homepage
    async index(req, res, next) {
        let products = await Product.find({}).lean();
        res.render('pages/homepage', {
            title: 'Hompage',
            style:'/css/homepage.css',
            isAdmin: 0,
            products: products || null,
            user: req.user?.toObject(),
        })
    }

    //  [GET] hiện thị trang search
    search(req,res) {
        res.render('pages/search',{
            title: 'Search',
            style: '/css/search.css',
            isAdmin: 0,
            user: req.user?.toObject(),
        });
    }

    //  [GET] hiển thị trang about us
    about(req,res) {
        res.render('pages/about-us',{
            title: 'About Us',
            style: '/css/about-us.css',
            isAdmin: 0,
            user: req.user?.toObject(),
        });
    }

}

module.exports = new ProductController;

