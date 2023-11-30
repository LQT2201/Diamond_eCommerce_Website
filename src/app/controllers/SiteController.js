const Test1 = require('../models/Colection1');
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


        // Test1.find({})
        //     .then(test1 => {
        //         test1 = test1.map(test1 => test1.toObject())
        //         res.render('',{test1})
        //     })
                // .catch(next);

        // res.render('pages/homepage', {
        //     title: 'HomePage',
        //     style: '/css/homepage.css',
        //     isAdmin: true,
        // });
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

