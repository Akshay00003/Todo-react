import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import SignUp from "../pages/Auth/SignUp";
import LogIn from "../pages/Auth/LogIn";
import Profile from "../pages/Profile/Profile";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
