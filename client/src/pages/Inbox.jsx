import axios from 'axios';
import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmailComponent from '../components/emailComponent.jsx';
import { toast } from 'react-toastify';
function Inbox() {
  const Navigate = useNavigate();
  const [data, setData] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  let [currentPage, setCurrentPage] = useState(1)

  // Initialize emailCounts as an empty Map
  const [emailCounts, setEmailCounts] = useState(new Map()); ////// a ajouter

  const markAsRead = async (mailId) => {
    try {
      // Appel à l'API pour marquer l'e-mail comme lu
      await axios.put(`${process.env.REACT_APP_API_LINK}emails/markAsRead/${mailId}`);
    } catch (error) {
      console.error('Error marking email as read:', error.message);
    }
  };

  const handleMailClick = async (mailId) => {
    // Appeler la fonction pour marquer l'e-mail comme lu
    await markAsRead(mailId);

    // Mettre à jour la liste des e-mails
    getAllEmails();

    // Naviguer vers le contenu de l'e-mail
    Navigate(`/DetailedEmail/${mailId}`);
  };
  const getAllEmails = () => {
    const instance = axios.create({
      withCredentials: true
    });
    
    const params = {
      pageSize: 10,
      pageNumber: currentPage, 
      emailReceiver: localStorage["email"]
    }
    
    instance.get(`${process.env.REACT_APP_API_LINK}emails/inbox`, { params: params })
    .then(function (res) {
      setData(res.data.emails)
      setTotalPages(res.data.totalPages)
      setCurrentPage(res.data.page)
       // Update the email count for each sender
       res.data.emails.forEach(email => { 
        if (email.read === 0) { // Vérifiez si l'e-mail est non lu
          const senderName = email.email_sender;
          setEmailCounts(prevCounts => {
            const newCounts = new Map(prevCounts);
            const count = newCounts.get(senderName) || 0;
            newCounts.set(senderName, count + 1);
            return newCounts;
          });
        }
      });
      
    })
    
    .catch(function (error) {
      console.log(error)
    });
  }

  const formatDate = (date) => {
    return date.substring(0, 10) + " " + date.substring(11, 16)
  }
  
  const getNext = () => {
    if(currentPage >= totalPages) return;
    currentPage =  Number(currentPage) + 1
    getAllEmails()
  }

  const getPrevious = () => {
    currentPage =  Number(currentPage) - 1
    if(currentPage < 1) return;
    getAllEmails()
  }

  useEffect(() => {
    getAllEmails();
    emailCounts.forEach((count, senderName) => {
      toast.success(`${count} new email(s) received from ${senderName}!`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2675
      });
    });
  }, [currentPage]); //////////////// jusque ici
  
  return (
    <div className="rounded">
    <table cellSpacing={2} cellPadding={5} border={1} className="border-collapse table-fixed w-full text-sm bg-white text-left">
      <thead>
        <th colSpan={1} className="leftborder">
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-mail-opened" width={20} height={20} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M3 9l9 6l9 -6l-9 -6l-9 6" />
            <path d="M21 9v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10" />
            <path d="M3 19l6 -6" />
            <path d="M15 13l6 6" />
          </svg>
        </th>
        <th colSpan={2}>From</th>
        {/*<th colSpan={1}>cc</th> */}
        <th colSpan={5} >Subject</th>
        <th colSpan={2}>Date</th>
        <th colspan={1} className="rightborder"></th>
      </thead>
      <tbody>
        {data?.map((i) => {
          return (
            <tr className={i.read === 0 ? 'unread-row' : ''} onClick={() => handleMailClick(i._id)}>
              <td colSpan={0} className={`py-2 px-4 border-b border-gray-200 ${i.read === 0 ? 'unread' : ''}`}>
                <span>{i.read === 0 ? '-' : '+'}</span>
              </td>
              <td colSpan={2} className="py-2 px-4 border-b border-gray-200">{i.email_sender}</td>
              {/*<td colSpan={2} className="py-2 px-4 border-b border-gray-200">{i.cc}</td> */}
              <td colSpan={5} className="py-2 px-4 border-b border-gray-200">{i.subject}</td>
              <td colspan={2} className="py-2 px-4 border-b border-gray-200">{formatDate(i.sending_date)}</td>
              <td colspan={1} className="py-2 px-4 border-b border-gray-200 text-right">
                <p className="flex text-xs">
                  <a href="#"> <EmailComponent id={i._id} /></a>
                  <a title='Show details' href="#"><svg xmlns="http://www.w3.org/2000/svg"key={i._id} onClick={() => handleMailClick(i._id)} className="text-gray-600 mx-2" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M9 6l6 6l-6 6" />
                  </svg></a>
                </p>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
    <div className=" float-right mt-2">
        <div class="flex flex-col items-center">
          <div class="inline-flex mt-0.2 xs:mt-0">
            <button onClick={() => getPrevious()} className="prevnex">
              Prev
            </button>
            <span  class="text-sm text-gray-700 mx-3 my-1">
              Page <span class="font-semibold text-gray-900">{currentPage}</span> / <span class="font-semibold text-gray-900">{totalPages}</span>
            </span>
            <button onClick={() => getNext()} className="prevnex">
              Next
            </button>
          </div>
        </div>
      </div>
      <style>
        {`
      // .rounded {
      //   font-family: Arial, Helvetica, sans-serif;
      //   height:60%;
      //   bottom:0;
      // }
    
      .prevnex {
        background-color: #395886;
        padding: 5px 25px;
        color: white;
        border-radius: 20px;
        font-size: 14px;

      }
      
    
      .prevnex:active {
        opacity: 0.7;
      }
    
      th {
        background-color: #f0f3fa;
        padding: 5px;
        font-family: Arial, Helvetica, sans-serif;
        color: #395886;
        font-weight: bold;
        font-size: 14px;
      }
    
      .leftborder {
        border-radius: 20px 0 0 20px;
        padding-left: 20px;
      }
    
      .rightborder {
        border-radius: 0 20px 20px 0;
      }
    
      .bouttons {
        display: inline-flex;
        color: #395886 !important;
        border-radius:20px;
      }
    
      .bouttons a {
        display: flex;
        align-items: center;
        margin-right: 10px;
        color: #395886;
      }
     
      .icon-tabler-trash {
        margin-right: 5px;
      }
    
      .icon-tabler-search {
        margin-right: 5px;
      }
      .unread-row {
        background-color: #9ec3fa; /* Couleur grise transparente */
      }
         `}
         </style>
    </div>
  );
}

export default Inbox;
