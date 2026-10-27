document.addEventListener("DOMContentLoaded", () => {
  renderCartPage();
  const applyBtn = document.getElementById("apply-promo-btn");
  if (applyBtn) applyBtn.addEventListener("click", applyPromoCode);

  const form = document.getElementById("checkout-form");
  if (form) form.addEventListener("submit", handleCheckout);
});

function renderCartPage() {
  const container = document.getElementById("cart-items-container");
  if (!container) return;
  let cart = JSON.parse(localStorage.getItem("sakura_cart")) || [];

  if (cart.length === 0) {
    container.innerHTML = `<p style="text-align: center; padding: 2rem; color: #666;">Giỏ hàng của bạn đang trống.</p>`;
    updateTotals(0,0,0);
    return;
  }

  container.innerHTML = cart.map(item => `
    <div style="display: flex; align-items: center; justify-content: space-between; padding: 1rem 0; border-bottom: 1px solid #E0DCD0;">
      <div style="display: flex; align-items: center; gap: 1rem;">
        <img src="${item.image}" alt="${item.name}" style="width: 70px; height: 70px; object-fit: cover; border-radius: 6px;">
        <div>
          <h4 style="font-size: 1rem; font-weight: 600;">${item.name}</h4>
          <p style="color: #C62828; font-weight: 600; font-size: 0.9rem;">${item.price.toLocaleString()} đ</p>
        </div>
      </div>
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <button onclick="changeQty(${item.id}, -1)" style="padding: 2px 8px; cursor: pointer;">-</button>
        <span>${item.quantity}</span>
        <button onclick="changeQty(${item.id}, 1)" style="padding: 2px 8px; cursor: pointer;">+</button>
        <button onclick="removeItem(${item.id})" style="background: none; border: none; color: #C62828; cursor: pointer; margin-left: 10px;">Xóa</button>
      </div>
    </div>
  `).join("");
  calculateTotals();
}

function changeQty(id, delta) {
  let cart = JSON.parse(localStorage.getItem("sakura_cart")) || [];
  const idx = cart.findIndex(item => item.id === id);
  if (idx > -1) {
    cart[idx].quantity += delta;
    if (cart[idx].quantity <= 0) cart.splice(idx, 1);
  }
  localStorage.setItem("sakura_cart", JSON.stringify(cart));
  renderCartPage();
  if (typeof updateCartBadge === "function") updateCartBadge();
}

function removeItem(id) {
  let cart = JSON.parse(localStorage.getItem("sakura_cart")) || [];
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem("sakura_cart", JSON.stringify(cart));
  renderCartPage();
  if (typeof updateCartBadge === "function") updateCartBadge();
}

let discountPercent = 0;
function applyPromoCode() {
  const input = document.getElementById("promo-code-input");
  const msg = document.getElementById("promo-msg");
  if (!input) return;
  const code = input.value.trim().toUpperCase();
  if (code === "SAKURA10") {
    discountPercent = 10;
    msg.style.color = "green";
    msg.textContent = "Áp dụng mã giảm 10% thành công!";
  } else {
    discountPercent = 0;
    msg.style.color = "red";
    msg.textContent = "Mã giảm giá không hợp lệ.";
  }
  calculateTotals();
}

function calculateTotals() {
  let cart = JSON.parse(localStorage.getItem("sakura_cart")) || [];
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const ship = subtotal > 0 ? 25000 : 0;
  const discount = (subtotal * discountPercent) / 100;
  const total = subtotal + ship - discount;

  document.getElementById("subtotal-price").textContent = subtotal.toLocaleString() + " đ";
  document.getElementById("shipping-fee").textContent = ship.toLocaleString() + " đ";
  document.getElementById("discount-amount").textContent = "-" + discount.toLocaleString() + " đ";
  document.getElementById("final-total").textContent = total.toLocaleString() + " đ";
}

function handleCheckout(e) {
  e.preventDefault();
  let cart = JSON.parse(localStorage.getItem("sakura_cart")) || [];
  if (cart.length === 0) { alert("Giỏ hàng trống!"); return; }
  const name = document.getElementById("fullname").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;
  if (!name || !phone || !address) { alert("Vui lòng điền đủ thông tin giao hàng!"); return; }
  alert(`Cảm ơn bạn ${name}! Đơn hàng của bạn đã được đặt thành công.`);
  localStorage.removeItem("sakura_cart");
  window.location.href = "index.html";
}