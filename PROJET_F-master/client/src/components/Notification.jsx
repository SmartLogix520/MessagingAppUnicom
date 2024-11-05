import React from 'react';
import './Notification.css';
import imge from '../images/profiles/imge.png';

const Notification = ({ name, onClick }) => {
    return (
        <div>
            <div className="notification-container" onClick={onClick}>
                <img src= {imge} alt={name} />
                <div className="notification-content">
                    <h4>UserName</h4>
                    
                    <p>Sent you a new message/mail</p>
                </div>
                <button className='buttonNotif'>X</button>
            </div>
        </div>

    );
};

export default Notification; 