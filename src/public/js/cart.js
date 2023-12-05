let cart, closeBtn, overlay, listCartHTML;
let listCart = new Map();
window.addEventListener('DOMContentLoaded', function() {
    cart = document.querySelector('.cart');
    buttonAdd = document.querySelectorAll('.component-product__btnAdd');
    listCartHTML = document.querySelector('.listCart');
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
        console.log(sku);
        if(!listCart.get(sku)) 
        {
            listCart.set(sku, 1);
        }else{
            listCart.set(sku, 1 + listCart.get(sku));
        }
        document.cookie = "listCart=" + JSON.stringify(Array.from(listCart.entries())) + "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;";
        addCartToHTML();
    }
    addCartToHTML();
});
function changeQuantity(sku, type){
    switch (type) {
        case '+':
            listCart.set(sku, listCart.get(sku) + 1);
            break;
        case '-':
            listCart.set(sku, listCart.get(sku) - 1);
            if(listCart.get(sku) <= 0){
                listCart.delete(sku);
            }
            break;
        default:
            break;
    }
    // save new data in cookie
    document.cookie = "listCart=" + JSON.stringify(Array.from(listCart.entries())) + "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;";
    // reload html view cart
    addCartToHTML();
}
function addCartToHTML(){
    let totalHTML = document.querySelector('.totalQuantity');
    let totalQuantity = 0;
    // if has product in Cart
    if(listCart){
        totalHTML.innerText = listCart.size;
    }
}

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