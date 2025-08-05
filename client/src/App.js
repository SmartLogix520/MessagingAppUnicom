import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Inbox from "./pages/Inbox";
import useInterval from "use-interval";
import ContactUs from "./pages/ContactUs";
import Navbar from "./pages/Navbar";
import Footer from "./pages/Footer";
  import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Help from "./pages/Help";
// import Help from "./pages/Help";
// import ContactUs from "./pages/ContactUs";
// import Inbox from "./pages/Footer";
// import Inbox from "./pages/Navbar";
// import Inbox from "./pages/NavHelp";
import Compose from "./pages/Compose";
import ContinueTyping from "./pages/ContinueTyping";
import Sent from "./pages/Sent";
import Draft from "./pages/Draft";
import Trash from "./pages/Trash";
import Home from "./pages/Home";
import Reply from "./pages/Reply";
import DetailedEmail1 from "./pages/DetailedEmail1";
import Recup from "./pages/Recup";
import Favoris from "./pages/favoris";
// import Recupp from "./pages/Recupp";
import Forward from "./pages/Forward";
// import Homee from "./pages/Homee";
import DetailedEmail from "./pages/DetailedEmail"
import ProfileLayout from "./pages/ProfileLayout";
import PasswordUpdate from "./pages/PasswordUpdate";
import ResetPassword from "./pages/ResetPassword";
import ResetEmail from "./pages/ResetEmail";
import StartVideoMeeting from "./pages/StartVideoMeeting";
import VideoMeeting from "./pages/VideoMeeting";
import VideoCall from "./pages/VideoCall";
import ProfileHome from "./pages/ProfileHome";
import ProfilePicture from "./pages/ProfilePicture";
import MessengerLayout from "./pages/MessengerLayout";
import Messenger from "./pages/Messenger";
import ContactsLayout from "./pages/ConatctsLayout";
import AboutUss from "./pages/AboutUss";
import Contacts from "./pages/Conatcts";
import Group from "./components/Group"
import JournalAppels from "./components/JournalAppels"
// import Page404 from "./pages/Page404"
import Meet from "./pages/MeetPage"
import Recup2fa from "./pages/Recup2fa";
// import Help from "./pages/Help";
// import ContactUs from "./pages/ContactUs";

function App() {
  const [callingUser, setCallingUser] = useState(null);
  const [receivingCall, setReceivingCall] = useState(false);

  const acceptCall = async () => {

    setReceivingCall(false)

    const instance = axios.create({
      withCredentials: true
    });

    const params = {
      call_id: callingUser._id
    };

    instance.put(`${process.env.REACT_APP_API_LINK}calls/accept-call/${params.call_id}`)
      .then(function (res) {
        localStorage['call_id'] = callingUser.socket
        window.location.href = "/video-call/"
      })

      .catch(function (error) {
        console.log(error)
      });
  }

  const refuseCall = async () => {

    const instance = axios.create({
      withCredentials: true
    });

    const params = {
      call_id: callingUser._id
    };

    instance.put(`${process.env.REACT_APP_API_LINK}calls/refuse-call/${params.call_id}`)
      .then(function (res) {
        setReceivingCall(false)
        localStorage.removeItem('call_id')
      })

      .catch(function (error) {
        console.log(error)
      });
  }


  const fetchVideoCalls = () => {

    const instance = axios.create({
      withCredentials: true
    });

    const params = {
      receiver_id: localStorage["user_id"]
    };

    console.log(localStorage["user_id"])

    instance.get(`${process.env.REACT_APP_API_LINK}calls/fetch-calls`, { params: params })
      .then(function (res) {
        setCallingUser(res.data)

        if (res.data.receiver_id === localStorage["user_id"]) {
          console.log("working");
          setReceivingCall(true);
          if (receivingCall == true)
            document.getElementById("audio-component").play()
        }


      })
      .catch(function (error) {
        console.log(error)
      });
  }
  
  useInterval(() => {
    if (localStorage['email'])
    fetchVideoCalls();
  }, 3000); // p

  useEffect(() => {
    // getProfile()
  }, []);

  return (
    <div className="App">
       {receivingCall == true ? <div className="fixed inset-x-0 inset-y-0 flex items-center justify-center"><div className="fixed p-10 call-window bg-slate-50 shadow-xl rounded-md mt-20 bg-center mx-auto"><p className="mb-3">Somone is calling you</p><button className="bg-green-500 rounded-md px-10" onClick={() => acceptCall()}>Accept</button> <button className="bg-red-500 rounded-md px-10" onClick={() => refuseCall()}>Refuse</button></div>

<audio id="audio-component" controls loop>
  <source src={`https://firebasestorage.googleapis.com/v0/b/unicom-storage.appspot.com/o/phone-call-2.mp3?alt=media&token=4549f136-1975-44ce-a064-7d23ba2b7cbb`} />
</audio></div> : <></>}
      <BrowserRouter>
        <Routes>
        {/* <Route path="/Homee" element={<Homee />}></Route> */}

        <Route path="/Meet" element={<Meet />}></Route>
        <Route path="/ContactUs" element={<ContactUs/>}></Route>
        <Route path="/Home" element={<Home />}></Route>
        <Route path="/AboutUss" element={<AboutUss />}></Route>
        <Route path="/Help" element={<Help />}></Route>
        <Route path="/Navbar" element={<Navbar/>}></Route>
        <Route path="/Footer" element={<Footer/>}></Route>
        <Route path="/video-call" element={<VideoCall />}></Route>
        {/* <Route path="/Help" element={<Help />}></Route> */}
        {/* <Route path="/ContactUs" element={<ContactUs />}></Route> */}
          <Route path="/start-video-meeting" element={<StartVideoMeeting />}></Route>
          <Route path="/video-meeting/:roomID" element={<VideoMeeting />}>
          </Route>
          <Route path="/reset-email" element={<ResetEmail />}></Route>
          {/* <Route path="/Page404" element={<Page404 />}></Route> */}
          <Route path="/reset-password/:resetCode" element={<ResetPassword />}></Route>
          <Route path="/contacts/" element={<ContactsLayout />}>
            <Route index element={<Contacts />}></Route>
          </Route>
          <Route path="/messenger/" element={<MessengerLayout />}>
            <Route index element={<Messenger />}></Route>
            <Route path="/messenger/calls-journal" element={<JournalAppels />}></Route>
          </Route>
          <Route path="/profile/" element={<ProfileLayout />}>
            <Route index element={<ProfileHome />}></Route>
            <Route path="/profile/update-profile" element={<Profile />}></Route>
            <Route path="/profile/update-password" element={<PasswordUpdate />}></Route>
            <Route
              path="/profile/update-profile-picture"
              element={<Profile />}
            ></Route>
            {/* <Route path="/profile/update-pp" element={<ProfilePicture />}></Route> */}
          </Route>
          <Route path="/Register" element={<Register />}></Route>
          <Route path="/Login" element={<Login />}></Route>
          <Route path="/Recup" element={<Recup />}></Route>
          <Route path="/Recup2fa" element={<Recup2fa />}></Route>
          {/* <Route path="/Recupp" element={<Recupp />}></Route> */}
          <Route path="/Group" element={<Group />}></Route>
          <Route path="/" element={<Layout />}>

          <Route path="/DetailedEmail/:mailId" element={<DetailedEmail />}></Route>
          <Route path="/DetailedEmail1/:mailId" element={<DetailedEmail1 />}></Route>
            <Route path="/compose" element={<Compose />}></Route>
            <Route path="/continuetyping" element={<ContinueTyping />}></Route>
            <Route path="/inbox" element={<Inbox />}></Route>
            <Route path="/reply" element={<Reply />}></Route>
            <Route path="/forward" element={<Forward />}></Route>
            <Route path="/drafts" element={<Draft />}></Route>
            <Route path="/trash" element={<Trash />}></Route>
            <Route path="/sent" element={<Sent />}></Route>
            <Route path="/favoris" element={<Favoris />}></Route>
            
            <Route index element={<Inbox />}></Route>
          </Route>
          {/* <Route path="/chat" element={<Chat />}>
            <Route index element={<Chat />}></Route>
          </Route> */}
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;