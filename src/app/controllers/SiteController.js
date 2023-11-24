
class ProductController {
    
    //  [GET] hiển thị trang homepage
    index(req,res) {
        res.render('pages/homepage', {
            title: 'HomePage',
            style: '/css/homepage.css',
        });
    }

    //  [GET] hiện thị trang search
    search(req,res) {
        res.render('pages/search',{
            title: 'Search',
            style: '/css/search.css',
        });
    }

    //  [GET] hiển thị trang about us
    about(req,res) {
        res.render('pages/about-us',{
            title: 'AboutUs',
            style: '/css/about-us.css',
        });
    }
 
}

module.exports = new ProductController;

