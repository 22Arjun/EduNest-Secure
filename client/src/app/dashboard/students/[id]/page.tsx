"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/utils/api";
import { Student } from "@/types";
import { FaUserEdit, FaTrash, FaSave, FaTimes, FaArrowLeft } from "react-icons/fa";

export default function StudentDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [student, setStudent] = useState<Student | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<Student>>({});

  useEffect(() => {
    api.get(`/students/${id}`).then((res) => {
      const data = res.data.data || res.data;

      if(data.dateOfBirth) {
        data.dateOfBirth = data.dateOfBirth.split("T")[0];
      }
      setStudent(data);
      setFormData(data);
    });
  }, [id]);

  const handleUpdate = async () => {
    try {
      await api.put(`/students/${id}`, formData);
      alert("Student profile updated successfully.");
      setIsEditing(false);
      setStudent(formData as Student);
    } catch (error) {
      alert("Update failed.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!student) return (
    <div className="flex items-center justify-center min-h-screen text-slate-600 font-semibold">
      Loading Profile...
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Navigation & Actions Header */}
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={() => router.back()} 
            className="flex items-center text-slate-600 font-bold hover:text-slate-900 transition"
          >
            <FaArrowLeft className="mr-2" /> Back
          </button>
          
          <div className="flex gap-3">
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className={`flex items-center px-5 py-2.5 rounded-lg font-bold transition shadow-sm ${
                isEditing 
                ? "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50" 
                : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {isEditing ? <><FaTimes className="mr-2"/> Cancel</> : <><FaUserEdit className="mr-2"/> Edit Profile</>}
            </button>
          </div>
        </div>

        {/* Main Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          
          {/* Card Header with Name */}
          <div className="px-8 py-8 border-b border-slate-100 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
            <h1 className="text-3xl font-bold">
              {isEditing ? "Editing Profile" : `${student.firstName} ${student.lastName}`}
            </h1>
            <p className="text-slate-400 font-medium mt-1 tracking-wide">
              ID: {student.studentId}
            </p>
          </div>

          {/* Details Grid */}
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { label: "First Name", name: "firstName" },
              { label: "Last Name", name: "lastName" },
              { label: "Email Address", name: "email", type: "email" },
              { label: "Student ID", name: "studentId" }, // Added ID back to form in case you need to edit it
              { label: "Phone Number", name: "phone" },
              { label: "Date of Birth", name: "dateOfBirth", type: "date" },
              { label: "Address", name: "address", fullWidth: true },
            ].map((field) => (
              <div key={field.name} className={field.fullWidth ? "md:col-span-2" : ""}>
                <label className="block text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-2">
                  {field.label}
                </label>
                
                {isEditing ? (
                  <input 
                    name={field.name}
                    type={field.type || "text"}
                    value={formData[field.name as keyof Student] || ""}
                    onChange={handleChange}
                    className="w-full p-3 bg-slate-50 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:bg-white outline-none text-slate-900 font-bold transition"
                  />
                ) : (
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <p className="text-lg font-bold text-slate-900">
                      {String(student[field.name as keyof Student] || "-")}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Footer Actions (Save Button) */}
          {isEditing && (
            <div className="px-8 py-6 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button 
                onClick={handleUpdate}
                className="flex items-center bg-green-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700 shadow-md transition transform active:scale-95"
              >
                <FaSave className="mr-2" /> Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}