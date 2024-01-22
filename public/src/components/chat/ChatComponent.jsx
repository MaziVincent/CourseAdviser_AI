import { useEffect, useState, useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import io from "socket.io-client";
import useFetch from "../../hooks/useFetch";
import baseUrl from "../../shared/baseUrl";
import { useParams } from "react-router-dom";
//import { useQuery } from "react-query";


const socket = io("http://localhost:3600");

const ChatComponent = () => {

  const { auth } = useContext(AuthContext);
  const userId = auth.user._id;
  const fetch = useFetch();
  const url = `${baseUrl}chat`
  const {id} = useParams();

  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const fetchChatHistory = async () => {

    const response = await fetch(`${baseUrl}history/${id}`,auth.accessToken);
    setChatHistory(response.data?.chatHistory?.chats)
    console.log(response.data)

  }


  useEffect(()=>{

    fetchChatHistory()
    
  },[])

  useEffect(() => {

    socket.on("response", (data) => {
      console.log(data);
      if (data.userId !== userId) {
        return () => socket.off("response");
      }

      setChatHistory((prev) => [...prev, {response:data.response}]);
    });

    return () => {
      socket.off('response');
    }

  }, [userId]);




  const sendMessage = () => {
    socket.emit("message", { userId, message, historyId:id });
    setChatHistory((prev) => [...prev,{message}])
    setMessage("");
  };

  const handleKeypress = e => {
    //it triggers by pressing the enter key
  if (e.keyCode === 13) {
    sendMessage();
  }
};

  return (
    <div className="flex flex-col h-screen pt-20">
      <div className="flex-grow overflow-auto p-4">
        {chatHistory.map((chat, index) => (
          <div
            key={index}
            className={`p-2`}
          >
            {chat.message && (
              <div className="mr-auto bg-blue-300 rounded-lg p-3 w-1/2">

              <strong> "You" :</strong>{" "}
               {chat.message }
               
               </div>

            )}
           
            {chat.response && (
            <div className="ml-auto bg-green-300 rounded-lg p-3 w-1/2">
            <strong>{"COURSE ADVISER"}:</strong>{" "}
            {chat.response}
            </div>)}
            
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
            onKeyDown={handleKeypress}
          />
          <button
          type="submit"
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
