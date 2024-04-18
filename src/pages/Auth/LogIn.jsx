import { useState } from "react";
// import TopBar from "../components/HomeComponents/TopBar";
import logo from "../../assets/Images/log.png";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5555/login",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      console.log(data);
      const { success, message, userId } = data;
      console.log("user id ", userId);
      setSuccess(success);
      if (success) {

        console.log(message);

        navigate('/profile');
      } else {
        setError(true);
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
    });
  };
  return (
    <div className="w-full h-screen bg-gray-300">
      {/* <TopBar /> */}
      {/* <CategoryComponent /> */}
      {success ? (
        <div>
          <h1>You Are Successfully logged In!!!</h1>
        </div>
      ) : (
        <div className="w-full h-full flex py-14 justify-center">
          <div className="w-1/2 mt-12 flex bg-white">
            <div className="w-2/5 flex justify-center items-center bg-gradient-to-t from-blue-600 to-blue-500">
              <img src={logo} alt="No img" />
            </div>
            <div className="flex flex-col h-full w-3/5 items-center p-5">
              <div>
                <p className="font-bold text-2xl text-blue-800">Log In</p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mt-20 flex flex-col gap-6">
                  {" "}
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
                    {error && <p>Invalid email or password</p>}
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
                      className="bg-orange-500 w-96 mt-12 h-12 text-white text-xl font-bold rounded-sm"
                      type="submit"
                    >
                      Log In
                    </button>
                  </div>
                  <div className="mt-10">
                    <p className="font-semibold">
                      Don't have Account?{" "}
                      <Link to={"/signup"}>
                        <span className="text-blue-500 underline">
                          Create Account
                        </span>{" "}
                      </Link>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
