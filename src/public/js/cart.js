let iconCart = document.querySelector('.iconCart');
let cart = document.querySelector('.cart');
let close = document.querySelector('.close');
let overlay = document.querySelector('.cart__overlay')

iconCart.addEventListener('click', function(){
    if(cart.style.right == '-100%'){
        cart.style.right = '0';
        overlay.style.display = 'block';

        
    }else{
        overlay.style.display = 'none';
        cart.style.right = '-100%';
        
    }
})
close.addEventListener('click', function (){
    cart.style.right = '-100%';
    overlay.style.display = 'none';

})

let listCart = new Map();
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
        //If this product is already in the cart.
        //I just increased the quantity
        listCart.set(sku, 1 + listCart.get(sku));
    }
    
    document.cookie = "listCart=" + JSON.stringify(Array.from(listCart.entries())) + "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;";

    addCartToHTML();
}

addCartToHTML();
function addCartToHTML(){
    // clear data default
    let listCartHTML = document.querySelector('.listCart');
    listCartHTML.innerHTML = '';

    let totalHTML = document.querySelector('.totalQuantity');
    let totalQuantity = 0;
    // if has product in Cart
    if(listCart){
        listCart.forEach((quantity,sku) => {
            fetch('/products/get/' + sku).then(response => response.json()).then(product =>{
                let newCart = document.createElement('div');
                newCart.classList.add('item');
                newCart.innerHTML = 
                    `<img src="${product.thumbnail[0]}">
                    <div class="content">
                        <div class="name">${product.name}</div>
                        <div class="price">$${product.price} / 1 product</div>
                    </div>
                    <div class="quantity">
                        <button onclick="changeQuantity('${product.sku}', '-')">-</button>
                        <span class="value">${quantity}</span>
                        <button onclick="changeQuantity('${product.sku}', '+')">+</button>
                    </div>`;
                listCartHTML.appendChild(newCart);
                totalQuantity = totalQuantity + quantity;
                totalHTML.innerText = totalQuantity;
            })
        })
        
    }
    
}

function changeQuantity(sku, type){
    switch (type) {
        case '+':
            console.log(sku);
            listCart.set(sku, listCart.get(sku) + 1);
            break;
        case '-':
            listCart.set(sku, listCart.get(sku) - 1);
            // if quantity <= 0 then remove product in cart
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