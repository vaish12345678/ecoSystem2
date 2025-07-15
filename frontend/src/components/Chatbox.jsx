import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FaRobot, FaUser } from "react-icons/fa";

const ChatBot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const res = await axios.post("http://localhost:3000/api/ai/chat", {
        userMessage: input,
      });
      setMessages([...newMessages, { sender: "bot", text: res.data.reply }]);
    } catch (err) {
      console.error(err);
      setMessages([
        ...newMessages,
        { sender: "bot", text: "Error getting response." },
      ]);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="fixed bottom-24 right-6 w-full max-w-sm z-50">
      <div className="bg-[#0f2027]/90 border border-[#00C853]/30 rounded-2xl shadow-xl p-4 text-[#e0f2f1] font-sans backdrop-blur-sm">
        <h2 className="text-lg font-bold mb-3 flex items-center text-[#8BC34A]">
          <FaRobot className="mr-2" />
          Eco Assistant
        </h2>

        <div className="h-64 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] px-4 py-2 rounded-xl text-sm shadow-md ${
                  msg.sender === "user"
                    ? "bg-gradient-to-r from-[#00C853] to-[#64dd17] text-[#0f2027]"
                    : "bg-[#203a43] text-[#e0f2f1]"
                }`}
              >
                <div className="flex items-center">
                  {msg.sender === "user" ? (
                    <FaUser className="mr-2" />
                  ) : (
                    <FaRobot className="mr-2 text-[#8BC34A]" />
                  )}
                  <span>{msg.text}</span>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="mt-4 flex">
          <input
            className="flex-1 bg-[#0f2027] border border-[#203a43] rounded-l-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00C853]"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask something..."
          />
          <button
            className="bg-gradient-to-r from-[#00C853] to-[#64dd17] px-5 py-2 rounded-r-xl font-medium text-sm hover:opacity-90 transition-opacity"
            onClick={handleSend}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
