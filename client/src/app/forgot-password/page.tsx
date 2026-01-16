"use client";
import { useState } from "react";
import api from "@/utils/api";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { FaKey, FaArrowLeft, FaEnvelope } from "react-icons/fa";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 1. Tell Backend to send the OTP email
      await api.post("/auth/forgot-password", { email });
      
      // 2. Success! Now redirect to the Reset Page
      // We pass the email in the URL so the next page can grab it automatically
      const encodedEmail = encodeURIComponent(email);
      router.push(`/reset-password?email=${encodedEmail}`);
      
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      // Show error if email not found
      setError(error.response?.data?.message || "We couldn't find an account with that email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-lg border border-slate-200">
        
        {/* Back Button */}
        <button 
          onClick={() => router.push("/login")} 
          className="text-slate-500 font-bold text-sm mb-8 flex items-center hover:text-slate-900 transition"
        >
          <FaArrowLeft className="mr-2"/> Back to Login
        </button>
        
        {/* Header Icon */}
        <div className="text-center mb-8">
          <div className="bg-slate-900 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg transform rotate-3">
             <FaKey className="text-white text-3xl" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Forgot Password?</h2>
          <p className="text-slate-500 font-medium mt-3">
            Enter your email address and we will send you a verification code.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-lg font-bold border-l-4 border-red-500 text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-extrabold text-slate-700 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaEnvelope className="text-slate-400" />
              </div>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 p-4 border-2 border-slate-300 rounded-xl focus:border-slate-900 focus:ring-0 outline-none font-bold text-slate-900 transition bg-slate-50 focus:bg-white"
                placeholder="admin@school.com"
                required 
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-slate-800 disabled:bg-slate-400 transition shadow-lg transform active:scale-[0.99]"
          >
            {loading ? "Sending Code..." : "Send Verification Code"}
          </button>
        </form>

      </div>
    </div>
  );
}