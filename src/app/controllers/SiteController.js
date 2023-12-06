const Category = require('../models/Category')
const Product = require('../models/Product');

class ProductController {

    //  [GET] hiển thị trang homepage
    async index(req, res, next) {
        let products;
        try {
            products = await Product.find({}).lean();
        } catch (error) {
            console.log(error);
        }
        finally {
            res.render('pages/homepage', {
                title: 'Hompage',
                style:'/css/homepage.css',
                script:'/js/homepage.js',
                isAdmin: 0,
                products: products,
                top_product: products.slice(0, 6),
                user: req.user?.toObject(),
            })
        }
    }

    //  [GET] hiện thị trang search
    async search(req,res) {
        let products = null;
        try {
            let {keyword, category, material, sort_type} = req.query;
            if(keyword instanceof Array) {
                keyword = keyword.join('|')
            }
            const query = [{
                name: { $regex: keyword ? keyword : '', $options: 'i'},
            }];
            if(category) {
                if(!category instanceof Array) {
                    category = [category];
                }
                query[0].category = { $in: category }
            }
            if(material) {
                if(!material instanceof Array) {
                    material = [material];
                }
                query[0].material = { $in: material }
            }
            query.push(null);
            if(sort_type === '1') {
                query.push({
                    sort: {
                        price: -1,
                    }
                })
            } 
            else if(sort_type === '2') {
                query.push({
                    sort: {
                        price: 1,
                    }
                })
            }
            products = await Product.find(...query).lean();
        } catch (error) {
            console.log(error);
        }
        finally{
            res.render('pages/search',{
                title: 'Search',
                style: '/css/search.css',
                user: req.user?.toObject(),
                products: products,
                script: '/js/search.js',
            });
        }
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

