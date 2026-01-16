"use client";
import { useState } from "react";
import api from "@/utils/api";
import { useRouter } from "next/navigation";
import { FaUserPlus, FaArrowLeft } from "react-icons/fa";

export default function AddStudentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    studentId: "",
    dateOfBirth: "",
    phone: "",
    address: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // 👇 1. FIX DATA TYPES BEFORE SENDING
    const payload = {
      ...formData,
      year: 3, // Must be a number (Backend Requirement)
      course: "B.Tech AIML",
      // Ensure dateOfBirth is valid string
      dateOfBirth: formData.dateOfBirth ? new Date(formData.dateOfBirth).toISOString().split('T')[0] : "2000-01-01"
    };

    try {
      // 👇 2. USE THE EXACT URL YOU CONFIRMED
      console.log("Sending to: /students/add", payload);
      await api.post("/students/add", payload);
      
      alert("Student Added Successfully!");
      router.push("/dashboard/students"); // Redirect to the NEW list page

    } catch (err: any) {
      console.error("Add Error:", err);
      const msg = err.response?.data?.message || "Failed. Check console for details.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <button onClick={() => router.back()} className="flex items-center text-slate-600 font-bold mb-6">
          <FaArrowLeft className="mr-2" /> Back
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
            <FaUserPlus className="mr-3 text-blue-600" /> Add New Student
          </h2>
          
          {error && <div className="bg-red-100 text-red-800 p-4 rounded mb-6 font-bold">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="font-bold text-slate-700">First Name</label>
                <input name="firstName" onChange={handleChange} required className="w-full p-3 border-2 border-slate-300 rounded-lg text-black font-bold" placeholder="Arjun" />
              </div>
              <div>
                <label className="font-bold text-slate-700">Last Name</label>
                <input name="lastName" onChange={handleChange} required className="w-full p-3 border-2 border-slate-300 rounded-lg text-black font-bold" placeholder="Singh" />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700">Email</label>
              <input name="email" type="email" onChange={handleChange} required className="w-full p-3 border-2 border-slate-300 rounded-lg text-black font-bold" />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="font-bold text-slate-700">Student ID</label>
                <input name="studentId" onChange={handleChange} required className="w-full p-3 border-2 border-slate-300 rounded-lg text-black font-bold" />
              </div>
              <div>
                <label className="font-bold text-slate-700">Date of Birth</label>
                <input name="dateOfBirth" type="date" onChange={handleChange} required className="w-full p-3 border-2 border-slate-300 rounded-lg text-black font-bold" />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700">Phone</label>
              <input name="phone" onChange={handleChange} required className="w-full p-3 border-2 border-slate-300 rounded-lg text-black font-bold" />
            </div>

            <div>
               <label className="font-bold text-slate-700">Address (Optional)</label>
               <input name="address" onChange={handleChange} className="w-full p-3 border-2 border-slate-300 rounded-lg text-black font-bold" />
            </div>

            <button type="submit" disabled={loading} className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-slate-800">
              {loading ? "Saving..." : "Create Student"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}