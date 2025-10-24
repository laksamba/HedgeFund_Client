import React, { useState } from "react";
import { useLoginUserMutation } from "../services/AuthApi";
import { Mail, Lock, LucideHeadset, Eye, EyeOff } from "lucide-react";
import logo from "../assets/Transparent.png";
import { toast } from "react-toastify";

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const [loginUser, { isLoading }] = useLoginUserMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic validation
    if (!formData.email || !formData.password) {
      toast.warn("Please fill in all fields.");
      return;
    }

    try {
      const response = await loginUser(formData).unwrap();
      toast.success(`Welcome back, ${response?.email || "Investor"}!`);
      console.log("✅ Login successful:", response);

      
      // localStorage.setItem("token", response.token);


      // navigate("/dashboard");
    } catch (err: any) {
      console.error("❌ Login failed:", err);
      const message =
        err?.data?.message ||
        "Login failed. Please check your credentials and try again.";
      toast.error(message);
    }
  };

  return (
    <div className="h-screen flex flex-col md:flex-row bg-blue-950">
      {/* top heading */}
      <div className="flex flex-col justify-center items-center mb-8 text-white h-[50vh] md:h-full md:w-full bg-cover">
        <img src={logo} alt="" className="h-32" />
        <h1 className="text-4xl font-bold pb-8">Welcome , Investor</h1>
      </div>

      {/* form layer */}
      <div className="flex justify-center items-center relative bg-gray-200 w-full h-[50vh] md:h-full rounded-t-3xl">
        <div className="absolute w-[90%] max-w-md bg-gray-100 rounded-t-3xl shadow-lg p-8 -top-24 md:top-auto md:rounded-2xl bottom-0 md:bottom-auto">
          <form onSubmit={handleSubmit} className="space-y-5 pb-5">
            {/* Email */}
            <div className="flex items-center">
              <Mail className="w-5 h-5 text-gray-500 mr-2" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Email Address"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            {/* Password */}
            <div className="flex items-center relative">
              <Lock className="w-5 h-5 text-gray-500 mr-2" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <Eye /> : <EyeOff />}
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full text-white py-2 rounded transition-colors ${
                isLoading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-950 hover:bg-blue-700"
              }`}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center text-xl p-2">
            Already have an account?{" "}
            <a href="/register" className="text-blue-600">
              Register
            </a>
          </p>

          <div className="flex gap-1 justify-center">
            <LucideHeadset className="font-bold" />
            <p className="text-center">Need help? Contact support</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
