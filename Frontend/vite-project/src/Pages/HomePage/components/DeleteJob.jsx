import React from 'react';
import axios from 'axios';

const DeleteJob = ({ jobId, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.post(`http://localhost:5000/delete-job/${jobId}`); // 👈 your line goes here
      console.log("Deleted job:", jobId);
      if (onDelete) onDelete(); // optional: refresh jobs list after delete
    } catch (error) {
      console.error("Error deleting job:", error);
      alert("Failed to delete job");
    }
  };

  return (
    <button 
      onClick={handleDelete}
      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
    >
      Delete
    </button>
  );
};

export default DeleteJob;
