import React, { useState } from 'react';
import axios from 'axios';
import { FaRegStar } from 'react-icons/fa';

const DesFav = ({ id, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDesMarkAsFavorite = () => {
    setShowConfirmation(true);
  };

  const confirmDesMarkAsFavorite = async () => {
    try {
      setLoading(true);
      const response = await axios.put(`http://localhost:5000/favoris/des-fav/${id}`);
      if (response.status === 200) {
        console.log('Email removed from favorites successfully');
        window.alert('Email removed from favorites successfully');
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
      setShowConfirmation(false); 
    }
  };

  const cancelDesMarkAsFavorite = () => {
    setShowConfirmation(false);
  };

  return (
    <div>
      <a onClick={handleDesMarkAsFavorite} disabled={loading}>
      <svg id='staricon' xmlns="http://www.w3.org/2000/svg" className={`text-gray-600 mx-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" strokeWidth={0} fill="currentColor" />
      </svg>

      </a>

      {showConfirmation && <div className="backdrop-blur" />}

      {showConfirmation && (
        <div className="confirmation-popup">
          <p className='yesorno'>Are you sure you want to remove this email from your favourites?</p>
          <button className='yes' onClick={confirmDesMarkAsFavorite}>Yes</button>
          <button className='no' onClick={cancelDesMarkAsFavorite}>No</button>
        </div>
      )}

      <style>
        {` .backdrop-blur {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.2); 
          pointer-events: none;
        }
          .confirmation-popup {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: #F0F3FA;
            border-radius: 20px;
            border: none;
            padding: 20px;
            z-index: 999;
            height: 18vh;
          }

          .confirmation-popup button {
            margin: 0 10px;
            border-radius: 20px;
            color: white;
            font-size: 14px;
            padding: 1vh 2vw;
          }

          p {
            margin-top: 1vh;
            text-align: center;
            font-size: 15px;
            margin-bottom: 3vh;
          }
         
          .yes {
            background-color: #395886;
          }
          a svg#staricon {
            margin-right: 20px !important;
          }
          .no {
            background-color: red;
          }
        `}
      </style>
    </div>
  );
};

export default DesFav;
