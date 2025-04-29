import React, { useState } from 'react';
import axios from 'axios';

const DeleteJob = ({ jobId, onDelete }) => {
  const [message, setMessage] = useState(""); // 👈 for success message

  const handleDelete = async () => {
    try {
      await axios.post(`https://your-backend-url-on-render.com/api/v1/delete-job/${jobId}`);
 // make sure URL matches your server
      console.log("Deleted job:", jobId);
      setMessage("Job deleted successfully! ✅"); // 👈 set success message
      if (onDelete) onDelete(); // refresh list
    } catch (error) {
      console.error("Error deleting job:", error);
      alert("Failed to delete job ❌");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button 
        onClick={handleDelete}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Delete
      </button>

      {/* show message if available */}
      {message && (
        <p className="mt-2 text-green-600 font-semibold">{message}</p> 
      )}
    </div>
  );
};

export default DeleteJob;
