let cart = [];
function addItemToCart(itemName, itemPrice) {
    const existingItem = cart.find(item => item.name === itemName);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name: itemName, price: itemPrice, quantity: 1 });
    }
    updateCartUI();
}

function removeItemFromCart(itemName) {
    cart = cart.filter(item => item.name !== itemName); // Remove item from the cart array
    updateCartUI();
}

function updateCartUI() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartHeader = document.querySelector('.cart-header');
    cartItemsContainer.innerHTML = '';
    cartItemsContainer.appendChild(cartHeader);

    let totalPrice = 0;
    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <div class="item-number">${index + 1}. </div>
            <div class="item-name">${item.name}</div>
            <div class="item-price">Rs ${item.price.toFixed(2)}</div>
            <div class="item-quantity">
                <button class="quantity-decrease" data-name="${item.name}">-</button>
                <input type="number" value="${item.quantity}" min="1" readonly>
                <button class="quantity-increase" data-name="${item.name}">+</button>
            </div>
            <button class="remove-item" data-name="${item.name}">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);
        totalPrice += item.price * item.quantity;
    });

    document.getElementById('total-price').innerText = totalPrice.toFixed(2);

    // Add event listeners for the remove buttons
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', (event) => {
            const itemName = event.target.getAttribute('data-name');
            removeItemFromCart(itemName);
        });
    });

    // Add event listeners for the increase/decrease buttons
    document.querySelectorAll('.quantity-increase').forEach(button => {
        button.addEventListener('click', (event) => {
            const itemName = event.target.getAttribute('data-name');
            changeQuantity(itemName, 1);
        });
    });

    document.querySelectorAll('.quantity-decrease').forEach(button => {
        button.addEventListener('click', (event) => {
            const itemName = event.target.getAttribute('data-name');
            changeQuantity(itemName, -1);
        });
    });
}

function changeQuantity(itemName, change) {
    const item = cart.find(item => item.name === itemName);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeItemFromCart(itemName);
        }
    }
    updateCartUI();
}

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (event) => {
        const product = event.target.closest('.product');
        const itemName = product.getAttribute('data-name');
        const itemPrice = parseFloat(product.getAttribute('data-price'));
        addItemToCart(itemName, itemPrice);
    });
});