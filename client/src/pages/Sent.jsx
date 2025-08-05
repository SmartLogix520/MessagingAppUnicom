import axios from 'axios';
import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmailComponent from '../components/emailComponent.jsx';
import { FaBoxOpen, FaCheck, FaEnvelopeOpen, FaSearch, FaTrash } from 'react-icons/fa';

function Sent() {
  const Navigate = useNavigate();
  const [data, setData] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  let [currentPage, setCurrentPage] = useState(1)
  
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
  const getAllEmails = async () => {

    const instance = axios.create({
      withCredentials: true
    });
    
    const params = {
      pageSize: 10,
      pageNumber: currentPage, 
      emailSender: localStorage["email"],
      emailCC: localStorage["email"]  // Ajoutez cette ligne pour inclure les emails en copie
    };
    
    instance.get(`${process.env.REACT_APP_API_LINK}emails/sent`, { params: params })
    .then(function (res) {
      setData(res.data.emails)
      setTotalPages(res.data.totalPages)
      setCurrentPage(res.data.page)
    })
    .catch(function (error) {
      console.log(error)
    });
  }

  const formatDate = (date) => {
    return date.substring(0, 10) + " " + date.substring(11, 16)
  }

  const getNext = () => {
    if (currentPage >= totalPages) return;
    currentPage = Number(currentPage) + 1
    getAllEmails()
  }

  const getPrevious = () => {
    currentPage = Number(currentPage) - 1
    if (currentPage < 1) return;
    getAllEmails()
  }

  useEffect(() => {
    getAllEmails()
  }, []);

  return (
    <div className="rounded">
      <table cellSpacing={2} cellPadding={5} border={1} className="border-collapse table-fixed w-full text-sm bg-white text-left">
        <thead>
          <th colSpan={0} className="leftborder"><svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-mail-fast" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M3 7h3" />
            <path d="M3 11h2" />
            <path d="M9.02 8.801l-.6 6a2 2 0 0 0 1.99 2.199h7.98a2 2 0 0 0 1.99 -1.801l.6 -6a2 2 0 0 0 -1.99 -2.199h-7.98a2 2 0 0 0 -1.99 1.801z" />
            <path d="M9.8 7.5l2.982 3.28a3 3 0 0 0 4.238 .202l3.28 -2.982" />
          </svg></th>
          <th colSpan={2} className="">To</th>
          <th colSpan={5} className="" >Subject</th>
          <th colSpan={2} className="">Date</th>
          <th colspan={1} className="rightborder"></th>
        </thead>
        <tbody>
          {data?.map((i) => {
            return (
              <tr>
                <td colSpan={0} className="py-2 px-4 border-b border-gray-200"><span>{i.read === 0 ? '-' : '+'}</span></td>
                <td colSpan={2} className="py-2 px-4 border-b border-gray-200">{i.email_receiver}</td>
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
         `}
         </style>
    </div>
  );
}

export default Sent;
