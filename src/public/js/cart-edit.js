let listCartHTML;
formatCurrency = (price) => {
    return Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};
window.addEventListener('DOMContentLoaded', async function() {
    await addCartToHTML();
})
async function addCartToHTML(){
    // clear data default
    listCartHTML = document.querySelector('.cart__list-items');
    listCartHTML.innerHTML ='';
    let totalQuantityHTML = document.querySelector('.order__detail__quantity');
    let totalPriceHTML = document.querySelector('.totalPrice');
    let totalQuantity = 0;
    let totalPrice = 0;
    // if has product in Cart
    if(listCart){
        for(const e of listCart) {
            const sku = e[0], quantity = e[1];
            const response = await fetch('/products/get/' + sku);
            if(response.ok) {
                const product = await response.json();
                let newCart = document.createElement('div');
                newCart.classList.add('row','cart-item');
                newCart.innerHTML = 
                    `<div class="col l-2 m-2 c-12">
                    <div class="cart-item__image">
                        <img src="${product.thumbnail[0]}" alt="">
                    </div>
                    </div>
                    <div class="col l-3 m-3 c-12">
                        <div class="cart-item__detail">
                            <span>${product.name}</span>
                        </div>
                    </div>
                    <div class="col l-3 m-3 c-6">
                        <div class="cart-item__quantity">
                            <button onclick="changeQuantity('${product.sku}', '-')">-</button>
                            <span class="value">${quantity}</span>
                            <button onclick="changeQuantity('${product.sku}', '+')">+</button>
                        </div>
                    </div>
                    <div class="col l-3 m-3 c-5">
                        <div class="cart-item__price">
                            <span>${formatCurrency(product.price)} <small>Đ</small></span>
                        </div>
                    </div>
                    <div class="col l-1 m-1 c-1">
                        <div class="cart-item__remove">
                            <button  onclick="changeQuantity('${product.sku}', 'delete')"><img src="/image/delete.png" alt=""></button>
                        </div>
                    </div>`;
                listCartHTML.appendChild(newCart);
                totalQuantity++;
                totalPrice = totalPrice + (product.price * quantity);
            }
        }
        totalPriceHTML.innerHTML = `<h2>${formatCurrency(totalPrice)}</h2>`;
        totalQuantityHTML.innerText = 'Số loại sản phẩm: ' + String(totalQuantity);
    }
    
}   


function changeQuantity(sku, type){
    if(type ==='delete') {
        listCart.delete(sku);
    }
    else if(type ==='+') {
        listCart.set(sku, listCart.get(sku) + 1);
    }
    else if(type ==='-') {
        listCart.set(sku, listCart.get(sku) - 1);
        if(listCart.get(sku) <= 0){
            listCart.delete(sku);
        }
    }
    // save new data in cookie
    document.cookie = "listCart=" + JSON.stringify(Array.from(listCart.entries())) + "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;";
    // reload html view cart
    addCartToHTML();
}
