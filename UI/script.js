const url = "https://dummy-a521a-default-rtdb.firebaseio.com/data.json";
const itemsContainer = document.getElementById("items");const cartCount = document.getElementById("cart-count");
const totalCartValue = document.getElementById("totalCartValue");
const cartModal = document.getElementById("cart-modal");
const cartItems = document.getElementById("cart-items");


let cart = [];

function fetchItems() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      
      const items = data.items;
      itemsContainer.innerHTML = "";

      for (let key in data) {
        const item = data[key];
        const itemElement = document.createElement("div");
        itemElement.classList.add("item");
        itemElement.innerHTML = `
        <div class="card">
        <div>
          <img src="${item.image}" alt="${item.title}">
          </div>
          <div>
          <h3>${item.title}</h3>
          <p>${item.body}</p>
          <p>$${item.price}</p>
          <button id="addCart" onclick="addToCart('${key}','${item.image}','${item.price}')">Add to Cart</button>
          </div>
          </div>
        `;
        itemsContainer.appendChild(itemElement);
      }
    })
    .catch((error) => {
      console.error("Error fetching items:", error);
    });
}

function addToCart(key, image, price) {
  const existingItem = cart.find((item) => item.id === key);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    const newItem = { id: key, image: image, quantity: 1, price: price };
    cart.push(newItem);
  }
  updateCartCount();
  updateTotalPrice();
}

function updateCartCount() {
  const count = cart.reduce((total, item) => total + item.quantity, 0);

  cartCount.textContent = count;
}
function updateTotalPrice() {
  const cartValue = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  // console.log(cartValue);
  totalCartValue.innerHTML = `
  <h4>TOTAL CART VALUE : ${cartValue}</h4>`;
}

function openCartModal() {
  cartItems.innerHTML = "";
  cart.forEach((item) => {  
    const itemElement = document.createElement("div");
    const totalPrice = item.quantity * item.price;
    if(item.quantity >1){
    itemElement.innerHTML = `
    <img src=${item.image}>
      <p>Item ID: ${item.id}</p>
       <button id="decbtn" onclick="decrementQuantity('${item.id}' , this)">-</button>
        <span>${item.quantity}</span>
        <button onclick="incrementQuantity('${item.id}')">+</button>
      <p>Price:${totalPrice}</p>
      <button onclick="removeCart('${item.id}')">remove</button>
    `;
    cartItems.appendChild(itemElement);
   
  }
  if(item.quantity == 1){
    itemElement.innerHTML = `
    <img src=${item.image}>
      <p>Item ID: ${item.id}</p>
      <button id="decbtn" type="button" disabled onclick="decrementQuantity('${item.id}' , this)">-</button>
        <span>${item.quantity}</span>
        <button onclick="incrementQuantity('${item.id}')">+</button>
      <p>Price:${totalPrice}</p>
      <button onclick="removeCart('${item.id}')">remove</button>
     
    `;
    cartItems.appendChild(itemElement);
   
  }
});
  cartModal.style.display = "block";
 
}

function closeCartModal() {
  cartModal.style.display = "none";
}

function removeCart(idToRemove) {  
const existingItem = cart.find((item) => item.id === idToRemove);
Object.entries(cart).forEach(([key, value]) => {
  if (value.id === idToRemove) { 
    cart.splice(key, 1);
    updateTotalPrice();
    updateCartCount()
  }
});
openCartModal()
}

function incrementQuantity(id) {
  Object.entries(cart).forEach(([key, value]) => {
    if (value.id === id) {
      value.quantity +=1
      updateTotalPrice();
      updateCartCount()
    
  }});
  openCartModal()
  }

function decrementQuantity(id,decrementButton) {
  
Object.entries(cart).forEach(([key, value]) => {
  if (value.id === id && value.quantity>1) {
    value.quantity -=1
    updateTotalPrice();
    updateCartCount()
    openCartModal()
}
if (value.quantity === 1) {
 decrementButton.style.display = "none";
}
});
}
fetchItems();
