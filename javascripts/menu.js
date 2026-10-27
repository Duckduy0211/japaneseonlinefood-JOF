const menuProducts = [
  { id: 1, name: "Sushi Cá Hồi", category: "sushi", price: 120000, desc: "Cá hồi tươi nguyên bản trên nắm cơm trộn giấm Nhật.", image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=600&auto=format&fit=crop", tag: "Bán chạy" },
  { id: 2, name: "Sashimi Tổng Hợp", category: "sushi", price: 250000, desc: "Tuyển tập sashimi cá hồi, cá ngừ và hàu biển tươi mát.", image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=600&auto=format&fit=crop", tag: "Mới" },
  { id: 3, name: "Ramen Tonkotsu", category: "ramen", price: 95000, desc: "Nước dùng xương hầm đậm đà cùng xá xíu mềm tan.", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=600&auto=format&fit=crop", tag: "Bán chạy" },
  { id: 4, name: "Cơm Bò Gyudon", category: "rice", price: 85000, desc: "Thịt bò Mỹ xào hành tây sốt dashi ngọt thanh ăn kèm cơm nóng.", image: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?q=80&w=600&auto=format&fit=crop", tag: "" },
  { id: 5, name: "Bento Gà Teriyaki", category: "bento", price: 110000, desc: "Hộp bento đầy đủ gà sốt teriyaki, salad và trứng cuộn.", image: "https://images.unsplash.com/photo-1607301459266-4f33fb76b92f?q=80&w=600&auto=format&fit=crop", tag: "Bán chạy" },
  { id: 6, name: "Tempura Tôm Chiên Giòn", category: "tempura", price: 90000, desc: "Tôm sú tươi tẩm bột chiên kiểu Tempura giòn rụm.", image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=600&auto=format&fit=crop", tag: "" }
];

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("menu-product-grid");
  const searchInput = document.getElementById("search-input");
  const categoryFilter = document.getElementById("category-filter");
  const sortFilter = document.getElementById("sort-filter");

  if (!grid) return;

  function renderProducts(list) {
    if (list.length === 0) {
      grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; padding: 2rem; color: #666;">Không tìm thấy món ăn phù hợp.</p>`;
      return;
    }
    grid.innerHTML = list.map(item => `
      <div class="card">
        <img src="${item.image}" alt="${item.name}">
        <div class="card-body">
          <h3 class="card-title">${item.name}</h3>
          <p class="card-desc">${item.desc}</p>
          <div class="card-footer">
            <span class="price">${item.price.toLocaleString()} đ</span>
            <button class="btn-cta" onclick="addToCart(${item.id})">Thêm</button>
          </div>
        </div>
      </div>
    `).join("");
  }

  function filterAndSort() {
    let result = [...menuProducts];
    const kw = searchInput ? searchInput.value.toLowerCase() : "";
    const cat = categoryFilter ? categoryFilter.value : "all";
    const sort = sortFilter ? sortFilter.value : "default";

    if (kw) result = result.filter(p => p.name.toLowerCase().includes(kw));
    if (cat !== "all") result = result.filter(p => p.category === cat);
    if (sort === "asc") result.sort((a,b) => a.price - b.price);
    if (sort === "desc") result.sort((a,b) => b.price - a.price);

    renderProducts(result);
  }

  if (searchInput) searchInput.addEventListener("input", filterAndSort);
  if (categoryFilter) categoryFilter.addEventListener("change", filterAndSort);
  if (sortFilter) sortFilter.addEventListener("change", filterAndSort);

  renderProducts(menuProducts);
});

function addToCart(id) {
  const item = menuProducts.find(p => p.id === id);
  if (!item) return;
  let cart = JSON.parse(localStorage.getItem("sakura_cart")) || [];
  const idx = cart.findIndex(c => c.id === id);
  if (idx > -1) cart[idx].quantity += 1;
  else cart.push({ ...item, quantity: 1 });
  localStorage.setItem("sakura_cart", JSON.stringify(cart));
  if (typeof updateCartBadge === "function") updateCartBadge();
  showToast(`Đã thêm ${item.name} vào giỏ hàng!`);
}