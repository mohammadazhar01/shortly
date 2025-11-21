import Navbar from "./components/Navbar"
import './App.css'
import Dashboard from "./pages/Dashboard"
import axios from "axios";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import CheckHealth from "./pages/CheckHealth";
import SingleLinkStats from "./pages/SingleLinkStats";
import { Toaster } from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;


const App = () => {

  const [links, setLinks] = useState([])

   const fetchLinks = async() => {
    const { data } = await axios.get('/api/links')

    setLinks(data)
   }

  useEffect(() => {
    fetchLinks();
  }, [])

 

  return(
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-6">
      <Toaster />
      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard links = {links} fetchLinks = {fetchLinks}/>} />
        <Route path="/healthz" element={<CheckHealth />} />
        <Route path="/code/:code" element={<SingleLinkStats />} />
      </Routes>
      
    </div>
     
  )
}

export default App