"use client";
import { useEffect, useState } from "react";
import api from "@/utils/api";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { 
  FaUserGraduate, FaSignOutAlt, FaIdCard, FaPhone, FaEnvelope, 
  FaCalendarAlt, FaMapMarkerAlt, FaUniversity, FaDownload, FaCircle
} from "react-icons/fa";

// Interface matches your exact Schema
interface StudentProfile {
  firstName: string;
  lastName: string;
  studentId: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address?: string;
}

export default function StudentPortal() {
  const [student, setStudent] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/students/me');
        setStudent(res.data.data);
      } catch (err) {
        console.error(err);
        // If unauthorized, redirect to login
        router.push('/login');
      } finally {
        // Add a small artificial delay to show off the skeleton animation
        setTimeout(() => setLoading(false), 800);
      }
    };
    fetchProfile();
  }, [router]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  // 🌟 LOADING STATE (Skeleton UI)
  if (loading) return <PortalSkeleton />;

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-100 text-slate-800 pb-20">
      
      {/* 🟢 NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 animate-fade-in-left">
            <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-2.5 rounded-xl shadow-lg shadow-blue-500/20">
              <FaUniversity className="text-white text-lg" />
            </div>
            <div>
              <h1 className="font-extrabold text-xl tracking-tight text-slate-900">EduNest<span className="text-blue-600">.</span></h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Student Portal</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-slate-500 hover:text-red-600 hover:bg-red-50 transition-all duration-200 group"
          >
            <span>Logout</span>
            <FaSignOutAlt className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </nav>

      {/* 🟢 MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-6 mt-10 space-y-8">
        
        {/* 1. HERO SECTION (Welcome Card) */}
        <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl animate-fade-in-up">
          {/* Background Blobs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -mr-32 -mt-32 animate-pulse-slow"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl -ml-20 -mb-20 animate-pulse-slow delay-700"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 p-1 shadow-2xl shadow-blue-500/30">
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-4xl font-bold text-white">
                {student?.firstName?.charAt(0)}{student?.lastName?.charAt(0)}
              </div>
            </div>
            
            <div className="text-center md:text-left flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30 text-green-300 text-xs font-bold uppercase tracking-wider mb-3">
                <FaCircle className="text-[8px] animate-ping" /> Live Session
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-2">
                Welcome back, {student?.firstName}
              </h1>
              <p className="text-slate-400 text-lg">Manage your academic profile and updates.</p>
            </div>

            <div className="hidden md:block">
              <div className="bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-2xl text-center min-w-[180px]">
                <p className="text-blue-300 text-xs font-bold uppercase tracking-widest mb-1">Current Sem</p>
                <p className="text-3xl font-extrabold text-white">4th</p>
              </div>
            </div>
          </div>
        </div>

        {/* 2. GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: Personal Info Card */}
          <div className="lg:col-span-2 space-y-8 animate-fade-in-up delay-100">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <FaUserGraduate className="text-blue-600" /> Personal Details
                </h3>
                <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">ID: {student?.studentId}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                <InfoItem icon={<FaEnvelope />} label="Email Address" value={student?.email} />
                <InfoItem icon={<FaPhone />} label="Phone Number" value={student?.phone} />
                <InfoItem 
                  icon={<FaCalendarAlt />} 
                  label="Date of Birth" 
                  value={student?.dateOfBirth ? new Date(student.dateOfBirth).toLocaleDateString('en-US', { dateStyle: 'long' }) : 'N/A'} 
                />
                <InfoItem icon={<FaMapMarkerAlt />} label="Address" value={student?.address || "Not Provided"} />
              </div>
            </div>

            {/* QUICK ACTIONS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               <ActionCard icon={<FaDownload />} label="Syllabus" color="blue" />
               <ActionCard icon={<FaIdCard />} label="ID Card" color="purple" />
               <ActionCard icon={<FaCalendarAlt />} label="Timetable" color="orange" />
               <ActionCard icon={<FaUniversity />} label="Results" color="teal" />
            </div>
          </div>

          {/* RIGHT COLUMN: Digital ID Preview */}
          <div className="animate-fade-in-up delay-200">
            <div className="bg-gradient-to-b from-slate-900 to-slate-800 rounded-3xl p-6 text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10"></div>
              
              <div className="text-center border-b border-white/10 pb-6 mb-6">
                <FaUniversity className="text-4xl mx-auto mb-3 text-blue-400" />
                <p className="font-bold tracking-widest uppercase text-xs text-slate-400">Madhav Institute</p>
                <h2 className="font-extrabold text-xl mt-1">Student Identity</h2>
              </div>

              <div className="text-center space-y-4">
                <div className="w-24 h-24 mx-auto bg-slate-700 rounded-xl flex items-center justify-center border-2 border-slate-600 group-hover:border-blue-500 transition-colors">
                  <span className="text-3xl font-bold">{student?.firstName?.charAt(0)}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">{student?.firstName} {student?.lastName}</h3>
                  <p className="text-blue-400 font-mono text-sm mt-1">{student?.studentId}</p>
                </div>
                <div className="bg-white/10 p-3 rounded-lg mt-4">
                  <p className="text-[10px] text-slate-400 uppercase">Valid Until</p>
                  <p className="font-bold text-sm">June 2026</p>
                </div>
              </div>

              <button className="w-full mt-8 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2">
                <FaDownload /> Download ID
              </button>
            </div>
          </div>

        </div>
      </main>

      {/* 🌟 CSS Animations (Inline) */}
      <style jsx global>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-left {
          0% { opacity: 0; transform: translateX(-20px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-fade-in-left { animation: fade-in-left 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .animate-pulse-slow { animation: pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
      `}</style>
    </div>
  );
}

// 🟢 SUB-COMPONENTS
function InfoItem({ icon, label, value }: any) {
  return (
    <div className="flex items-start gap-4">
      <div className="mt-1 text-slate-400 text-lg">{icon}</div>
      <div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{label}</p>
        <p className="font-bold text-slate-800 mt-0.5 break-all">{value || "—"}</p>
      </div>
    </div>
  );
}

function ActionCard({ icon, label, color }: any) {
  const colors: any = {
    blue: "bg-blue-50 text-blue-600 hover:bg-blue-100",
    purple: "bg-purple-50 text-purple-600 hover:bg-purple-100",
    orange: "bg-orange-50 text-orange-600 hover:bg-orange-100",
    teal: "bg-teal-50 text-teal-600 hover:bg-teal-100",
  };
  return (
    <div className={`${colors[color]} p-4 rounded-2xl flex flex-col items-center justify-center gap-3 cursor-pointer transition-all hover:scale-105 active:scale-95 h-32`}>
      <div className="text-2xl">{icon}</div>
      <span className="font-bold text-sm">{label}</span>
    </div>
  );
}

function PortalSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 flex flex-col items-center justify-center space-y-6">
      <div className="w-full max-w-4xl h-64 bg-slate-200 rounded-3xl animate-pulse"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
         <div className="col-span-2 h-64 bg-slate-200 rounded-3xl animate-pulse"></div>
         <div className="h-64 bg-slate-200 rounded-3xl animate-pulse"></div>
      </div>
    </div>
  );
}