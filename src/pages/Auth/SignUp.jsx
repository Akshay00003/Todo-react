import { useState } from "react";
// import CategoryComponent from "../components/HomeComponents/CategoryComponent";
// import TopBar from "../components/HomeComponents/TopBar";
import logo from "../../assets/Images/log.png";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { username, email, password } = inputValue;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5555/signup",
        { ...inputValue },
        { withCredentials: true }
      );
      const { success, message } = data;
      if (success) {
        console.log(message);
        setTimeout(() => {
          navigate("/profile");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      email: "",
      username: "",
      password: "",
    });
  };
  console.log(inputValue);
  return (
    <div className="w-full h-screen bg-gray-300">
      {/* <TopBar /> */}
      {/* <CategoryComponent /> */}
      <div className="w-full h-full flex py-14 justify-center">
        <div className="w-1/2 mt-12 flex bg-white">
          <div className="w-2/5 flex justify-center items-center bg-gradient-to-t from-blue-600 to-blue-500">
            <img src={logo} alt="No img" />
          </div>
          <div className="flex flex-col h-full w-3/5 items-center p-5">
            <div>
              <p className="font-bold text-2xl text-blue-800">SignUp</p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mt-20 flex flex-col gap-6">
                {" "}
                <div className="flex flex-col justify-center items-center gap-3">
                  <label htmlFor="username">Username</label>
                  <input
                    name="username"
                    onChange={handleChange}
                    value={username}
                    placeholder="Enter username"
                    type="text"
                    className="w-96 h-10 appearance-none block border-b-2 border-blue-800 leading-tight focus:outline-none focus:bg-white focus:border-b-2"
                  />
                </div>
                <div className="flex flex-col items-center justify-center gap-3">
                  <label htmlFor="email">Email</label>
                  <input
                    name="email"
                    onChange={handleChange}
                    value={email}
                    placeholder="Enter your email"
                    type="email"
                    className="w-96 h-10 appearance-none block border-b-2 border-blue-800 leading-tight focus:outline-none focus:bg-white focus:border-b-2"
                  />
                </div>
                <div className="flex flex-col gap-3 justify-center items-center">
                  <label htmlFor="password">Password</label>
                  <input
                    name="password"
                    onChange={handleChange}
                    value={password}
                    placeholder="Enter password"
                    type="password"
                    className="w-96 h-10 appearance-none block border-b-2 border-blue-800 leading-tight focus:outline-none focus:bg-white focus:border-b-2"
                  />
                </div>
                <div>
                  <button
                    className="bg-orange-500 w-96 mt-1 h-12 text-white text-xl font-bold rounded-sm"
                    type="submit"
                  >
                    Sign Up
                  </button>
                </div>
                <div className=''>
                <p className='font-semibold'>Already have Account? <Link to={'/login'}><span className='text-blue-500 underline'>Login</span> </Link></p>
              </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
