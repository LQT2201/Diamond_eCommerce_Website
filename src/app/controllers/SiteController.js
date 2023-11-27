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
                    isAdmin: 1,
                    product,
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
            isAdmin:1,
        });
    }

    //  [GET] hiển thị trang about us
    about(req,res) {
        res.render('pages/about-us',{
            title: 'AboutUs',
            style: '/css/about-us.css',
            isAdmin: 1,
        });
    }

}

module.exports = new ProductController;

