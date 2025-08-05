import React, { useEffect, useRef, useState } from "react";
import {useParams} from "react-router-dom"
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";

const Container = styled.div`
    padding: 20px;
    display: flex;
    height: 100vh;
    width: 90%;
    margin: auto;
    flex-wrap: wrap;
`;

const StyledVideo = styled.video`
    height: 40%;
    width: 30%;
    border: 1px solid #2222FF;
    padding: 10px;
    margin: 10px;
    border-radius: 15px
`;

const Video = (props) => {
    const ref = useRef();
   
    useEffect(() => {
        props.peer.on("stream", stream => {
            ref.current.srcObject = stream;
        })
    }, []);

    return (
        <StyledVideo playsInline autoPlay ref={ref} />
    );
}


const videoConstraints = {
    height: 200,
    width: 300
};

const MettingConference = (props) => {
    const [peers, setPeers] = useState([]);
    const socketRef = useRef();
    const userVideo = useRef();
    const peersRef = useRef([]);
    const roomID = useParams("roomID")
    const [isDesktop, setIsDesktop] = useState(false)

    const showDesktop = () => {
        setIsDesktop(!isDesktop)
    }

    const leaveVideoMeeting = () => {
        window.location.href = "/"
    }

    useEffect(() => {
        socketRef.current = io.connect(`${process.env.REACT_APP_SOCKET_SERVER}`);
        console.log(socketRef)
        if(!isDesktop) {
        navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true }).then(stream => {
            userVideo.current.srcObject = stream;
            socketRef.current.emit("join room", roomID);
            socketRef.current.on("all users", users => {
                const peers = [];
                users.forEach(userID => {
                    const peer = createPeer(userID, socketRef.current.id, stream);
                    peersRef.current.push({
                        peerID: userID,
                        peer,
                    })
                    peers.push(peer);
                })
                setPeers(peers);
            })

            socketRef.current.on("user joined", payload => {
                const peer = addPeer(payload.signal, payload.callerID, stream);
                peersRef.current.push({
                    peerID: payload.callerID,
                    peer,
                })

                setPeers(users => [...users, peer]);
            });

            socketRef.current.on("receiving returned signal", payload => {
                const item = peersRef.current.find(p => p.peerID === payload.id);
                item.peer.signal(payload.signal);
            });
        })

    } else {
        navigator.mediaDevices.getDisplayMedia({ video: videoConstraints, audio: true }).then(stream => {
            userVideo.current.srcObject = stream;
            socketRef.current.emit("join room", roomID);
            socketRef.current.on("all users", users => {
                const peers = [];
                users.forEach(userID => {
                    const peer = createPeer(userID, socketRef.current.id, stream);
                    peersRef.current.push({
                        peerID: userID,
                        peer,
                    })
                    peers.push(peer);
                })
                setPeers(peers);
            })

            socketRef.current.on("user joined", payload => {
                const peer = addPeer(payload.signal, payload.callerID, stream);
                peersRef.current.push({
                    peerID: payload.callerID,
                    peer,
                })

                setPeers(users => [...users, peer]);
            });

            socketRef.current.on("receiving returned signal", payload => {
                const item = peersRef.current.find(p => p.peerID === payload.id);
                item.peer.signal(payload.signal);
            });
        })}
    }, [isDesktop]);

    function createPeer(userToSignal, callerID, stream) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        });

        peer.on("signal", signal => {
            socketRef.current.emit("sending signal", { userToSignal, callerID, signal })
        })

        return peer;
    }

    function addPeer(incomingSignal, callerID, stream) {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        })

        peer.on("signal", signal => {
            socketRef.current.emit("returning signal", { signal, callerID })
        })

        peer.signal(incomingSignal);

        return peer;
    }

    return (
        <>
        <Container>
            <StyledVideo className="bg-blue-600" muted ref={userVideo} autoPlay playsInline />
            {peers.map((peer, index) => {
                return (
                    <Video className="border-blue-800 bg-blue-600 rounded-xl" key={index} peer={peer} />
                );
            })}
        </Container>
        <div class="fixed left-0 right-0 bottom-0 p-3 flex space-x-4 shadow-xl bg-slate-200 w-full place-items-center">
        <button className="px-3 py-2 bg-blue-600 text-white rounded-xl" onClick={showDesktop}>Show desktop</button>
        <button className="px-3 py-2 bg-blue-600 text-white rounded-xl" onClick={leaveVideoMeeting}>Leave meeting</button>
        </div>
       </>
    );
};

export default MettingConference;
