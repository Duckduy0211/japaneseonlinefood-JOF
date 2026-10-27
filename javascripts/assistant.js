document.addEventListener("DOMContentLoaded", () => {
  const fab = document.createElement("button");
  fab.className = "ai-fab";
  fab.innerHTML = `<i class="fa-solid fa-robot"></i>`;
  document.body.appendChild(fab);

  const chatBox = document.createElement("div");
  chatBox.className = "ai-chat-box";
  chatBox.innerHTML = `
    <div class="ai-chat-header">
      <span>Trợ lý ảo Sakura AI</span>
      <button id="close-ai" style="background:none; border:none; color:white; font-size:1.2rem; cursor:pointer;"><i class="fa-solid fa-xmark"></i></button>
    </div>
    <div class="ai-chat-body" id="ai-messages">
      <div class="ai-msg bot">Konnichiwa! Tôi là trợ lý ảo Sakura. Bạn cần tư vấn về thực đơn 12 món chuẩn Nhật hay mã giảm giá hôm nay không?</div>
    </div>
    <div class="ai-chat-footer">
      <input type="text" id="ai-input" placeholder="Nhập câu hỏi...">
      <button id="ai-send"><i class="fa-solid fa-paper-plane"></i></button>
    </div>
  `;
  document.body.appendChild(chatBox);

  const toggleChat = () => {
    chatBox.style.display = chatBox.style.display === "flex" ? "none" : "flex";
  };
  fab.addEventListener("click", toggleChat);
  document.getElementById("close-ai").addEventListener("click", toggleChat);

  const sendMsg = () => {
    const input = document.getElementById("ai-input");
    const container = document.getElementById("ai-messages");
    const text = input.value.trim();
    if (!text) return;

    container.innerHTML += `<div class="ai-msg user">${text}</div>`;
    input.value = "";
    container.scrollTop = container.scrollHeight;

    setTimeout(() => {
      let reply = "Xin lỗi, tôi chưa hiểu rõ ý bạn. Bạn có thể hỏi về sushi, ramen, đồ uống hoặc mã giảm giá SAKURA10 nhé!";
      const lower = text.toLowerCase();
      if (lower.includes("món") || lower.includes("ngون") || lower.includes("gợi ý") || lower.includes("ăn gì")) {
        reply = "Tôi gợi ý bạn thử **Sushi Cá Hồi**, **Ramen Tonkotsu** đậm đà hoặc nhâm nhi ly **Matcha Latte** thanh mát nhé!";
      } else if (lower.includes("mã") || lower.includes("giảm giá") || lower.includes("km") || lower.includes("khuyến mãi")) {
        reply = "Bạn hãy nhập mã **SAKURA10** tại trang giỏ hàng để được giảm ngay 10% cho tổng đơn hàng!";
      } else if (lower.includes("địa chỉ") || lower.includes("ở đâu") || lower.includes("liên hệ")) {
        reply = "Nhà hàng Sakura tọa lạc tại 123 Đường Lê Văn Việt, TP. Thủ Đức, TP.HCM. Hân hạnh phục vụ quý khách!";
      } else if (lower.includes("chào") || lower.includes("hi") || lower.includes("hello")) {
        reply = "Konnichiwa! Chúc bạn chọn được món ăn Nhật Bản thật ưng ý hôm nay.";
      }

      container.innerHTML += `<div class="ai-msg bot">${reply}</div>`;
      container.scrollTop = container.scrollHeight;
    }, 600);
  };

  document.getElementById("ai-send").addEventListener("click", sendMsg);
  document.getElementById("ai-input").addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMsg();
  });
});