import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
      }
      const { data } = await axios.post(
        "http://localhost:5555",
        {},
        { withCredentials: true }
      );
      const { status, user } = data;
      setUsername(user);
      if(!status){
        navigate('/login')
      }
      console.log(status);
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);
  const Logout = () => {
    removeCookie("token");
    navigate("/signup");
  };
  return (
    <>
      <div className="w-full flex gap-4 flex-col justify-center items-center p-12">
        <h4 className="font-extrabold text-2xl">
          {" "}
          Welcome <span>{username}</span>
        </h4>
        <div className="flex gap-3">
          <button
            className="w-28 h-10 bg-orange-800 text-white rounded-md"
            onClick={Logout}
          >
            LOGOUT
          </button>
          <Link to={"/"}>
            {" "}
            <button className="w-28 h-10 bg-gray-800 text-white rounded-md">
              Home
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Profile;
