# Shortly – URL Shortener  

**Shortly** is a full-stack URL shortening application built using **React**, **Node.js**, and **MongoDB**.  
It allows users to convert long URLs into short links and track basic analytics such as click counts.

---

## 📌 Project Description  

Shortly provides a simple interface to shorten URLs and track link usage.  
The backend handles URL mapping and redirection, while the frontend offers a clean and responsive UI for creating and managing shortened links.

---

## 🚀 Live Demo  

🔗 **Website:** https://shortlyshort.vercel.app
📁 **Repository:** https://github.com/mohammadazhar01/shortly  

---

## 🧩 Features  

- **Shorten any valid URL**
- **Optional custom aliases**
- **Track click analytics**
- **List view of created links**
- **Responsive UI design**
- **Backend redirection and tracking**

---

## 🛠️ Tech Stack  

| Category | Technologies |
|----------|-------------|
| Frontend | React, Vite, TailwindCSS |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| Deployment | Vercel (Frontend), Render (Backend) |
| Other | Axios, Mongoose |

---

## 📁 Folder Structure

shortly/ ├── client/        # React Frontend 
         ├── server/        # Node + Express Backend
         └── README.md
---

## 🧪 Requirements  

Before installation, ensure you have:

- Node.js (Latest LTS Recommended)
- npm or yarn
- MongoDB Atlas account or local MongoDB instance

---

## ⚙️ Installation  

Clone the repository:

```bash
git clone https://github.com/mohammadazhar01/shortly.git
```
```bash
cd shortly
```

---

## Install Dependencies

Frontend:

```bash
cd client
```
```bash
npm install
```

Backend:
```bash
cd ../server
```
```bash
npm install
```
---

## 🔐 Environment Variables

Create a .env file inside the /server folder and add:

- MONGO_URL = your_mongodb_connection_string
- PORT = 5000
- BASE_URL = http://localhost:5173

Create .env inside /client:

- VITE_BACKEND_URL = http://localhost:5000


---

## ▶️ Run the Project Locally

Start backend:

```bash
cd server
```
```bash
npm start
```

Start frontend:
```bash
cd ../client
```
```bash
npm run dev
```

Open the project locally at:

http://localhost:5173

---

## 👤 Author

Mohammad Azhar
GitHub: https://github.com/mohammadazhar01
