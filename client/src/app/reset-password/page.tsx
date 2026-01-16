"use client";
import { useState, useEffect } from "react"; // Added useEffect
import api from "@/utils/api";
import { useRouter, useSearchParams } from "next/navigation"; // Added useSearchParams
import { AxiosError } from "axios";
import { FaLock, FaCheckCircle, FaKey } from "react-icons/fa";

export default function ResetPasswordWithOTP() {
  const router = useRouter();
  const searchParams = useSearchParams(); // 👈 Hook to read URL params
  
  // 1. Get email automatically from URL
  const emailFromUrl = searchParams.get("email"); 

  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Safety check: If no email in URL, send them back to start
  useEffect(() => {
    if (!emailFromUrl) {
      alert("Something went wrong. Please start over.");
      router.push("/forgot-password");
    }
  }, [emailFromUrl, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) return alert("Passwords do not match!");
    if (!emailFromUrl) return; // Should not happen due to useEffect

    setLoading(true);
    try {
      // 🚀 The Magic: We send the hidden email along with OTP and Password
      await api.post("/auth/reset-password", { 
        email: emailFromUrl, // <--- User didn't type this, but we have it!
        otp, 
        newPassword: password 
      });
      
      alert("Success! Password reset successful. Please login.");
      router.push("/login");
      
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      alert(error.response?.data?.message || "Invalid OTP.");
    } finally {
      setLoading(false);
    }
  };

  if (!emailFromUrl) return null; // Don't render if missing data

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-lg border border-slate-200">
        
        <div className="text-center mb-8">
          <div className="bg-blue-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg transform -rotate-3">
             <FaLock className="text-white text-3xl" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Verify & Reset</h2>
          <p className="text-slate-500 font-medium mt-3">
            Enter the OTP sent to <span className="font-bold text-slate-800">{emailFromUrl}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Note: NO Email Input Field Here! It's handled invisibly. */}

          {/* OTP Input */}
          <div>
            <label className="block text-sm font-extrabold text-slate-700 uppercase tracking-wider mb-2">
              OTP Code
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaKey className="text-slate-400" />
              </div>
              <input 
                type="text" 
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full pl-11 p-4 border-2 border-slate-300 rounded-xl focus:border-blue-600 outline-none font-bold text-slate-900 bg-slate-50 focus:bg-white transition tracking-widest text-lg"
                placeholder="123456"
                required 
              />
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-extrabold text-slate-700 uppercase tracking-wider mb-2">
              New Password
            </label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 border-2 border-slate-300 rounded-xl focus:border-blue-600 outline-none font-bold text-slate-900 bg-slate-50 focus:bg-white transition"
              placeholder="••••••••"
              required 
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-extrabold text-slate-700 uppercase tracking-wider mb-2">
              Confirm Password
            </label>
            <input 
              type="password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-4 border-2 border-slate-300 rounded-xl focus:border-blue-600 outline-none font-bold text-slate-900 bg-slate-50 focus:bg-white transition"
              placeholder="••••••••"
              required 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-700 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-800 disabled:bg-blue-400 transition shadow-lg flex justify-center items-center gap-2"
          >
            {loading ? "Resetting..." : <><FaCheckCircle /> Reset Password</>}
          </button>
        </form>
      </div>
    </div>
  );
}