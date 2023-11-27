
class AccountController {
    
    // [GET] /account 
    // Hiển thị thông tin tài khoản 
    showAccount(req,res) {
        res.render('pages/account/account-detail',{
            title: 'Account-detail',
            style: '/css/account-detail.css',
            script: '/js/account-detail.js',
        });
    }
    //[GET] /login
    // Hiển thị trang đăng nhập tài khoản
    login(req, res) {
        res.render('pages/account/login',{
            title:'Login',
            style: '/css/login.css',
        })
    }
    //[GET] /signup
    //Hiển thị trang đăng ký tài khoản
    signup(req, res) {
        res.render('pages/account/signup', {
            title:'Signup',
            style:'/css/signup.css',
        })
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
        res.render('pages/account/wishlist-cart',{
            title: 'Wishlist cart',
            style: '/css/wishlist-cart.css',

        });
    }

    


}

module.exports = new AccountController;