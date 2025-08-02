import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import PostApplication from "./pages/PostApplication";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { getUser } from "./store/slices/userSlice";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { monthlyJobsPostedCounts } from "./store/slices/metaSlice";
// import { useLocation } from "react-router-dom";
const App = () => {
  console.log("app.jsx")
  const dispatch = useDispatch();
  // const location = useLocation();

  useEffect(() => {
    dispatch(monthlyJobsPostedCounts())

    // if (location.pathname !== "/register") {
    dispatch(getUser());
    // }
  }, []);
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/post/application/:jobId" element={<PostApplication />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot/password" element={<ForgotPassword />} />
        <Route path="/reset/password" element={<ResetPassword />} />


        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
      <ToastContainer position="top-right" theme="dark" autoClose={1000} />
    </Router>
  )
}

export default App