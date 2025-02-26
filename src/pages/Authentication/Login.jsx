import React from "react";
import { Link, useNavigate } from "react-router-dom";


function Login (){
const navigate=useNavigate() ;
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center">Login</h2>
        
        <form className="mt-6">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
            <input type="email" className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="Enter your email" />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
            <input type="password" className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="Enter your password" />
          </div>

          <div className="flex justify-between items-center mb-4">
            <Link to="/forgot-password" className="text-blue-600 text-sm hover:underline">Forgot Password?</Link>
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors" 
           onClick={() => navigate("/Dashboard")}>
            Login
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-600 text-center">
          Don't have an account? <Link to="/signup" className="text-blue-600 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
