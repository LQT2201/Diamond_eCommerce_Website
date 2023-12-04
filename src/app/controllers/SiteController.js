const Product = require('../models/Product');


class ProductController {

    //  [GET] hiển thị trang homepage
    index(req,res,next) {
        Product.find({})
            .then(product => {
                product = product.map(product => product.toObject())
                res.render('pages/homepage',{
                    title:'Homepage',
                    style: '/css/homepage.css',
                    isAdmin: 0,
                    product,
                    user: req.user?.toObject(),
                })
            })

    }

    
    async index(req,res,next) {
        const products = await Product.find({}).lean();
        res.render('pages/homepage',{
            title:'Homepage',
            style: '/css/homepage.css',
            isAdmin: 0,
            product: products,
            jsonProduct: JSON.stringify(products),
            user: req.user?.toObject(),
            script: '/js/homepage.js',
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

