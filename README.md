# ProductManagement

A full-stack **Product Management Application** built using the **MERN Stack** (MongoDB, Express.js, React, Node.js).  
This project allows users to **upload, edit, search, and manage products** with an intuitive UI and backend API support.  

---

## 🚀 Features

- 📦 **Upload Products** with details like name, brand, price, and category
- ✏️ **Edit & Delete Products** easily
- 🔍 **Search Products** with query support
- 📱 **Responsive Design** (desktop & mobile friendly)
- 📊 Products **sorted by price** automatically
- ⚡ Backend API powered by **Express & MongoDB**
- 🌐 Deployed-ready structure (supports Vercel/Netlify for frontend & Render/Atlas for backend)

---

## 🛠️ Tech Stack

**Frontend:**
- React.js (Vite)
- React Router DOM
- Axios
- Tailwind CSS / Custom CSS

**Backend:**
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Multer (for file uploads, optional)
- dotenv

---

## 📂 Project Structure

ProductManagementApp/
│
├── backend/              # Express.js + MongoDB backend
│   ├── models/           # Mongoose schemas
│   ├── routes/           # API routes
│   ├── controllers/      # Business logic
│   ├── .env              # Environment variables (ignored in git)
│   └── server.js         # Backend entry point
│
├── frontend/             # React frontend
│   ├── src/
│   │   ├── components/   # Navbar, Footer, UI components
│   │   ├── Pages/        # Products, Upload, Edit, Search, Error
│   ├── .env              # Environment variables (ignored in git)
│   │   └── App.jsx       # Main app file
│   └── public/
│
├── .gitignore            # Ignores node_modules & .env
├── README.md             # Project documentation


---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/29Anirudh/ProductManagement.git
cd ProductManagement

# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install


