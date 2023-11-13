import { Link } from "react-router-dom";

const UserDashboard = () => {
    return ( 
    
    <div className="pt-20">

        UserDashboard

        <Link to='/chat' >
            <button> Start Chat </button>
        </Link>

    </div> );
}
 
export default UserDashboard;