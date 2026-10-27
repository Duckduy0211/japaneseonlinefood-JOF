const menuProducts = [
  { id: 1, name: "Sushi Cá Hồi", category: "sushi", price: 120000, desc: "Cá hồi tươi nguyên bản trên nắm cơm trộn giấm Nhật.", image: "../images/sushi_salmon.jpg", tag: "Bán chạy" },
  { id: 2, name: "Sashimi Tổng Hợp", category: "sushi", price: 250000, desc: "Tuyển tập sashimi cá hồi, cá ngừ và hàu biển tươi mát.", image: "../images/sashimi_assortment.jpg", tag: "Mới" },
  { id: 3, name: "Ramen Tonkotsu", category: "ramen", price: 95000, desc: "Nước dùng xương hầm đậm đà cùng xá xíu mềm tan.", image: "../images/ramen_tonkotsu.jpg", tag: "Bán chạy" },
  { id: 4, name: "Cơm Bò Gyudon", category: "rice", price: 85000, desc: "Thịt bò Mỹ xào hành tây sốt dashi ngọt thanh ăn kèm cơm nóng.", image: "../images/gyudon_beef.jpg", tag: "" },
  { id: 5, name: "Bento Gà Teriyaki", category: "bento", price: 110000, desc: "Hộp bento đầy đủ gà sốt teriyaki, salad và trứng cuộn.", image: "../images/bento_chicken.jpg", tag: "Bán chạy" },
  { id: 6, name: "Tempura Tôm Chiên Giòn", category: "tempura", price: 90000, desc: "Tôm sú tươi tẩm bột chiên kiểu Tempura giòn rụm.", image: "../images/tempura_shrimp.jpg", tag: "" },
  { id: 7, name: "Mì Udon Tempura", category: "ramen", price: 105000, desc: "Sợi mì udon dai giòn cùng tôm, mực tươi ngon đậm vị biển.", image: "../images/udon_tempura.jpg", tag: "Mới" },
  { id: 8, name: "Miso Ramen", category: "ramen", price: 95000, desc: "Nước dùng miso đậm đà quyện cùng thịt cá hồi thơm lừng.", image: "../images/miso_ramen.jpg", tag: "" },
  { id: 9, name: "Bento Lươn Nhật (Unagi)", category: "bento", price: 140000, desc: "Lươn biển nướng sốt Kabayaki đậm đà trên lớp cơm nắm.", image: "../images/unagi_bento.jpg", tag: "Bán chạy" },
  { id: 10, name: "Bento Heo Chiên Xù (Tonkatsu)", category: "bento", price: 100000, desc: "Thịt heo cốt lết tẩm bột chiên xù giòn rụm ăn kèm cơm dẻo.", image: "../images/tonkastu_bento.jpg", tag: "" },
  { id: 11, name: "Bánh xèo Nhật Bản (Okonomiyaki)", category: "snack", price: 120000, desc: "Bánh xèo Nhật Bản với bột mì, trứng, bắp cải và hải sản tươi ngon.", image: "../images/okonomiyaki.jpg", tag: "Mới" },
  { id: 12, name: "Mochi Trà Xanh", category: "dessert", price: 60000, desc: "Bánh mochi mềm dẻo với hương trà xanh thơm ngon.", image: "../images/mochi_matcha.jpg", tag: "Mới" },
  { id: 13, name: "Dorayaki Nhân Đậu Đỏ", category: "dessert", price: 50000, desc: "Bánh dorayaki mềm mịn với nhân đậu đỏ ngọt thanh.", image: "../images/dorayaki.jpg", tag: "Mới" },
  { id: 14, name: "Gyoza Nhật Bản", category: "snack", price: 65000, desc: "Bánh xếp Nhật Bản với lớp vỏ vàng nhẹ và nhân đậm đà.", image: "../images/gyoza.jpg", tag: "Mới" },
  { id: 15, name: "Yakisoba", category: "ramen", price: 85000, desc: "Mì xào kiểu Nhật đậm vị, dùng kèm rau củ tươi.", image: "../images/yakisoba.jpg", tag: "Mới" },
  { id: 16, name: "Takoyaki", category: "snack", price: 40000, desc: "Bánh bạch tuộc nướng kiểu Nhật, thơm ngon vừa ăn.", image: "../images/takoyaki.jpg", tag: "Bán chạy" },
  { id: 17, name: "Oyakodon", category: "rice", price: 95000, desc: "Cơm gà và trứng kiểu Nhật với nước sốt dashi.", image: "../images/oyakodon.jpg", tag: "Mới" },
  { id: 18, name: "Mochi Truyền Thống", category: "dessert", price: 55000, desc: "Bánh mochi mềm dẻo, món tráng miệng truyền thống Nhật Bản.", image: "../images/mochi.jpg", tag: "Mới" },
  { id: 19, name: "Trà Xanh Matcha Latte", category: "drink", price: 45000, desc: "Hương vị matcha Uji nguyên chất hòa quyện cùng sữa tươi.", image: "../images/matcha_latte.jpg", tag: "Đồ uống" },
  { id: 20, name: "Trà Genmaicha", category: "drink", price: 180000, desc: "Genmaicha là sự kết hợp giữa trà xanh và gạo lứt rang thơm nức.", image: "../images/genmaicha.jpg", tag: "Đồ uống" }
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
        <img src="${item.image}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/300x180?text=Sakura+Food'">
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

  // Hiển thị toàn bộ hoặc giới hạn 6 món nổi bật nếu ở trang chủ
  if (grid.id === "home-product-grid") {
    renderProducts(menuProducts.slice(0, 6));
  } else {
    renderProducts(menuProducts);
  }
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