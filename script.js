// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const cartIcon = document.querySelector('.cart-icon');
const cartOverlay = document.querySelector('.cart-overlay');
const closeCart = document.querySelector('.close-cart');
const cartContent = document.querySelector('.cart-content');
const cartTotalItems = document.querySelector('.total-items');
const cartCount = document.querySelector('.cart-count');
const checkoutBtn = document.querySelector('.checkout-btn');

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Cart Toggle
cartIcon.addEventListener('click', () => {
    cartOverlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
});

closeCart.addEventListener('click', () => {
    cartOverlay.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Cart Functionality
let cart = [];

// Add to Cart
function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({...product, quantity: 1});
    }
    
    updateCart();
}

// Remove from Cart
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

// Update Quantity
function updateQuantity(id, newQuantity) {
    const item = cart.find(item => item.id === id);
    
    if (item) {
        if (newQuantity < 1) {
            removeFromCart(id);
        } else {
            item.quantity = newQuantity;
        }
    }
    
    updateCart();
}

// Update Cart UI
function updateCart() {
    cartContent.innerHTML = '';
    
    if (cart.length === 0) {
        cartContent.innerHTML = '<p>Your cart is empty</p>';
        cartCount.textContent = '0';
        cartTotalItems.textContent = '0';
        return;
    }
    
    let totalItems = 0;
    
    cart.forEach(item => {
        totalItems += item.quantity;
        
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-info">
                <h4 class="cart-item-title">${item.name}</h4>
                <span class="cart-item-remove" data-id="${item.id}">Remove</span>
                <div class="cart-item-amount">
                    <button class="decrease" data-id="${item.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="increase" data-id="${item.id}">+</button>
                </div>
            </div>
        `;
        
        cartContent.appendChild(cartItem);
    });
    
    cartCount.textContent = totalItems;
    cartTotalItems.textContent = totalItems;
    
    // Add event listeners to remove and quantity buttons
    document.querySelectorAll('.cart-item-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
            removeFromCart(e.target.dataset.id);
        });
    });
    
    document.querySelectorAll('.decrease').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const item = cart.find(item => item.id === e.target.dataset.id);
            if (item) {
                updateQuantity(item.id, item.quantity - 1);
            }
        });
    });
    
    document.querySelectorAll('.increase').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const item = cart.find(item => item.id === e.target.dataset.id);
            if (item) {
                updateQuantity(item.id, item.quantity + 1);
            }
        });
    });
}

// Checkout Functionality
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const phoneNumber = '+25681245888';
    let message = 'Hello Golden Interior, I would like to order the following items:\n\n';
    
    cart.forEach(item => {
        message += `- ${item.name} (Quantity: ${item.quantity})\n`;
    });
    
    message += '\nPlease let me know the total amount and payment details. Thank you!';
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
});

// Load Products and Add Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Products are loaded from products.js
    
    // Add event listeners to all "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = e.target.dataset.id;
            const product = products.find(p => p.id === productId);
            
            if (product) {
                addToCart(product);
                
                // Show cart overlay when adding first item
                if (cart.length === 1) {
                    cartOverlay.style.display = 'flex';
                    document.body.style.overflow = 'hidden';
                }
            }
        });
    });
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});
