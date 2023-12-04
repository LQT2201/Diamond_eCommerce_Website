const Category = require('../models/Category')
const Product = require('../models/Product');

class ProductController {

    //  [GET] hiển thị trang homepage
    async index(req, res, next) {
        let products = await Product.find({}).lean();
        res.render('pages/homepage', {
            title: 'Trang chủ',
            style:'/css/homepage.css',
            script:'/js/homepage.js',
            isAdmin: 0,
            product: products,
            jsonProduct:JSON.stringify(products) ,
            user: req.user?.toObject(),
        })
    }

    //  [GET] hiện thị trang search
    async search(req,res) {
        let products = null;
        try {
            let {keyword, category, material, sort_type, price_from, price_to} = req.query;
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
            if(price_from && price_to) {
                price_from = parseInt(price_from);
                price_to = parseInt(price_to);
                query[0].price = {$gte: price_from, $lte: price_to};
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
            //console.log(products)
        } catch (error) {
            console.log(error);
        }
        finally{
            res.render('pages/search',{
                title: 'Tìm kiếm',
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
            title: 'Về chúng tôi',
            style: '/css/about-us.css',
            isAdmin: 0,
            user: req.user?.toObject(),
        });
    }

}

module.exports = new ProductController;

