
addCartToHTML();
function addCartToHTML(){
    // clear data default
    let listCartHTML = document.querySelector('.cart__list-items');
    listCartHTML.innerHTML ='';

    let cartQuantity = document.querySelector('.cart-head__quantity');
    let orderQuantity = document.querySelector('.order__detail__quantity');
    let totalQuantityHTML = document.querySelector('.totalQuantity');
    let totalPriceHTML = document.querySelector('.totalPrice');
    let totalQuantity = 0;
    let totalPrice = 0;
    // if has product in Cart
    if(listCart){
        listCart.forEach((quantity,sku) => {
            fetch('/products/get/' + sku).then(response => response.json()).then(product =>{
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
                            <button onclick="changeQuantity(${product.sku}, '-')">-</button>
                            <span class="value">${product.quantity}</span>
                            <button onclick="changeQuantity(${product.sku}, '+')">+</button>
                        </div>
                    </div>
                    <div class="col l-3 m-3 c-5">
                        <div class="cart-item__price">
                            <span>${product.price} <small>Đ</small></span>
                        </div>
                    </div>
                    <div class="col l-1 m-1 c-1">
                        <div class="cart-item__remove">
                            <button  onclick="changeQuantity(${product.sku}, 'delete')"><img src="/image/delete.png" alt=""></button>
                        </div>
                    </div>`;
                listCartHTML.appendChild(newCart);
                totalQuantity = totalQuantity + product.quantity;
                totalPrice = totalPrice + (product.price * product.quantity);
                console.log(totalQuantity);
            })
        })
        
    }
    totalQuantityHTML.innerText = totalQuantity;
    totalPriceHTML.innerText = '$' + totalPrice;
    orderQuantity.innerText  = totalQuantity + ' sản phẩm';
    cartQuantity.innerText = totalQuantity +' sản phẩm';
}   


function changeQuantity(sku, type){
    switch (type) {
        case 'delete':
            delete listCart[sku];
            break;
        case '+':
            listCart[sku].quantity++;
            break;
        case '-':
            listCart[sku].quantity--;

            // if quantity <= 0 then remove product in cart
            if(listCart[sku].quantity <= 0){
                delete listCart[sku];
            }
            break;
    
        default:
            break;
    }
    // save new data in cookie
    document.cookie = "listCart=" + JSON.stringify(listCart) + "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;";
    // reload html view cart
    addCartToHTML();
}
