const Cart = require('../models/Cart');
const Order = require('../models/Order')
class OrderController {
    
    //  [GET] trả lịch sử đơn hàng của tài khoản
    getOrders(req,res) {
        if(!req.user) {
            return res.status(403).send();
        }
        const orders = Order.find({
            username: req.user.username
        });
        return res.status(200).send(orders);
    }
    
    async addOrder(req, res) {
        if(!req.user) {
            return res.status(401).send();
        }
        else {
            try {
                const cart = await Cart.findOne({
                    username: req.user.username,
                })
                
                if(cart.products.length < 1) {
                    return res.status(400).send();
                }
                const order = await Order.create({
                    username: req.user.username,
                    fullname: req.body.fullName,
                    products: cart.products,
                    status: "Đang xử lý đơn hàng",
                    total_quantity: cart.total_quantity,
                    total_price: cart.total_price,
                    phone: req.body.phone,
                    address: req.body.address
                })
                
                await cart.deleteOne();
                if(!order)
                    return res.status(401).send();
                return res.status(201).send(order);
            } catch (error) {
                console.log(error);
                return res.status(403).send(error);
            }
        }
    }
    // Thực hiện xóa đơn hàng
    deleteOrder() {

    }

 
}

module.exports = new OrderController;

