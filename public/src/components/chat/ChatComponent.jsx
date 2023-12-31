import { useEffect, useState, useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import io from "socket.io-client";

const socket = io("http://localhost:3600");

const ChatComponent = () => {
  const { auth } = useContext(AuthContext);
  const userId = auth.user._id;

  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    socket.on("response", (data) => {
      if (data.userId !== userId) {
        return () => socket.off("response");
      }

      setChatHistory((prev) => [...prev, data]);
    });
  }, [userId]);

  const sendMessage = () => {
    socket.emit("message", { userId, message });
    setMessage("");
  };

  return (
    <div className="flex flex-col h-screen pt-20">
      <div className="flex-grow overflow-auto p-4">
        {chatHistory.map((chat, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg ${
              chat.userId === userId
                ? "bg-blue-200 ml-auto"
                : "bg-green-200 mr-auto"
            }`}
          >
            <strong>{chat.userId === userId && "You" }:</strong>{" "}
            {chat.message } <br />
            <strong>{"COURSE ADVISER"}:</strong>{" "}
            {chat.response && chat.response}
          </div>
        ))}
      </div>
      <div className="p-4 border-t-2 border-gray-200">
        <div className="flex space-x-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-grow p-2 border rounded"
          />
          <button
            onClick={sendMessage}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
