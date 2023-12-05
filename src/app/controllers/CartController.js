const Product = require('../models/Product');
const Cart = require('../models/Cart')

class CartController {
    
    //  [GET] hiện thị trang giỏ hàng
    async getCart(req,res) {
        if(!req.isLogged) {
            res.redirect('/login');
        }
        else{
            const parseCookie = JSON.parse(req.cookies['listCart'] || '[]');
            const listCart = [];
            let total_price = 0;
            for(const element of parseCookie) {
                const detail = {
                    product: await Product.findOne({sku: element[0]}).lean(),
                    quantity: element[1],
                }
                total_price += detail.quantity * detail.product.price;
                listCart.push(detail);
            }
            res.render('pages/cart', {
                title: 'Cart',
                style: '/css/cart.css',
                user: req.user.toObject(),
                cart: listCart,
                total_price: total_price,
            });
        }
        
    }

    // Xử lý quá trình thanh toán
    // Hiển thị trang thanh toán hoặc chuyển hướng đến cổng thanh toán
    async checkout(req,res) {
        if(!req.isLogged) {
            res.redirect('/login');
        }
        else{
            let cart;
            try {
                cart = await Cart.findOne({username: req.user.username}).lean()
            } catch (error) {
                console.log(error);
            }
            finally{
                res.render('pages/checkout', {
                    title: 'Order',
                    style: '/css/checkout.css',
                    user: req.user.toObject(),
                    cart: cart,
                });
            }
        }
    }
    
    // [POST] Xử lý thêm sản phẩm vào giỏ hàng
    async addToCart(req,res) {
        if(!req.isLogged) {
            return res.status(401).send("Unauthenticated");
        }
        else {
            try {
                const parseCookie = JSON.parse(req.cookies['listCart'] || '[]');
                if(parseCookie.length === 0)
                    return res.status(404).send("No items were found")
                await Cart.findOneAndDelete({username: req.user.username});
                let cart = await Cart.create({username: req.user.username});
                for(const element of parseCookie) {
                    const product_sku = element[0];
                    const product_quantity = element[1];
                    if(!product_sku || !product_quantity) {
                        return res.status(400).send("Missing information");
                    }
                    const product = await Product.findOne({sku: product_sku});
                    if(!product) {
                        return res.status(400).send("Product doesnt exist");
                    }
                    if(product.quantity < product_quantity) {
                        return res.status(400).send("Insufficient quantity of product.");
                    }
                    cart.products.push({
                        product: product,
                        product_quantity: product_quantity,
                    })
                    cart.total_quantity++;
                    cart.total_price+= product.price * product_quantity;
                    await cart.save();
                }
                return res.status(201).send(cart);
            } catch (error) {
                console.log(error);
                res.status(400).send(error);
            }
        }
    }
 
}

module.exports = new CartController;

