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
                if(!cart) {
                    return res.status(400).send("No items were found");
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
                res.cookie("listCart", '', { 
                    maxAge: 1,
                    httpOnly: true,
                });
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
    // Thực hiện hủy đơn hàng
    async cancelOrder(req, res) {
        if(!req.user) {
            res.redirect('/login');
        }
        else {
            try {
                const order = await Order.findOne({username: req.user.username});
                if(order.status === "Đang xử lý đơn hàng") {
                    order.status = "Đã hủy";
                    await order.save();
                }
                else {
                    return res.status(401).send("Order is delivering, cannot cancel");
                }
                return res.status(200).send("Cancel order successful");
            } catch (error) {
                return res.status(401).send(error);
            }
        }
    }

 
}

module.exports = new OrderController;

