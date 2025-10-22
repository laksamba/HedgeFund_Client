import React, { useState } from "react";
import { useRegisterUserMutation } from "../services/AuthApi";
import { Phone, Mail, Lock, LucideHeadset } from "lucide-react";

import image from "../assets/Transparent.png"

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
  });

  const [registerUser, { isLoading, isError, isSuccess, error }] =
    useRegisterUserMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await registerUser(formData);
  };

  return (
    <div className="h-screen flex flex-col md:flex-row  bg-blue-950">
       {/* top heading */}
      <div className="flex flex-col  justify-center items-center mb-8 text-white h-[50vh] md:h-full md:w-full bg-cover"
      >
        <img src={image} alt="" className="h-32 "/>
        <h1 className="text-4xl font-bold pb-8">Welcome , Investor</h1>
      </div>
      {/* first layer */}
     <div className="flex  justify-center  items-center relative bg-gray-200 w-full h-[50vh] md:h-full rounded-t-3xl ">

      {/* content layer */}
       <div className=" absolute w-[90%] max-w-md bg-gray-100 rounded-t-3xl shadow-lg p-8 -top-24 md:top-auto md:rounded-2xl bottom-0 md:bottom-auto">

        {isError && (
          <div className="text-red-500 mb-4">
            {(error as any)?.data?.message || "Something went wrong"}
          </div>
        )}
        {isSuccess && (
          <div className="text-green-500 mb-4">
            User registered successfully!
          </div>
        )}

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

          {/* Phone */}
          <div className="flex items-center">
             <Phone className="w-5 h-5 text-gray-500 mr-2" />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          {/* Password */}
          <div className="flex items-center">
            <Lock className="w-5 h-5 text-gray-500 mr-2" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-950 text-white py-2 rounded hover:bg-blue-700 transition-colors"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center text-xl p-2">Already have an account? <a href="/login" className="text-blue-600">Login</a></p>

        <div className="flex gap-1 justify-center">
          <LucideHeadset className="font-bold"/>
          <p className="text-center"> Need help? Contact support</p>
        </div>
      </div>
     </div>
    </div>
  );
};

export default Register;
