const Order = require('../models/Order');
class OrderController {
    
    //  [GET] hiện thị lịch sử đơn hàng
    getOrder(req,res) {
        if(!req.user) {
            res.redirect('/login');
        }
        const orders = Order.find({username: req.user.username}).lean();
        res.render('pages/account/orders', {
            title: 'Orders',
            style: '/css/orders.css',
            isAmin: 0,
            orders: orders,
        });
    }
    async addOrder(req, res) {
        if(!req.isLogged) {
            return res.redirect('/login');
        }
        const reqOrder = req.body.order;
        if(!reqOrder) {
            return res.status(401).send('Order not found');
        }
        if(reqOrder.username !== req.user.username) {
            return res.status(401).send("Username not matched");
        }
        try {
            const order = await Order.create({
                username: reqOrder.username,
                products: reqOrder.products,
                total_quantity: reqOrder.total_quantity,
                total_price: reqOrder.total_price,
                address: reqOrder.address,
                status: reqOrder.status,
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

