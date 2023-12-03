
class CartController {
    
    //  [GET] hiện thị trang giỏ hàng
    getCart(req,res) {
        res.render('pages/cart', {
            title: 'Cart',
            style: '/css/cart.css',
            isAdmin: 0,
        });
    }

    // Xử lý quá trình thanh toán
    // Hiển thị trang thanh toán hoặc chuyển hướng đến cổng thanh toán
    checkout(req,res) {
        res.render('pages/checkout', {
            title: 'Order',
            style: '/css/checkout.css',
            isAdmin: 0,
        });
    }
    
    // [POST] Xử lý thêm sản phẩm vào giỏ hàng
    addToCart(req,res) {
        // res.redirect('');
    }

    // [POST]  Xử lý loại bỏ sản phẩm khỏi giỏ hàng
    removeFromCart(req,res) {
        // res.redirect('');
    }

 
}

module.exports = new CartController;

