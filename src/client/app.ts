import * as io from "socket.io-client";

// TODO: 一旦べた塗りコード
const chatForm = document.getElementById("chat-form") as HTMLFormElement;
const chatInput = document.getElementById("chat-input") as HTMLInputElement;
const res = document.getElementById("res");

const socket = io("http://localhost:80");
socket.on("connect", () => {
  if (chatForm && chatInput) {
    chatForm.addEventListener("submit", (e) => {
      e.preventDefault();
      socket.emit("broadcast", chatInput.value);
      chatInput.value = "";
    });
  }
});

socket.on("broadcast", (data: string) => {
  if (res) {
    const div = document.createElement("div");
    div.textContent = data;
    res.appendChild(div);
  }
});