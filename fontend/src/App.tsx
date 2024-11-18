import { useEffect, useMemo, useState, useRef } from "react";
import { io } from "socket.io-client";

function App() {
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState<string[]>([]);
  const messageListEndRef = useRef<HTMLDivElement>(null);

  let Username = sessionStorage.getItem("username");

  const socket = useMemo(() => io("http://192.168.1.72:3000/"), []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    socket.emit("message", { message });
    setMessage("");
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected", socket.id);
    });

    socket.on("receive-message", (m) => {
      console.log(m);
      setAllMessages((prev) => [...prev, m]);
    });

    socket.on("welcome", (s) => {
      console.log(s);
    });

    return () => {
      socket.off("connect");
      socket.off("receive-message");
      socket.off("welcome");
    };
  }, [socket]);

  useEffect(() => {
    if (messageListEndRef.current) {
      messageListEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [allMessages]);

  return (
    <>
      <div className="h-screen w-screen flex flex-col">
        <div className="flex-grow overflow-y-auto p-4 flex flex-col-reverse">
          {allMessages.map((M, index) => (
            <div key={index} className="p-2 mb-2 bg-gray-100 rounded">
              {M}
            </div>
          ))}

          <div ref={messageListEndRef} />
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex gap-4 items-end p-4 mt-auto"
        >
          <div className="font-medium">{Username}</div>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="border-2 p-2 w-full rounded-lg resize-none"
            rows={3}
            aria-label="Message input"
          />
          <button
            type="submit"
            disabled={!message.trim()}
            className={`px-4 py-2 bg-blue-500 text-white rounded-lg ${
              !message.trim() ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Send
          </button>
        </form>
      </div>
    </>
  );
}

export default App;
