import axios from "axios";
import React, { useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import logo from "../assets/logo.png";
import bgImage from "../assets/loginbg.jpg";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/admin/login`, {
        email,
        password,
      });

      if (response.data.success) {
        setToken(response.data.token);
        toast.success("Login successful");
      } else {
        toast.error(response.data.message || "Invalid credentials");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center md:w-full relative 
                 bg-white md:bg-transparent"
      style={{
        backgroundImage: window.innerWidth >= 768 ? `url(${bgImage})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay only on md+ screens */}
      <div className="hidden md:block absolute inset-0 bg-black bg-opacity-60 "></div>

      {/* Card */}
      <div className="relative bg-[#f8f7f4] backdrop-blur-md shadow-lg px-8 py-8 max-w-md w-full z-10 ">
        <img src={logo} alt="Logo" className="h-24 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-center text-[#5b4f47] mb-6">
          Admin Login
        </h2>

        <form onSubmit={onSubmitHandler} autoComplete="off">
  {/* Email */}
  <div className="mb-4">
    <p className="text-sm font-medium text-gray-700 mb-2">Email Address</p>
    <input
      onChange={(e) => setEmail(e.target.value)}
      value={email}
      type="email"
      placeholder="your@email.com"
      required
      autoComplete="new-email"
      className="w-full px-3 py-2 border border-gray-300 outline-none focus:ring-2 focus:ring-[#5b4f47]"
    />
  </div>

  {/* Password */}
  <div className="mb-4">
    <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
    <input
      onChange={(e) => setPassword(e.target.value)}
      value={password}
      type="password"
      placeholder="Enter your password"
      required
      autoComplete="new-password"
      className="w-full px-3 py-2 border border-gray-300 outline-none focus:ring-2 focus:ring-[#5b4f47]"
    />
  </div>

  {/* Button */}
  <button
    type="submit"
    className="mt-2 w-full py-2 px-4 text-white bg-[#5b4f47] hover:bg-[#463e38] transition-all shadow-md"
  >
    Login
  </button>
</form>


        <p className="text-sm text-gray-600 text-center mt-6">
          © {new Date().getFullYear()}{" "}
          <a href="/" className="font-bold">
            Perfume Villa
          </a>{" "}
          Admin Panel
        </p>
      </div>
    </div>
  );
};

export default Login;
