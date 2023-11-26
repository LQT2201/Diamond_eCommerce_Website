
class AccountController {
    
    // [GET] /account 
    // Hiện thị thông tin tài khoản 
    showAccount(req,res) {
        res.render('pages/account/account-detail',{
            title: 'Account-detail',
            style: '/css/account-detail.css',
            script: '/js/account-detail.js',
        });
    }


    // [GET] /orders-history 
    // Hiện thị lịch sử đơn hàng 
    showOrders(req,res) {
        res.render('pages/account/orders-history',{
            title: 'Order history',
            style: '/css/orders-history.css',
            
        });
    }

    // [GET] /wishlist
    // Hiện thị thông tin wishlist
    showWishlist(req,res) {
        res.render('pages/account/wishlist-cart');
    }

    


}

module.exports = new AccountController;