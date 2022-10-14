let productsContainer = document.querySelector(".cards-container");
let cartProducts = document.querySelector(".cart-items .items"),
  cartDiv = document.querySelector(".cart"),
  cartItems = document.querySelector(".cart-items");
let subTotal = document.querySelector(".sub-total");
let badge = document.querySelector(".badge");

// Open Cart Button & Close
cartDiv.addEventListener("click", openCart);
window.addEventListener("keydown", (e) => {
  if (e.key == "Escape") {
    cartItems.classList.remove("open");
  }
});

function openCart() {
  if (cartItems.innerHTML != "") {
    cartItems.classList.toggle("open");
  }
}

function displayProducts() {
  let productItems = products.map((product) => {
    return `
  <div class="card-box">
        <img src="${product.img}" alt="">
        <h2>${product.title}</h2>
        <p>${product.desc}.</p>
        <div class="card-btns">
            <span>${product.price} L.E</span>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
            <i class="bi bi-heart-fill"></i>
        </div>
    </div>
  `;
  });
  productsContainer.innerHTML = productItems;
}
displayProducts();

let cart = localStorage.getItem("CartItems")
  ? JSON.parse(localStorage.getItem("CartItems"))
  : [];
updateCart();

function addToCart(id) {
  if (cart.some((item) => item.id === id)) {
    changeNumOfUnits("plus", id);
  } else {
    let item = products.find((product) => product.id === id);
    cart.push({ ...item, numberOfUnits: 1 });
    console.log(cart);
  }
  updateCart();
}

function updateCart() {
  renderCartItem();
  renderSubTotal();
  localStorage.setItem("CartItems", JSON.stringify(cart));
}

function renderSubTotal() {
  let totalPrice = 0,
    totalItems = 0;
  cart.forEach((item) => {
    totalPrice += item.price * item.numberOfUnits;
    totalItems += item.numberOfUnits;
  });
  subTotal.innerHTML = `Subtotal (${totalItems} times): ${totalPrice}L.E`;
  badge.style.display = "block";
  badge.innerHTML = totalItems;
}

function renderCartItem() {
  cartProducts.innerHTML = ""; //clear cart items
  cart.forEach((item) => {
    cartProducts.innerHTML += `
    <div class="item">
    <div class="item-info">
    <div onclick="removeItemFormCart(${item.id})" class="closeBtn">x</div>
        <img src="${item.img}" alt="${item.title}">
    </div>
    <div class="unit-price">
        ${item.price}L.E
    </div>
    <div class="units">
        <div class="btn minus" onclick="changeNumOfUnits('minus', ${item.id})">-</div>
        <div class="number">${item.numberOfUnits}</div>
        <div class="btn plus" onclick="changeNumOfUnits('plus', ${item.id})">+</div>
    </div>
    </div>
    `;
  });
}

function removeItemFormCart(id) {
  cart = cart.filter((item) => item.id !== id);
  updateCart();
}

function changeNumOfUnits(action, id) {
  cart = cart.map((item) => {
    let Num = item.numberOfUnits;
    if (item.id === id) {
      if (action === "minus" && Num > 1) {
        Num--;
      } else if (action === "plus") {
        Num++;
      }
    }
    return {
      ...item,
      numberOfUnits: Num,
    };
  });
  updateCart();
}
