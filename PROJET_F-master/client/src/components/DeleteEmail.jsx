import React, { useState } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
import 'remixicon/fonts/remixicon.css';

const DeletEmail = ({ id}) => {
  const [loading, setLoading] = useState(false);
  const[SuccessMessage,setSuccessMessage] = useState(false);

  const handleDeleteClick = async () => {
    const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer définitivement ce  l'email ?");

    if (confirmDelete) {
      console.log('Trying to move to trash. Email ID:', id);
      try {
        setLoading(true);
        console.log('URL for the request:', `http://localhost:5000/trash/Delete/${id}`);
        const response = await axios.delete(`http://localhost:5000/trash/Delete/${id}`);
        console.log('Response:', response);

        if (response.status === 200) {
          console.log('Email moved to trash successfully');
          // Assurez-vous que setSuccessMessage est une fonction définie
          if (typeof setSuccessMessage === 'function') {
            setSuccessMessage('Email moved to trash successfully');
          } 
          window.location.reload();
          } else {
            console.error('Failed to move email to trash');
          }
      } catch (error) {
        console.error('Error moving email to trash:', error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <a onClick={handleDeleteClick} disabled={loading}>
        <FaTrash className={`text-gray-600 mx-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} />
      </a>
    </div>
  );
};

export default DeletEmail;

