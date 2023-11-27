
class AuthController {
    // Hiện thị trang đăng kí
    showRegisterForm(req,res) {
        res.render('pages/auth/register',{
            tite:'hhghkkh',
            style:'/css/register.css',
        })
    }

    //Xử lí chứ năng đăng kí
    register(req,res) {

    }

    //Xử lí chứ năng đăng kí
    register(req,res) {

    }

    // Hiện thị form đăng nhập
    showLoginForm(req,res) {
        res.render('pages/auth/login')
    }

    // Xử lí chức năng đăng nhập
    login(req,res) {
        
    }
}

module.exports = new AuthController;