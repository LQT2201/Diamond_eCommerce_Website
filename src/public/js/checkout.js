addCartToHTML();
function addCartToHTML(){
    // clear data default
    let listCartHTML = document.querySelector('.items');
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
                    `<img src="${product.thumbnail[0]}" alt="">
                        <div class="item__info">
                          <div class="item__info__name"> ${product.name}</div>
                          <div class="item__info__price"> $${product.price}</div>
                        </div>
                        <div class="item__quantity">${product.quantity}</div>
                        <div class="item__returnPrice">$${product.price * product.quantity}</div>`;
                listCartHTML.appendChild(newCart);
                totalQuantity = totalQuantity + quantity;
                totalHTML.innerText = totalQuantity;
            })
        })     
    }
}
