import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { MdContentCopy } from "react-icons/md";
import toast from 'react-hot-toast'

const SingleLinkStats = () => {
  const { code } = useParams();
  const [link, setLink] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const domainURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchLink = async () => {
      try {
        const { data } = await axios.get(`/api/links/${code}`);
        console.log(data)

        setLink(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchLink();
  }, [code]);

  const copyShortUrl = () => {
    navigator.clipboard.writeText(`${domainURL}/${code}`);
    setCopied(true);
    toast.success("Copied!")
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return <p className="text-center text-purple-600 mt-10">Loading...</p>;
  }

  if (!link) {
    return <p className="text-center text-red-500 mt-10">Link not found</p>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white/70 backdrop-blur-lg p-6 mt-10 rounded-2xl shadow-lg border border-purple-200">

      <h2 className="text-3xl font-bold text-purple-700 text-center mb-6">
        Link Statistics
      </h2>

      <div className="flex flex-col sm:flex-row justify-between items-center bg-purple-100 border border-purple-300 rounded-xl p-4 mb-6">
        <p className="text-purple-900 font-bold break-all text-center sm:text-left">
          {`${domainURL}/${link.code}`}
        </p>

        <button
          onClick={copyShortUrl}
          className="mt-3 cursor-pointer sm:mt-0 flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
        >
          <MdContentCopy />
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      <div className="space-y-4">

        <div className="p-4 bg-white border rounded-xl shadow-sm">
          <p className="text-gray-500 text-sm">Original URL</p>
          <p className="font-semibold break-all text-purple-800">{link.url}</p>
        </div>

        <div className="p-4 bg-white border rounded-xl shadow-sm">
          <p className="text-gray-500 text-sm">Total Clicks</p>
          <p className="font-bold text-xl text-purple-700">{link.clicks}</p>
        </div>

        <div className="p-4 bg-white border rounded-xl shadow-sm">
          <p className="text-gray-500 text-sm">Last Clicked</p>
          <p className="font-medium text-purple-700">
            {link.lastClicked ? new Date(link.lastClicked).toLocaleString() : "—"}
          </p>
        </div>

        <div className="p-4 bg-white border rounded-xl shadow-sm">
          <p className="text-gray-500 text-sm">Created At</p>
          <p className="font-medium text-purple-700">
            {new Date(link.createdAt).toLocaleString()}
          </p>
        </div>

      </div>
    </div>
  )
};

export default SingleLinkStats;
