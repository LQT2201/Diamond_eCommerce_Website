
class OrderController {
    
    //  [GET] hiện thị lịch sử đơn hàng
    getOrder(req,res) {
        res.render('pages/account/orders', {
            title: 'Đơn hàng',
            style: '/css/orders.css',
            isAmin: 0,
        });
    }
    
    // CÁC XỬ LÍ TRANG ADMIN

    // Thực hiện xóa đơn hàng
    deleteOrder() {

    }

 
}

module.exports = new OrderController;

