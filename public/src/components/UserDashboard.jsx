import { Link, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import {useQuery} from "react-query"
import useAuth from "../hooks/useAuth";
import baseUrl from "../shared/baseUrl";
import usePost from "../hooks/usePost";



const UserDashboard = () => {

  const fetch = useFetch();
  const post = usePost();
  const {auth} = useAuth();
  const url = `${baseUrl}chat`
  const navigate = useNavigate()

  //console.log(auth)

  const getChatHistory = async () =>{

    const result = await fetch(`${url}/${auth?.user?._id}`, auth?.accessToken)
    return result.data;
  }

  const { data, isError, isLoading, isSuccess } = useQuery(
    ["chatHistories"],
    getChatHistory,
    { keepPreviousData: true, 
        staleTime: 10000,
        refetchOnMount:"always" }
  );

  const handleChatHistoryCreate = async () => {

    const response = await post(url,{userId:auth.user._id}, auth.accessToken);

    if(!response){

      console.log('error creating chat history')
    }

    navigate(`/chat/${response.data?.chatHistory?._id}`)
    console.log(response.data.chatHistory);


  }

  console.log(data); 

  const handleOpenChat = (id) => {

    navigate(`/chat/${id}`);
  }



  return (
    <div className="pt-28 px-6 flex flex-col gap-12">
      <div className="flex flex-col gap-10">
        <h1 className="text-2xl font-bold"> Dashboard </h1>

        <div>
            <button className="bg-blue-500 hover:bg-blue-600 focus:ring-4 
      focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base
       px-5 py-2.5 text-center text-gray-50
       mr-3 md:mr-0 dark:bg-blue-500 dark:hover:bg-blue-600 " onClick={handleChatHistoryCreate}> Start New Chat </button>
          
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <h2 className="text-2xl font-bold">Chat History </h2>

        {
          data?.allHistory.map((history)=>(
            <div key={history._id} className="shadow-lg rounded p-4 bg-gray-200 cursor-pointer hover:bg-gray-300" onClick={()=>{handleOpenChat(history._id)}}>

              <p>{history.name}</p>
          
            </div>
          ))
        }
       
      </div>
    </div>
  );
};

export default UserDashboard;
