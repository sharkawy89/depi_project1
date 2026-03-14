window.addEventListener('load', () => {
    let xhr = new XMLHttpRequest();
    xhr.onload = () => {
        if (xhr.status === 200) {
            let allProducts = JSON.parse(xhr.responseText);
            let cartcontent = document.getElementById('cart-content');
            const cartIds = (JSON.parse(localStorage.getItem('cart')) || []).map(id => id.toString());

            if (cartIds.length === 0) {
                cartcontent.innerHTML = `
                <div class="cart-header">
                    <h1>Shopping Cart</h1>
                    <p>0 items in cart</p>
                </div>
                <div class="cart-items-section">
                    <div class="empty-cart-message">
                    <i class="fa-solid fa-bag-shopping"></i>
                    <h2>Your cart is empty</h2>
                    <p>Add something you love to your cart, then come back here to review your order.</p>
                    <a href="index.html" class="continue-shopping-btn">Back to Shopping</a>
                    </div>
                </div>`;
                return;
            }

            let totalprice = 0;
            let productdata = '';

            for (let product of allProducts) {
                if (cartIds.includes(product.id.toString())) {
                    totalprice += parseFloat(product.price);
                    productdata += `
                <div class="cart-items-section">
                    <div class="cart-item" data-price="${product.price}" data-stock="${product.stock}">
                        <img src="${product.image}" class="cart-item-image">
                        <div class="cart-item-details">
                            <a href="index.html?id=${product.id}" class="cart-item-name">${product.name}</a>
                            <span class="cart-item-brand">${product.brand || ''}</span>
                            <span class="cart-item-price">$${parseFloat(product.price).toFixed(2)}</span>
                            <span class ="cart-item-stock">${parseInt(product.stock) > 0 ? parseInt(product.stock) : 'Out of Stock'}</span>
                        </div>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn minus-btn" onclick="updatecartquantity('${product.id}', -1, this)">-</button>
                            <input type="number" class="quantity-input" value="1" readonly>
                            <button class="quantity-btn plus-btn" onclick="updatecartquantity('${product.id}', 1, this)">+</button>
                        </div>
                        <div class="item-total-price">$${parseFloat(product.price).toFixed(2)}</div>
                        <button class="remove-btn" onclick="removeFromCart('${product.id}', this)">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                    </div>`;
                }
            }

            cartcontent.innerHTML = `
            <div class="cart-header">
                <h1>Shopping Cart</h1>
                <p>${cartIds.length} items in cart</p>
            </div>
            <div class="cart-items-section">
                <div id="cart-items" class="cart-items">${productdata}</div>
            </div>
            <div class="cart-footer">
                <div class="cart-total-section">
                    <div class="total-label">Total:</div>
                    <div class="total-amount" id="cart-total">$${parseFloat(totalprice).toFixed(2)}</div>
                </div>
                <div class="cart-actions">
                    <a href="index.html" class="continue-shopping-link">Continue Shopping</a>
                    <button class="checkout-button" onclick="window.location.href='checkout.html?id=${cartIds}'">Proceed to Checkout</button>
                </div>
            </div>`;

        }
    };
    xhr.open('GET', 'https://69b309b1e224ec066bdb526a.mockapi.io/products/product');
    xhr.send();
});

function removeFromCart(id, buttonElement) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(productId => productId.toString() !== id.toString());
    localStorage.setItem('cart', JSON.stringify(cart));

    Swal.fire({
        title: 'Removed!',
        text: 'Item has been removed from your cart.',
        icon: 'success',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        iconColor: '#d33'
    });

    // animation on removing
    const cartItem = buttonElement.closest('.cart-item');
    if (cartItem) {
        cartItem.style.opacity = '0';
        cartItem.style.transform = 'translateX(20px)';
        cartItem.style.transition = 'all 0.3s ease';


        setTimeout(() => {
            cartItem.remove();

            updateTotalAfterRemove();

            if (cart.length === 0) {
                setTimeout(() => {
                    location.reload();
                }, 1200);
            }
        }, 300);

    }

}


function updateTotalAfterRemove() {
    let newTotal = 0;
    const allPrices = document.querySelectorAll('.cart-item-price');

    allPrices.forEach(priceSpan => {
        const priceValue = parseFloat(priceSpan.innerText.replace('$', ''));
        newTotal += priceValue;
    });


    const totalAmountDisplay = document.querySelector('.total-amount');
    const itemCountDisplay = document.querySelector('.cart-header p');

    if (totalAmountDisplay) {
        totalAmountDisplay.innerText = `$${newTotal.toFixed(2)}`;
    }

    if (itemCountDisplay) {
        const currentCount = document.querySelectorAll('.cart-item').length;
        itemCountDisplay.innerText = `${currentCount} items in cart`;
    }
}








// plus and minus button functionality

function updatecartquantity(productid, change, buttonElement) {
    const cartItem = buttonElement.closest('.cart-item');
    const quantityInput = cartItem.querySelector('.quantity-input');
    const itemTotalPriceElement = cartItem.querySelector('.item-total-price');
    const pricePerItem = parseFloat(cartItem.getAttribute('data-price'));

    let currentQuantity = parseInt(quantityInput.value);

    let newQuantity = currentQuantity + change;

    if (newQuantity < 1) return;

    quantityInput.value = newQuantity;

    const newTotalPrice = pricePerItem * newQuantity;

    itemTotalPriceElement.innerText = `$${newTotalPrice.toFixed(2)}`;



    // prevent user from adding more items than stock
    const plusBtn = cartItem.querySelector('.plus-btn');
    const minusBtn = cartItem.querySelector('.minus-btn');
    const stock = parseInt(cartItem.getAttribute('data-stock'));

    plusBtn.disabled = (newQuantity >= stock);
    minusBtn.disabled = (newQuantity <= 1);


    updateCartTotal();

};


function updateCartTotal() {
    let Total = 0;
    let itemcount = 0;

    document.querySelectorAll('.cart-item').forEach(item => {
        const price = parseFloat(item.getAttribute('data-price'));
        const quantity = parseInt(item.querySelector('.quantity-input').value);
        Total += price * quantity;
        itemcount += quantity;
    });

    const totalDisplay = document.querySelector('.total-amount');
    const CountDisplay = document.querySelector('.cart-header p');

    if (totalDisplay) {
        totalDisplay.innerText = `$${Total.toFixed(2)}`;
    }

    if (CountDisplay) {
        CountDisplay.innerText = `${itemcount} items in cart`;
    }
}






