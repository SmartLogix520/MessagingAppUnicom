import axios from 'axios';
import { React, useEffect, useState } from 'react';
import DeletEmail from '../components/DeleteEmail.jsx';
import { useNavigate } from 'react-router-dom';
import Restore from '../components/restoreComponent.jsx';
import { FaEnvelopeOpen, FaSearch, FaTrash, FaUndo } from 'react-icons/fa';


function Trash() {
  const Navigate = useNavigate();
  const [data, setData] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  let [currentPage, setCurrentPage] = useState(1)
  const handleMailClick = (mailId) => {
    // Naviguer vers le contenu de l'e-mail
    Navigate(`/DetailedEmail/${mailId}`);
  };

  const getTrashes = () => {
    const instance = axios.create({
      withCredentials: true
    });
    
    const params = {
      pageSize: 10,
      pageNumber: currentPage, 
      emailSender: localStorage["email"]
    };
    
    instance.get(`${process.env.REACT_APP_API_LINK}trash/trashes-page`, { params: params })
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
    getTrashes()
  }

  const getPrevious = () => {
    currentPage = Number(currentPage) - 1
    if (currentPage < 1) return;
    getTrashes()
  }

  useEffect(() => {
    getTrashes()
  }, []);

  return (
    <div className="rounded">
      <table cellSpacing={2} cellPadding={5} border={1} className="border-collapse table-fixed w-full text-sm bg-white text-left">
        <thead>
        <th colSpan={0} className="leftborder"><svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 7l16 0" />
            <path d="M10 11l0 6" />
            <path d="M14 11l0 6" />
            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
          </svg></th>
          <th colSpan={2} className="">Adress</th>
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
                <td colspan={1} className="py-2 px-4 border-b border-gray-200 text-right" style={{ display: 'flex', gap: '-5px' }}>
                <p id='icons' className="flex text-xs">
                  <a className='restore'><Restore id={i._id} /></a>
                  <a className='delete'><DeletEmail id={i._id}  /></a>
                  <a href="#" className='icon-tabler-search'><svg xmlns="http://www.w3.org/2000/svg"key={i._id} onClick={() => handleMailClick(i._id)} className="text-gray-600 mx-2" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M9 6l6 6l-6 6" />
                        </svg></a></p>
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
      #icons{
        width:9vw !important;
      }
      .leftborder {
        border-radius: 20px 0 0 20px;
        padding-left: 20px;
      }
    
      .rightborder {
        border-radius: 0 20px 20px 0;
      }
      .try{
        display: flex;
        margin-right:0px;
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
        margin-right: 0px !important;
      }
    
      .icon-tabler-search {
        margin-right: 0px !important;
      }
      .restore{
        margin-left:-3vw;
      }
         `}
         </style>
    </div>
  );
}

export default Trash;
