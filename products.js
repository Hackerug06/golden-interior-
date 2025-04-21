// Sample products data - you can replace with your actual products
const products = [
    {
        id: '1',
        name: 'Luxury Sofa Set',
        description: 'Premium leather sofa set with elegant design for your living room.',
        image: 'images/furniture1.jpg',
        category: 'living-room'
    },
    {
        id: '2',
        name: 'Dining Table Set',
        description: 'Modern 6-seater dining table with comfortable chairs.',
        image: 'images/furniture2.jpg',
        category: 'dining'
    },
    {
        id: '3',
        name: 'King Size Bed',
        description: 'Solid wood king size bed with luxurious headboard.',
        image: 'images/furniture3.jpg',
        category: 'bedroom'
    },
    {
        id: '4',
        name: 'Office Desk',
        description: 'Spacious executive desk with multiple storage compartments.',
        image: 'images/furniture4.jpg',
        category: 'office'
    },
    {
        id: '5',
        name: 'Coffee Table',
        description: 'Contemporary glass top coffee table with metal frame.',
        image: 'images/furniture5.jpg',
        category: 'living-room'
    },
    {
        id: '6',
        name: 'Bookshelf',
        description: 'Tall wooden bookshelf with 5 shelves for ample storage.',
        image: 'images/furniture6.jpg',
        category: 'living-room'
    }
];

// Load products into the page
document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.querySelector('.product-container');
    
    if (productContainer) {
        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product');
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="product-img">
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-desc">${product.description}</p>
                    <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                </div>
            `;
            
            productContainer.appendChild(productElement);
        });
    }
});
