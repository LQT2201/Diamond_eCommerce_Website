
class ProductController {
    
    //  [GET]  chi tiết sản phẩm product-detail
    getProductDetail(req,res) {
        res.render('pages/product-detail', {
            title: 'Product-detail',
            style: '/css/product-detail.css',
            isAdmin: 0,
        });
    }
    
    // CÁC XỬ LÍ TRANG ADMIN

    // Hiển thị màn hình thêm sản phẩm
    showProduct(req,res) {
        res.render('admin/admin-product',{
            style: '/css/admin-product.css',
            isAdmin: 0,
        });
    }

    // Hiển thị màn hình thêm sản phẩm
    showAddForm(req,res) {

    }

    // Thực hiện thêm sản phẩm 
    addProduct() {

    }

    // Hiện thị màn hình sửa sản phẩm
    showEditForm() {

    }

    // Thực hiện sửa sản phẩm
    editProduct() {
    
    }

    // Thực hiện xóa sản phẩm
    deleteProduct() {

    }

}

module.exports = new ProductController;

