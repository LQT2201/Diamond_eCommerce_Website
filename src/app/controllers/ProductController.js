
class ProductController {
    
    index(req,res) {
        res.render('pages/homepage');
    }
}

module.exports = new ProductController;

