"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000");

export default function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const sendMessage = () => {
    socket.emit("message", message);
    setMessage("");
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto p-2">
        {messages.map((msg, i) => (
          <div key={i}>{msg}</div>
        ))}
      </div>

      <div className="p-2 flex gap-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border flex-1"
        />

        <button onClick={sendMessage}>
          Enviar
        </button>
      </div>
    </div>
  );
}
