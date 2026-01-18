"use client";
import { useEffect, useState } from "react";
import api from "@/utils/api";

export default function DashboardHome() {
  const [stats, setStats] = useState({ total: 0 });

  useEffect(() => {

    api.get("/students").then(res => {
        const list = res.data.data || res.data || [];
        setStats({ total: list.length });
    }).catch(() => {});
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold text-slate-900 mb-6">Welcome, Admin 👋</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
          <h3 className="text-slate-500 font-bold uppercase text-sm">Total Students</h3>
          <p className="text-5xl font-extrabold text-blue-600 mt-2">{stats.total}</p>
          <p className="text-slate-400 text-sm mt-2">Registered in the system</p>
        </div>


        <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 opacity-50">
          <h3 className="text-slate-500 font-bold uppercase text-sm">Courses</h3>
          <p className="text-5xl font-extrabold text-slate-800 mt-2">--</p>
          <p className="text-slate-400 text-sm mt-2">Coming Soon</p>
        </div>
      </div>
    </div>
  );
}