import React, { useState } from 'react';
import axios from 'axios';
import { FaRegStar } from 'react-icons/fa';

const DesFav = ({ id, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const handleDesMarkAsFavorite = async () => {
    const confirmDesMarkAsFavorite = window.confirm("Êtes-vous sûr de vouloir retirer cet e-mail de vos favoris ?");
  
    if (confirmDesMarkAsFavorite) {
      console.log('Trying to remove from favorites. Email ID:', id);
      try {
        setLoading(true);
        console.log('URL for the request:', `http://localhost:5000/favoris/des-fav/${id}`);
        const response = await axios.put(`http://localhost:5000/favoris/des-fav/${id}`);
        if (response.status === 200) {
          console.log('Email removed from favorites successfully');
          // Affiche un message de succès
          window.alert('Email removed from favorites successfully');
          // Assurez-vous que onSuccess est une fonction définie
          if (typeof onSuccess === 'function') {
            onSuccess('Email removed from favorites successfully');
          }
          window.location.reload();
        } else {
          console.error('Failed to remove email from favorites');
        }
      } catch (error) {
        console.error('Error removing email from favorites:', error.message);
      } finally {
        setLoading(false);
      }
    }
  };


  return (
    <a onClick={handleDesMarkAsFavorite} disabled={loading}>
      <FaRegStar className={`text-gray-600 mx-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} />
    </a>
  );
};

export default DesFav;
