// Function to generate star rating HTML
function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    let starsHTML = '';

    // Full stars
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fa-solid fa-star"></i>';
    }

    // Half star
    if (hasHalfStar) {
        starsHTML += '<i class="fa-solid fa-star-half-stroke"></i>';
    }

    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="fa-regular fa-star"></i>';
    }

    return starsHTML;
}

// Load products from local JSON file
window.addEventListener('load', () => {
    let xhr = new XMLHttpRequest();
    xhr.onload = () => {
        if (xhr.status === 200) {
            let products = JSON.parse(xhr.responseText);
            let mainSection = document.querySelector('.main-section');
            let data = '';

            for (let product of products) {
                data += `
                <div class="product-card">
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}" loading="lazy">
                    </div>
                    <div class="product-info">
                        <div class="product-name">${product.name}</div>
                        <div class="product-rating">
                            ${generateStarRating(product.rating)}
                            <span class="rating-text">(${product.rating.toFixed(1)})</span>
                        </div>
                        <div class="product-price">$${product.price.toFixed(2)}</div>
                        <div class="product-buttons">
                            <button class="btn-add-to-cart" data-id="${product.id}"><i class="fa-solid fa-cart-plus"></i> Add to Cart</button>
                            <button class="btn-view" data-id="${product.id}" onclick="window.location.href='product-details.html?id=${product.id}'"><i class="fa-solid fa-eye"></i> View</button>
                        </div>
                    </div>
                </div>
            `;
            } // end of for loop

            mainSection.innerHTML = data;
        }
    };

    xhr.open('GET', 'https://69b309b1e224ec066bdb526a.mockapi.io/products/product');
    xhr.send();
});



//  add to cart button functionality

document.addEventListener('click', (e) => {

    const btn = e.target.closest('.btn-add-to-cart');

    if (btn) {
        const productId = btn.getAttribute('data-id');
        saveToLocalStorage(productId);
    }
});

function saveToLocalStorage(id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (!cart.includes(id)) {
        cart.push(id);
        localStorage.setItem('cart', JSON.stringify(cart));
        // Success Toast
        Swal.fire({
            title: 'Added to Cart!',
            text: 'Product successfully added to your shopping bag.',
            icon: 'success',
            toast: true,
            position: 'bottom-left',
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true,
            iconColor: '#28a745'
        });
    } else {
        // already in cart Toast
        Swal.fire({
            title: 'Already in Cart',
            text: 'This item is already in your shopping bag.',
            icon: 'info',
            toast: true,
            position: 'bottom-left',
            showConfirmButton: false,
            timer: 2000
        });
    }
}

