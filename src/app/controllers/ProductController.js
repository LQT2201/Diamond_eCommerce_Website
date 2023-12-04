const Product = require('../models/Product')
const Category = require('../models/Category')
const util = require('../../until/util')
class ProductController {
    
    //  [GET]  chi tiết sản phẩm product-detail
    async showProduct(req,res) {
        const product = await Product.findOne({
            slug: req.params.slug,
        }).lean();
        if(!product) {
            res.render('pages/product-not-found', {
                title: 'Product not found',
                style: '/css/product-notfound.css',
                slug: req.params.slug,
                user: req.user?.toObject(),
            })
        }
        else{
            res.render('pages/product-detail', {
                title: 'Product detail',
                style: '/css/product-detail.css',
                isAdmin: 0,
                product: product,
                jsonProduct: JSON.stringify(product),
                user: req.user?.toObject(),
            });
        }
    }
    
    // CÁC XỬ LÍ TRANG ADMIN

    // Hiển thị màn hình thêm sản phẩm
    adminShowProduct(req,res) {
        res.render('admin/admin-product',{
            style: '/css/admin-product.css',
            isAdmin: 1,
        });
    }

    // Hiển thị màn hình thêm sản phẩm
    showAddForm(req,res) {

    }

    // Thực hiện thêm sản phẩm 
    async addProduct(req, res) {
        try {
            const {
                name,
                sku,
                brand,
                category,
                material,
                origin,
                description,
                price,
                thumbnail,
                quantity,
            } = req.body;
            const slug = util.slugify(name + sku);
            const url = '/products/${slug}';
            let product = Product.findOne({
                sku: sku,
            });
            if(product) {
                return res.status(400).send("Product already exists!");
            }
            product = await Product.create({
                name: name + sku,
                sku: sku,
                brand: brand,
                category: category,
                material: material,
                origin: origin,
                description: description,
                price: price,
                thumbnail: thumbnail,
                quantity: quantity,
                slug: slug,
                url: url,
            });
            if(!product) {
                return res.status(400).send("Product create failed. Please try again");
            }
            await Category.findOneAndUpdate(
                { name: product.category },
                { upsert: true, new: true },
                { $push: { products: product } },
            );
            return res.status(201).send(product);
        } catch (error) {
            console.log(error);
            return res.status(409).send(error);
        }
    }

    // Hiện thị màn hình sửa sản phẩm
    showEditForm() {

    }

    // Thực hiện sửa sản phẩm
    editProduct() {
    
    }

    // Thực hiện xóa sản phẩm
    deleteProduct() {

    }
}

module.exports = new ProductController;

