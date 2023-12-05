let cart, closeBtn, overlay;
let listCart = new Map();
window.addEventListener('DOMContentLoaded', function() {
    cart = document.querySelector('.cart');
    buttonAdd = document.querySelectorAll('.component-product__btnAdd');
    buttonAdd.forEach(btn => {
        btn.addEventListener('click', function(e) {
            addCart(e.target.id);
        })
    })
    function checkCart(){
        var cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('listCart='));
        if(cookieValue){
            const parseCookie = JSON.parse(cookieValue.split('=')[1]);
            if(parseCookie.length > 0 )
                listCart = new Map(parseCookie);
        }else{
            listCart = new Map();
        }
    }
    checkCart();
    function addCart(sku){
        alert("Thêm thành công vào giỏ hàng");
        sku = String(sku);
        console.log(sku);
        if(!listCart.get(sku)) 
        {
            listCart.set(sku, 1);
        }else{
            listCart.set(sku, 1 + listCart.get(sku));
        }
        document.cookie = "listCart=" + JSON.stringify(Array.from(listCart.entries())) + "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;";
    }
});

async function checkout() {
    try {
        const response = await fetch('/cart/add', {
            method: 'POST',
        });
        if(response.status == 201) {
            window.location.href = '/cart/checkout';
        }
        else {
            alert(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}