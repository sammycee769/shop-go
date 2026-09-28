import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useLoginMutation } from "../../apis/productApi";
import { FaFacebookF, FaTwitter, FaGoogle } from "react-icons/fa";
import { FiMail, FiLock, FiAlertCircle } from "react-icons/fi";

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [userProfile, setUserProfile] = useState({ username: "", password: "" });
  const [login, { isLoading }] = useLoginMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!userProfile.username.trim() || !userProfile.password) {
      setError("Enter your username and password.");
      return;
    }

    try {
      const { token } = await login(userProfile).unwrap();
      if (!token) { setError("Login failed. Please check your credentials."); return; }
      localStorage.setItem("authToken", token);
      navigate("/");
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F0F1] flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 w-full max-w-md p-8">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="font-display text-4xl tracking-widest text-[#111]">
            SHOP.GO
          </Link>
          <p className="text-gray-400 text-sm mt-2">Welcome back! Sign in to continue.</p>
        </div>

        {/* Social */}
        <div className="flex gap-3 mb-6">
          {[
            { icon: <FaFacebookF />, label: "Facebook", color: "hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100" },
            { icon: <FaTwitter />, label: "Twitter", color: "hover:bg-sky-50 hover:text-sky-500 hover:border-sky-100" },
            { icon: <FaGoogle />, label: "Google", color: "hover:bg-red-50 hover:text-red-500 hover:border-red-100" },
          ].map(({ icon, label, color }) => (
            <button
              key={label}
              className={`flex-1 flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-2.5 text-sm text-gray-500 transition-all duration-150 cursor-pointer ${color}`}
            >
              {icon} {label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 mb-6">
          <hr className="flex-1 border-gray-100" />
          <span className="text-xs text-gray-400 font-medium">or continue with</span>
          <hr className="flex-1 border-gray-100" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1.5">
              Username
            </label>
            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4" />
              <input
                type="text"
                name="username"
                value={userProfile.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className="w-full bg-[#F8F8F8] border border-transparent focus:border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1.5">
              Password
            </label>
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4" />
              <input
                type="password"
                name="password"
                value={userProfile.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full bg-[#F8F8F8] border border-transparent focus:border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm outline-none transition-colors"
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-red-50 text-red-500 text-xs px-4 py-3 rounded-xl">
              <FiAlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <div className="flex items-center justify-between text-xs text-gray-400">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded" />
              Remember me
            </label>
            <a href="#" className="hover:text-[#111] transition-colors">Forgot password?</a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#111] text-white font-semibold rounded-xl py-3.5 text-sm hover:bg-[#333] active:scale-95 transition-all duration-150 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed mt-2"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-[#111] font-semibold hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
}
