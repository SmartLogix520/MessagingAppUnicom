import React, { useState } from 'react';
import axios from 'axios';
import { FaUndo } from 'react-icons/fa';

const Restore = ({ id, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const handleRestoreFromTrash = async () => {
    const confirmRestore = window.confirm("Êtes-vous sûr de vouloir restaurer cet e-mail ?");

    if (confirmRestore) {
        console.log('Trying to move to trash. Email ID:', id);
      try {
        setLoading(true);
        console.log('URL for the request:', `http://localhost:5000/trash/restore/${id}`);
        const response = await axios.put(`http://localhost:5000/trash/restore/${id}`);
        if (response.status === 200) {
          console.log('Email restored successfully');
          // Assurez-vous que onSuccess est une fonction définie
          if (typeof onSuccess === 'function') {
            onSuccess('Email restored successfully');
          }
          window.location.reload();
        } else {
          console.error('Failed to restore email');
        }
      } catch (error) {
        console.error('Error restoring email:', error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <a onClick={handleRestoreFromTrash} disabled={loading}>
      <FaUndo className={`text-gray-600 mx-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} />
    </a>
  );
};

export default Restore;
