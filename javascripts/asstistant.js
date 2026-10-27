document.addEventListener("DOMContentLoaded", () => {
  // Tạo khung widget trợ lý ảo tự động gắn vào trang
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
      <div class="ai-msg bot">Konnichiwa! Tôi là trợ lý ảo Sakura. Tôi có thể giúp gì cho bạn về thực đơn, mã giảm giá hay tư vấn món ăn hôm nay?</div>
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

    // Tin nhắn người dùng
    container.innerHTML += `<div class="ai-msg user">${text}</div>`;
    input.value = "";
    container.scrollTop = container.scrollHeight;

    // AI Phản hồi tự động thông minh
    setTimeout(() => {
      let reply = "Xin lỗi, tôi chưa hiểu rõ ý bạn. Bạn có thể hỏi về thực đơn sushi, ramen, mã giảm giá SAKURA10 hoặc thời gian mở cửa nhé!";
      const lower = text.toLowerCase();
      if (lower.includes("món") || lower.includes("ngon") || lower.includes("gợi ý")) {
        reply = "Tôi gợi ý bạn thử **Sushi Cá Hồi** tươi ngon hoặc **Ramen Tonkotsu** đậm đà chuẩn vị Nhật Bản đang rất được yêu thích!";
      } else if (lower.includes("mã") || lower.includes("giảm giá") || lower.includes("km") || lower.includes("khuyến mãi")) {
        reply = "Bạn có thể sử dụng mã **SAKURA10** để được giảm ngay 10% cho đơn hàng đầu tiên nhé!";
      } else if (lower.includes("địa chỉ") || lower.includes("ở đâu") || lower.includes("liên hệ")) {
        reply = "Nhà hàng Sakura tọa lạc tại trung tâm TP.HCM. Bạn có thể xem chi tiết tại trang **Liên hệ** hoặc gọi hotline 0909 xxx xxx.";
      } else if (lower.includes("chào") || lower.includes("hi") || lower.includes("hello")) {
        reply = "Konnichiwa! Chúc bạn một ngày ngon miệng cùng Sakura Japanese Food.";
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