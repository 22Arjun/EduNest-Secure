"use client";
import { useEffect, useState } from "react";
import api from "@/utils/api";
import { Student } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaUserGraduate, FaPlus, FaExclamationTriangle, FaCalendar } from "react-icons/fa";

export default function StudentsListPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);

      const res = await api.get("/students"); 
      
      console.log("🔥 API RESPONSE:", res.data);


      let list: Student[] = [];
      
      if (Array.isArray(res.data)) {
        list = res.data;
      } else if (res.data.data && Array.isArray(res.data.data)) {
        list = res.data.data;
      } else if (res.data.students && Array.isArray(res.data.students)) {
        list = res.data.students;
      }

      setStudents(list);


      

    }  catch (err) {

        if (err instanceof Error) {
            console.error("Fetch Error:", err.message);
    }   else {
            console.error("An unknown error occurred:", err);
  }
        setError("Failed to load students. Is the backend running?");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        

        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">Student Directory</h1>
            <p className="text-slate-500 font-medium mt-1">
              View and manage {students.length} registered students
            </p>
          </div>
          <button 
            onClick={() => router.push("/dashboard/add")}
            className="flex items-center bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition shadow-lg transform active:scale-95"
          >
            <FaPlus className="mr-2" /> Add New Student
          </button>
        </div>


        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 flex items-center">
            <FaExclamationTriangle className="text-red-500 mr-3 text-xl" />
            <span className="text-red-700 font-bold">{error}</span>
          </div>
        )}


        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 bg-slate-200 rounded-2xl"></div>
            ))}
          </div>
        ) : (
          <>

            {students.length === 0 && !error ? (
              <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-slate-200">
                <FaUserGraduate className="mx-auto text-6xl text-slate-300 mb-4" />
                <h3 className="text-xl font-bold text-slate-700">No Students Found</h3>
                <p className="text-slate-500">Get started by adding a new student.</p>
              </div>
            ) : (

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {students.map((student) => (
                  <div key={student._id || student.studentId} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between">
                    
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div className="bg-slate-100 p-3 rounded-xl">
                          <FaUserGraduate className="text-slate-700 text-xl" />
                        </div>
                        {student.studentId && (
                          <span className="bg-blue-50 text-blue-800 text-xs font-bold px-3 py-1 rounded-full border border-blue-100">
                            {student.studentId}
                          </span>
                        )}
                      </div>
                      
                      <h2 className="text-xl font-bold text-slate-900 mb-1 truncate">
                        {student.firstName} {student.lastName}
                      </h2>
                      <p className="text-slate-500 text-sm font-medium mb-4 truncate">
                        {student.email}
                      </p>
                      
                      <div className="mb-4">
                        <span className="inline-flex items-center px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full border border-slate-200">
                            <FaCalendar className="mr-2 text-slate-400" />
                            {student.dateOfBirth 
                            ? new Date(student.dateOfBirth).toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'short', 
                                day: 'numeric' 
                                }) 
                            : "DOB Not Set"}
                        </span>
                       </div>
                    </div>

                    <Link 
                      href={`/dashboard/students/${student._id}`} 
                      className="block w-full text-center bg-slate-900 text-white py-3 rounded-xl font-bold text-sm hover:bg-blue-600 transition-colors mt-2"
                    >
                      View Profile
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}