# 🎓 EduNest - Modern Student Management System

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![Frontend](https://img.shields.io/badge/Frontend-Next.js_14-black)
![Backend](https://img.shields.io/badge/Backend-Node.js_%26_Express-green)
![Database](https://img.shields.io/badge/Database-MongoDB-forestgreen)
![Style](https://img.shields.io/badge/Style-Tailwind_CSS-38B2AC)

> **EduNest** is a robust, full-stack Student Management System designed to streamline administrative tasks for educational institutions. Featuring a stunning **Glassmorphism UI**, secure authentication flows, and real-time database management, it bridges the gap between complex data and user-friendly design.

---

## 📸 Project Previews

| **Glassmorphic Login Portal** | **Admin Dashboard** |
|:---:|:---:|
| <img src="./screenshots/login-page.png" alt="Login Page" width="400"/> | <img src="./screenshots/dashboard.png" alt="Dashboard" width="400"/> |
| *Secure, animated entry point with OTP support* | *Real-time statistics and quick actions* |

| **Student Directory** | **Profile Management** |
|:---:|:---:|
| <img src="./screenshots/student-list.png" alt="Student List" width="400"/> | <img src="./screenshots/profile-view.png" alt="Profile View" width="400"/> |

---

## ✨ Key Features

### 🔐 **Advanced Authentication**
* **Secure Admin Login:** JWT-based session management with auto-expiry.
* **OTP Password Recovery:** Full email-based reset flow (Forgot Password → OTP Verification → Reset).
* **Glassmorphism UI:** A visually stunning login interface with animated background elements.

### 🎓 **Student Management**
* **CRUD Operations:** Create, Read, Update, and Delete student records instantly.
* **Smart Search & Filtering:** (Coming Soon) Efficiently locate students by ID or Name.
* **Profile Views:** Detailed student profiles with formatted dates (e.g., "Jan 13, 2026") and academic details.
* **Auto-Credentials:** When a student is added, the system automatically generates a password and emails it to them.

### 🎨 **Modern UI/UX**
* **Responsive Design:** Fully optimized for Desktop, Tablet, and Mobile.
* **Interactive Elements:** Smooth transitions, loading states, and toast notifications.
* **Clean Architecture:** Built using the `slate` design system for a professional, distraction-free look.

---

## 🛠️ Tech Stack

### **Frontend (Client)**
* **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **State Management:** React Context API & Hooks
* **HTTP Client:** Axios
* **Icons:** React Icons (`fa`)

### **Backend (Server)**
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB (Mongoose ODM)
* **Authentication:** JWT (JSON Web Tokens) & Bcrypt
* **Email Services:** Nodemailer (SMTP)

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### **1. Clone the Repository**
```bash
git clone [https://github.com/your-username/EduNest.git](https://github.com/your-username/EduNest.git)
cd EduNest