"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import api from "@/utils/api";
import Link from "next/link";
import { useRouter } from "next/navigation"; // 👈 Added this
import { FaUserShield, FaLock, FaSchool } from "react-icons/fa";
import { AxiosError } from "axios";

// Define what the backend sends back
interface LoginResponse {
  success: boolean;
  token: string;
  user: {
    id: string;
    email: string;
    role: "admin" | "student"; // 👈 Defined specific roles
  };
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const router = useRouter(); // 👈 Initialized Router
  
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1. Send Login Request (with Type Safety)
      const res = await api.post<LoginResponse>("/auth/login", { email, password });
      
      // 2. Save Token
      login(res.data.token); 
      
      // 3. 🚦 TRAFFIC CONTROL (The Logic we discussed)
      const role = res.data.user.role;

      if (role === 'admin') {
        router.push('/dashboard'); 
      } else if (role === 'student') {
        router.push('/student-portal'); 
      } else {
        router.push('/'); // Fallback
      }

    } catch (err: any) { // Explicitly typed as 'any' to satisfy simple linters

      const axiosError = err as AxiosError<{ message: string }>;
      const msg = axiosError.response?.data?.message || "Login failed. Check credentials.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-slate-900 overflow-hidden font-sans">
      
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div 
        className={`relative z-10 w-full max-w-md p-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl transform transition-all duration-700 ease-out ${mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
      >
        
        <div className="text-center mb-10">
          <div className="bg-gradient-to-tr from-blue-500 to-purple-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/30 transform rotate-3 hover:rotate-6 transition-transform duration-300">
             <FaSchool className="text-white text-4xl" />
          </div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">EduNest</h1>
          <p className="text-blue-200/70 text-sm font-medium tracking-wide uppercase">Secure Portal</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-200 text-sm rounded-xl flex items-center animate-pulse">
            <span className="mr-2">⚠️</span> {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          
          <div className="group">
            <label className="block text-xs font-bold text-blue-300 uppercase tracking-wider mb-2 group-focus-within:text-blue-400 transition-colors">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaUserShield className="text-blue-300/50 group-focus-within:text-blue-400 transition-colors" />
              </div>
              <input
                type="email"
                required
                className="w-full pl-11 p-4 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:bg-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all duration-300 shadow-inner"
                placeholder="user@college.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="group">
            <label className="block text-xs font-bold text-blue-300 uppercase tracking-wider mb-2 group-focus-within:text-blue-400 transition-colors">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaLock className="text-blue-300/50 group-focus-within:text-blue-400 transition-colors" />
              </div>
              <input
                type="password"
                required
                className="w-full pl-11 p-4 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:bg-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all duration-300 shadow-inner"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/30 transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Verifying...
              </span>
            ) : "Login"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link href="/forgot-password" className="text-sm font-medium text-blue-300/80 hover:text-white transition-colors border-b border-transparent hover:border-blue-400">
            Forgot Password?
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}