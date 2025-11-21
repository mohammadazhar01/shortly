import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";


const CheckHealth = () => {

  const [responseData, setResponseData] = useState([])
  const [uptime, setUptime] = useState("")
 
  const getHealth = async() => {
     const res = await axios.get('/healthz');
     console.log(res);
     setResponseData(res)
     setUptime(res.data.uptime)
  }
  useEffect(()=> {
   getHealth();

  }, [])

  return (
    <div className="mt-20 flex flex-col items-center justify-center bg-linear-to-br from-blue-50 to-purple-100 p-4 sm:p-6">

      <div className="bg-white/70 backdrop-blur-lg shadow-xl p-6 sm:p-10 rounded-2xl text-center border border-white/40 w-full max-w-sm sm:max-w-lg">

        <h1 className="text-2xl sm:text-4xl font-bold text-purple-500 mb-4">
          Response Status: {responseData.status}
        </h1>

        <h2 className="text-xl sm:text-2xl font-bold text-purple-800 mb-2">
          {responseData.statusText}
        </h2>

        <p className="text-gray-700  text-sm sm:text-base px-2">
          Server is Live!
        </p>

        <p className="text-gray-700 mb-6 text-sm sm:text-base px-2">
          <span className="text-red-700">Uptime: </span>{uptime}
        </p>

        <a
          href="/"
          className="bg-purple-600 text-white px-5 py-2 sm:px-6 sm:py-3 rounded-xl text-base sm:text-lg font-semibold hover:bg-purple-700 transition inline-block w-full sm:w-auto">
          Go Back Home
        </a>

      </div>
    </div>
  );
}

export default CheckHealth;
