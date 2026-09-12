import { Link } from "react-router";
import { FiUser, FiMail, FiLock, FiKey } from "react-icons/fi";

export default function Register() {
  return (
    <div className="min-h-screen bg-[#F2F0F1] flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 w-full max-w-md p-8">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="font-display text-4xl tracking-widest text-[#111]">
            SHOP.GO
          </Link>
          <p className="text-gray-400 text-sm mt-2">Create your account to get started.</p>
        </div>

        <form className="space-y-4">
          {[
            { icon: <FiUser />, label: "Full Name", type: "text", placeholder: "Your name" },
            { icon: <FiMail />, label: "Email", type: "email", placeholder: "your@email.com" },
            { icon: <FiLock />, label: "Password", type: "password", placeholder: "Create a password" },
            { icon: <FiKey />, label: "Confirm Password", type: "password", placeholder: "Repeat your password" },
          ].map(({ icon, label, type, placeholder }) => (
            <div key={label}>
              <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1.5">
                {label}
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-sm">
                  {icon}
                </span>
                <input
                  type={type}
                  placeholder={placeholder}
                  className="w-full bg-[#F8F8F8] border border-transparent focus:border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm outline-none transition-colors"
                />
              </div>
            </div>
          ))}

          <label className="flex items-start gap-2.5 cursor-pointer text-xs text-gray-500 pt-1">
            <input type="checkbox" className="mt-0.5 rounded" />
            I agree to the{" "}
            <a href="#" className="text-[#111] font-medium hover:underline">Terms of Service</a>{" "}
            and{" "}
            <a href="#" className="text-[#111] font-medium hover:underline">Privacy Policy</a>
          </label>

          <button
            type="submit"
            className="w-full bg-[#111] text-white font-semibold rounded-xl py-3.5 text-sm hover:bg-[#333] active:scale-95 transition-all duration-150 cursor-pointer mt-2"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-[#111] font-semibold hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
