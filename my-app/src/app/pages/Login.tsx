import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Sprout, Mail, Lock, Leaf } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple mock authentication
    if (email && password) {
      localStorage.setItem("isAuthenticated", "true");
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8F5E9] to-[#C8E6C9] flex items-center justify-center p-4">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 opacity-20">
        <Leaf className="w-24 h-24 text-[#4CAF50]" />
      </div>
      <div className="absolute bottom-10 right-10 opacity-20">
        <Sprout className="w-32 h-32 text-[#4CAF50]" />
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 relative z-10">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-[#4CAF50] rounded-full flex items-center justify-center mb-4">
            <Sprout className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-800">Green Campus</h1>
          <p className="text-gray-600 mt-1">Certification Management System</p>
          <p className="text-sm text-gray-500 mt-2">👩‍🎓 Student Portal</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email / Student ID
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email or student ID"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <button type="button" className="text-sm text-[#4CAF50] hover:underline">
              Forgot password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-[#4CAF50] text-white py-3 rounded-lg hover:bg-[#45a049] transition-colors font-medium"
          >
            Login
          </button>
        </form>

        {/* Demo Credentials */}
        <div className="mt-6 p-4 bg-[#E8F5E9] rounded-lg">
          <p className="text-xs text-gray-600 text-center">
            <strong>Demo:</strong> Use any email and password to login
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
