
const pickNumbers = [[16, 18, 19], [17, 15, 20], [24, 28, 22]];
const priceData = [
  { size: "Small", desc: "Margherita<br/>King Slice", price: 5 },
  { size: "Medium", desc: "Pepperoni<br/>Mozzarella", price: 10 },
  { size: "Large", desc: "Neapolitan<br/>Extra Cheese", price: 15 }
];

// Generate Pick List 
const pickListContainer = document.getElementById('pick-list');
pickNumbers.forEach(row => {
  const ul = document.createElement('ul');
  row.forEach(num => {
    const li = document.createElement('li');
    li.innerHTML = `Pick <b>${num}</b>`; ul.appendChild(li);
  });
  pickListContainer.appendChild(ul);
});

// Generate Price Cards 
const priceContainer = document.getElementById('price-cards');
priceData.forEach(({ size, desc, price }) => {
  const div = document.createElement('div');
  div.className = 'price';
  div.innerHTML = ` <h6>${size}</h6> <p>${desc}</p> <b>$${price}</b> `;
  priceContainer.appendChild(div);
});

// Generate Pick Box Label 
const pickBox = document.getElementById('pick-box');
pickBox.innerHTML = ` <p>Pick Your</p> <span>INGREDIENTS</span> `;
//////// END OF MAIN //////////

const products = [
  { name: 'bell pepper', url: './img/bell-pepper.jpg', category: 'vegetables', price: 4.99 },
  { name: 'tomato', url: './img/tomato-slices.jpg', category: 'vegetables', price: 5.99 },
  { name: 'chili pepper', url: './img/chili-pepper.jpg', category: 'vegetables', price: 2.99 },
  { name: 'olive', url: './img/olive.jpg', category: 'vegetables', price: 4.99 },
  { name: 'Extra cheese', url: './img/extra.jpg', category: 'cheese', price: 4.99 },
  { name: 'neapolitan', url: './img/neapolitan.jpg', category: 'vegetables', price: 9.99 },
  { name: 'margherita', url: './img/margherita.jpg', category: 'margherita', price: 36.99 },
  { name: 'pepperoni', url: './img/pepperoni.jpg', category: 'meat', price: 49.99 },
  { name: 'chicken', url: './img/chicken.jpg', category: 'meat', price: 6.99 },
  { name: 'sausage', url: './img/sausage.jpg', category: 'meat', price: 38.99 },
  { name: 'olive oil', url: './img/olive-pizza.jpg', category: 'oliveOil', price: 6.99 },
];

const cartBtn = document.querySelector('.pick');
const ingredientDOM = document.querySelector('.ingredients');
const closeIngredientsBtn = document.querySelector('.close-ingredients');
const cartContent = document.getElementById('cart-content');
const cartTotal = document.querySelector('.cart-total');

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(product) {
  const existing = cart.find(item => item.product.name === product.name);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ product, quantity: 1 });
  }
  saveCart();
  updateCartPopup();
}

document.getElementById('category-filter').addEventListener('change', (e) => {
  loadProducts(e.target.value);
});

function updateCartPopup() {
  cartContent.innerHTML = '';

  cart.forEach(item => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <img src="${item.product.url}" alt="${item.product.name}">
      <div>
        <h5>${item.product.name}</h5>
        <h6>$${item.product.price.toFixed(2)}</h6>
        <div>
          <button class="decrease">-</button>
          <span class="qty">${item.quantity}</span>
          <button class="increase">+</button>
        </div>
        <span class="remove-item">Remove</span>
      </div>
    `;

    div.querySelector('.remove-item').addEventListener('click', () => {
      removeFromCart(item.product.name);
    });

    div.querySelector('.increase').addEventListener('click', () => {
      item.quantity++;
      saveCart();
      updateCartPopup();
    });

    div.querySelector('.decrease').addEventListener('click', () => {
      item.quantity--;
      if (item.quantity <= 0) {
        removeFromCart(item.product.name);
      } else {
        saveCart();
        updateCartPopup();
      }
    });

    cartContent.appendChild(div);
  });

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  document.querySelector('.cart-total').textContent = `Total: $${total.toFixed(2)}`;
}

function removeFromCart(productName) {
  cart = cart.filter(item => item.product.name !== productName);
  saveCart();
  updateCartPopup();
}

function loadProducts(category = 'all') {
  const productList = document.getElementById('product-list');
  productList.innerHTML = '';

  products.filter(p => category === 'all' || p.category === category).forEach(product => {
    const el = document.createElement('div');
    el.className = 'product-card';
    el.innerHTML = `
        <img src="${product.url}" alt="${product.name}" />
        <div>
          <h4>${product.name}</h4>
          <h5>$${product.price.toFixed(2)}</h5>
          <button class="pick-btn">Pick</button>
        </div>
      `;
    el.querySelector('.pick-btn').addEventListener('click', () => {
      addToCart(product);
    });
    productList.appendChild(el);
  });
}

// Show/hide cart popup
cartBtn.addEventListener('click', () => {
  ingredientDOM.classList.add('showIngredient');
});

closeIngredientsBtn.addEventListener('click', () => {
  ingredientDOM.classList.remove('showIngredient');
});

// Initialize
loadProducts();
updateCartPopup();
//////// END OF INGREDIENTS ////////

// Show/hide LEFT SIDE
const orderBox = document.getElementById("order-box");
const leftSide = document.querySelector(".left-side");
const closeLeftSide = document.querySelector(".close-leftSide");

orderBox.addEventListener("click", () => {
  leftSide.classList.add("showLeftSide");
});

closeLeftSide.addEventListener("click", () => {
  leftSide.classList.remove("showLeftSide");
});
//////// END OF LEFT SIDE //////

const testimonials = document.querySelectorAll(".testimonial");
let index = 0;
function showTestimonial(i) {
  testimonials.forEach((t) => t.classList.remove("active"));
  testimonials[i].classList.add("active");
}
setInterval(() => {
  index = (index + 1) % testimonials.length;
  showTestimonial(index);
}, 4000);
//////// END OF FOOTER SLIDE  //////
