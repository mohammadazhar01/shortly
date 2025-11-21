import { useState } from "react";
import CardUI from "./CardUI";
import { Link } from "react-router-dom";
import axios from "axios";
import { MdContentCopy } from "react-icons/md";
import toast from "react-hot-toast";

const AllLinks = ({ links, fetchLinks }) => {
    const domainURL = import.meta.env.VITE_BACKEND_URL;
    const [loading, setLoading] = useState(false);
  
    const deleteHandle = async (code) => {
        setLoading(true)
        const { data } = await axios.delete(`/api/links/${code}`);
        
        if (data.success) {
            setTimeout(() => setLoading(false), 500)
            toast.success("Deleted successfuly")
            fetchLinks();
        }
    };
    
    return (
    <CardUI>
        {links.length !== 0 ? 
        (loading ? (
          <p className="text-purple-500 text-center font-medium">Loading...</p>
        ) : (
        <>
            <h2 className="text-2xl font-bold mb-4 text-purple-700">
              All Links
            </h2>

            <div className="overflow-x-auto rounded-xl border border-purple-200">
              <table className="min-w-full text-left">
                <thead className="bg-purple-200/60">
                  <tr>
                    <th className="p-3 whitespace-nowrap">Code</th>
                    <th className="p-3 whitespace-nowrap">URL</th>
                    <th className="p-3 whitespace-nowrap">Clicks</th>
                    <th className="p-3 whitespace-nowrap">Last Clicked</th>
                    <th className="p-3 whitespace-nowrap">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {links.map((link) => (
                    <tr
                      key={link.code}
                      className="border-b hover:bg-purple-50 transition"
                    >
                      <td className="p-3 font-medium text-purple-700 flex items-center gap-1 whitespace-nowrap">
                        {link.code}
                        <MdContentCopy
                          onClick={() =>{
                            navigator.clipboard.writeText(`${domainURL}/${link.code}`)
                            toast.success("Copied!")
                          }
                            
                          }
                          className="cursor-pointer text-gray-600 hover:text-black"
                        />
                      </td>

                      <td className="p-3 truncate max-w-[150px] sm:max-w-xs">
                        {link.url}
                      </td>

                      <td className="p-3 whitespace-nowrap">{link.clicks}</td>

                      <td className="p-3 whitespace-nowrap">
                        {link.lastClicked
                          ? new Date(link.lastClicked).toLocaleString()
                          : "-"}
                      </td>

                      <td className="p-3 whitespace-nowrap space-x-3 flex items-center">
                        <Link
                          to={`/code/${link.code}`}
                          className="text-blue-600 font-medium hover:underline" >
                          View
                        </Link>

                        <button
                          onClick={() => deleteHandle(link.code)}
                          className="text-red-600 font-medium hover:underline" >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )
      ) : (
        <p className="text-red-500 text-center font-medium">
          No link added yet!
        </p>
      )}
    </CardUI>
  )
}

export default AllLinks;
