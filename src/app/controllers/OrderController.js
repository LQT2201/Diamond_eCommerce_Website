const Order = require('../models/Order');
const Product = require('../models/Product');
class OrderController {
    
    //  [GET] hiện thị lịch sử đơn hàng
    getOrder(req,res) {
        if(!req.user) {
            res.redirect('/login');
        }
        const orders = Order.find({username: req.user.username}).lean();
        res.render('pages/account/orders', {
            title: 'Đơn hàng',
            style: '/css/orders.css',
            isAmin: 0,
            orders: orders,
        });
    }
    async addOrder(req, res) {
        if(!req.isLogged) {
            return res.redirect('/login');
        }
        const reqOrder = req.body;
        if(!reqOrder) {
            return res.status(401).send('Order not found');
        }
        const reqProducts = reqOrder.products;
        if(!reqProducts || reqProducts.length === 0){
            return res.status(401).send("Product not found");
        }
        try {
            const products = [];
            let total_quantity = 0, total_price = 0;
            let product;
            
            for(const {sku, quantity} of reqProducts) {
                product = await Product.findOne({sku: sku});
                if(product.quantity < quantity) {
                    return res.status(401).send("Insufficient quantity of product");
                }
                product.quantity -= quantity;
                await product.save();
                total_quantity++;
                total_price += product.price * quantity;
                products.push({
                    product: product,
                    product_quantity: quantity, 
                })
            }
            if(products.length === 0)
                return res.status(401).send("Product not found");
            const order = await Order.create({
                username: req.username,
                products: products,
                total_quantity: total_quantity,
                total_price: total_price,
                address: reqOrder.address,
                phone: reqOrder.phone,
                status: "Đang xử lý đơn hàng",
            });    
            return res.status(201).send('Order create successful');
        } catch (error) {
            return res.status(401).send(error);
        }
        
    }
    // CÁC XỬ LÍ TRANG ADMIN
    async updateOrder(req, res) {
        if(!req.admin) {
            return res.status(403).send();
        }
        const reqOrder = req.body.order;
        try {
            const order = await Order.findOne({
                username: reqOrder.username,
            });
            if(!order) {
                return res.status(401).send("Order not found");
            }            
            order.status = reqOrder.status;
            await order.save();
        } catch (error) {
            return res.status(401).send(error);
        }

    }
    // Thực hiện xóa đơn hàng
    deleteOrder() {

    }

 
}

module.exports = new OrderController;

