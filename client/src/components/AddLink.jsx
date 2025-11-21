import { useState } from "react"
import CardUI from "./CardUI"
import axios from "axios"
import toast from "react-hot-toast"
import { MdContentCopy } from "react-icons/md";



const AddLink = ({fetchLinks}) => {

    const domainURL = import.meta.env.VITE_BACKEND_URL;

    const [longUrl, setLongUrl] = useState("")
    const [customCode, setCustomCode] = useState("")
    const [error, setError] = useState(null)

    const [creating, setCreating] = useState(false)
    const [shortUrl, setShortUrl] = useState("")
    const [copied, setCopied] = useState(false)

    const isValidUrl = (value) => {
        const pattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/;
        return pattern.test(value);
    };

    const isValidCode = (value) => {
        if (value.trim() === ""){
            return true; 
        }
        return /^[a-zA-Z0-9]+$/.test(value);
    };

    const createLink = async(e) => {
        try {
              e.preventDefault();
              setCreating(true)
              setError(null)

              if(!isValidUrl(longUrl)){
                setError("Please enter a valid URL.");
                setCreating(false);
                return;
              }

              if(!isValidCode(customCode)){
                setError("Code must contain only letters (a-z, A-Z, 0-9).");
                setCreating(false);
                return;
              }
      
              const res = await axios.post(`/api/links`,{url : longUrl, code: customCode,})
      
              if(res.status === 201) {
                 toast.success("Short URL Created");
                 setLongUrl("")
                 setCustomCode("")
                 console.log(res.data)
                 setShortUrl(`${domainURL}/${res.data.link.code}`)
                 fetchLinks()
                 setCreating(false)
              } 

        
            } catch (error) {
                if(error) {
                    console.log(error)
                   if(error.response.status === 409 ){
                       setError("Code already Exist!")
                       setShortUrl("")
                       setCreating(false)
                   }
                
                }
            }
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shortUrl)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    
    return (
    <CardUI>
        <h2 className="text-2xl text-center font-bold mb-4 text-purple-700 sm">
            Create Short Link
        </h2>
        
        <form onSubmit={(createLink)} className="space-y-4">
            <input type="text" placeholder="Enter long URL" className="w-full p-2 bg-white border-2 border-purple-200 rounded-xl 
             focus:ring-4 focus:ring-purple-300/50 focus:outline-none text-sm sm:text-base"value={longUrl}
             onChange={(e) => setLongUrl(e.target.value)} required />
                    
            <input type="text" placeholder="Custom code(Optional)" className="w-full p-2 bg-white border-2 border-purple-200
             rounded-xl focus:ring-4 focus:ring-purple-300/50 focus:outline-none text-sm sm:text-base"value={customCode}
             onChange={(e) => setCustomCode(e.target.value)} />
             
            {error && (
                <p className="text-red-600 text-sm font-medium">{error}</p>
            )}

            <button
              disabled={creating} className="w-full bg-purple-600 text-white cursor-pointer py-2 rounded-xl text-lg font-semibold
               hover:bg-purple-700 transition disabled:bg-gray-400 sm:text-base">
               {creating ? "Creating..." : "Create Shortly"}
            </button>
        </form>

        {shortUrl && (
        <div className={`mt-5 p-3 border rounded-xl flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-3
                ${copied ? "bg-green-100 border-green-300" : "bg-purple-100 border-purple-300"}`}>
    
            <p className="text-purple-800 font-semibold break-all text-center sm:text-left"> {shortUrl} </p>
            
            <div className="flex items-center gap-2">
                {copied && (
                    <span className="text-purple-600 font-medium text-sm">
                        Copied!
                    </span>
                )}
                
                <button onClick={copyToClipboard} className="px-2 py-2 cursor-pointer rounded-lg text-sm bg-purple-600 text-white
                 hover:bg-purple-700 transition shrink-0">
                    Copy <MdContentCopy className="inline"/>
                </button>
            </div>
        </div>
        )}
    </CardUI>
  )
}

export default AddLink