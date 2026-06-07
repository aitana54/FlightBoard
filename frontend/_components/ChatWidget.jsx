"use client";

import { useState } from "react";
import Chat from "./Chat";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-blue-600 text-white"
      >
        Chat
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white border rounded-lg shadow-lg">
          <Chat />
        </div>
      )}
    </>
  );
}
