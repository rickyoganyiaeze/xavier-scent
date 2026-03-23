// js/main.js

// 1. Product Data (Simulated Database)
const products = [
    {
        id: 1,
        name: "Yara Perfume",
        price: "21,800",
        image: "/perf1.jpeg",
        description: "A rich, woody fragrance blending rare oud with hints of amber and smoke. Perfect for evening wear."
    },
    {
        id: 2,
        name: "Dove",
        price: 35000,
        image: "/perf5.jpeg",
        description: "A romantic bouquet of fresh roses with subtle notes of vanilla and musk. Elegant and timeless."
    },
    {
        id: 3,
        name: "Dove Soap",
        price: 12000,
        image: "/soap1.jpeg",
        description: "An energizing burst of lemon and bergamot. Ideal for the modern man or woman on the go."
    },
    {
        id: 4,
        name: "Royal Musk",
        price: 55000,
        image: "perf3.jpeg",
        description: "A sophisticated blend of traditional musk and jasmine. Long-lasting and commanding."
    },
    {
        id: 5,
        name: "Red Diamond",
        price: 12000,
        image: "/perf6.jpeg",
        description: "Fresh aquatic notes inspired by the deep blue sea. Clean, crisp, and refreshing."
    },
    {
        id: 6,
        name: "Storm",
        price: "15,500",
        image: "/perf8.jpeg",
        description: "Warm, resinous amber notes mixed with sandalwood. A cozy fragrance for cool nights."

    },
     {
        id: 7,
        name: "Storm",
        price: "9000",
        image: "/perf11.jpeg",
        description: "Warm, resinous amber notes mixed with sandalwood. A cozy fragrance for cool nights."

    },
      {
        id: 8,
        name: "Riggs",
        price: 11000,
        image: "/perf10.jpeg",
        description: "Fresh aquatic notes inspired by the deep blue sea. Clean, crisp, and refreshing."
    },
];

// 2. Configuration
const WHATSAPP_NUMBER = "2349019370262"; // Replace with your actual number (Country code + Number, no plus sign)

// 3. DOM Elements & Logic
document.addEventListener('DOMContentLoaded', () => {
    
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Render Featured Products (Homepage)
    const featuredGrid = document.getElementById('featured-products');
    if (featuredGrid) {
        renderProducts(products.slice(0, 4), featuredGrid);
    }

    // Render All Products (Shop Page)
    const shopGrid = document.getElementById('shop-products');
    if (shopGrid) {
        renderProducts(products, shopGrid);
    }

    // Render Product Detail (Detail Page)
    const detailContainer = document.getElementById('product-detail-content');
    if (detailContainer) {
        renderProductDetail(detailContainer);
    }
});

// Helper: Render Product Cards
function renderProducts(productList, container) {
    container.innerHTML = productList.map(product => `
        <div class="product-card">
            <div class="product-image">
                <a href="product-detail.html?id=${product.id}">
                    <img src="${product.image}" alt="${product.name}">
                </a>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <span class="price">₦${product.price.toLocaleString()}</span>
                <button onclick="handleBuyNow('${product.name}', ${product.price})" class="btn btn-whatsapp">
                    <i class="fab fa-whatsapp"></i> Buy Now
                </button>
            </div>
        </div>
    `).join('');
}

// Helper: Render Single Product Detail
function renderProductDetail(container) {
    // Get ID from URL
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const product = products.find(p => p.id == id);

    if (product) {
        document.title = `${product.name} | Xavier Scent`;
        container.innerHTML = `
            <div class="detail-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="detail-content">
                <h1>${product.name}</h1>
                <span class="price">₦${product.price.toLocaleString()}</span>
                <p>${product.description}</p>
                
                <div class="quantity-selector">
                    <label for="qty">Quantity:</label>
                    <input type="number" id="qty" value="1" min="1">
                </div>

                <button onclick="handleBuyNowDetail('${product.name}', ${product.price})" class="btn btn-whatsapp">
                    <i class="fab fa-whatsapp"></i> Order via WhatsApp
                </button>
            </div>
        `;
    } else {
        container.innerHTML = `<p class="container">Product not found. <a href="products.html">Back to Shop</a></p>`;
    }
}

// Logic: Handle Buy Now (From Grid)
function handleBuyNow(name, price) {
    const message = `Hello, I want to buy 1 ${name} for ₦${price.toLocaleString()}.`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Logic: Handle Buy Now (From Detail Page with Quantity)
function handleBuyNowDetail(name, price) {
    const qtyInput = document.getElementById('qty').value;
    const total = price * qtyInput;
    const message = `Hello, I want to buy ${qtyInput} unit(s) of ${name}. Total: ₦${total.toLocaleString()}.`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}