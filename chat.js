const chat = document.getElementById("chat");
const form = document.getElementById("inputForm");
const input = document.getElementById("userInput");

function appendMessage(text, className) {
  const div = document.createElement("div");
  div.textContent = text;
  div.className = "message " + className;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const userText = input.value.trim();
  if (!userText) return;

  appendMessage(userText, "user");
  input.value = "";

  try {
    const response = await fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userText }),
    });

    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json();

    appendMessage(data.reply, "bot");
  } catch (error) {
    appendMessage("Error: Could not get response from AI.", "bot");
    console.error("Fetch error:", error);
  }
});
