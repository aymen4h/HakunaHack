import styleChat from './Chat.module.css';
import Navbar from '../navbar/Navbar';
import { useState, useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';
import { GetMessages, GetMoreMessages, CreateNewChatRoom, getChatRoomByName, getChatRoomByuserId, joinChatRoomCall } from '../../store/ApiCalls';
import * as signalR from '@microsoft/signalr';
import Avatar from 'react-avatar';
import ReactDOM from 'react-dom';

function Chat1(){
    const [roomName, setRoomName] = useState([]);
    const [radioValue, setRadioValue] = useState('');
    const [rooms, setRooms] = useState();
    const [chatRName, setChatRName] = useState();
    const [messages, setMessages] = useState();
    const [cRID, setCRID] = useState();
    const [msgContent, setMsgContent] = useState();
    const [lastMsg, setLastMsg] = useState();
    const [moreMsg, setMoreMsg] = useState();
    const [tre,setTre] = useState(true);
    const navigate = useNavigate()
    const userObject = JSON.parse(localStorage.getItem('user'));
    const userID = userObject.userS.id;
    const connection = new signalR.HubConnectionBuilder()
            .withUrl("http://localhost:5265/chat")
            .build();
            
            connection.start().then(() => {
                console.log("connected");
            }).catch(err => console.error(err.toString()));
    const createRoom = async(e) => {
        e.preventDefault();
        const userObject = JSON.parse(localStorage.getItem('user'));
        const userId = userObject.userS.id;
        const res = await CreateNewChatRoom({
            userId: userId,
            name: roomName
        });
        document.getElementsByClassName(styleChat.ajoutRoom)[0].hidden = true;
    }
    const jjoinRoom = async(e) => {
        e.preventDefault();
        const userObject = JSON.parse(localStorage.getItem('user'));
        const userId = userObject.userS.id;
        const res = await joinChatRoomCall({
            userId: userId,
            name: roomName
        });
        document.getElementsByClassName(styleChat.ajoutRoom)[0].hidden = true;
        navigate('/chat');
    }

    const searchbyRoomName = async(e) => {
        e.preventDefault();
        
        const res = await getChatRoomByName(roomName);
        if(res.status === 200){
            const data = await res.json();
            setRooms(data);
        }
    }

    const handleScroll = async (e) => {
        const { scrollTop, scrollHeight, clientHeight } = e.target;
        console.log("scrol")
        if (scrollTop <= 5) {
            let spinner = document.createElement('span');
            spinner.className = styleChat.loader;
            document.getElementById(styleChat.msgdiv).appendChild(spinner);
            setTre(false);
            const res = await GetMoreMessages(cRID, lastMsg);
            if (res.status === 200) {
                const data = await res.json();
                //setMoreMsg(ddata);
                if(data.length === 10){
                    setLastMsg(data[data.length - 1].sentAt);
                    setTre(true);
                }
                //data.reverse();
                console.log(data);
                addMoreMsg(data);
                
            }
            e.target.removeChild(spinner);
        }
    };
    const addMoreMsg = (msgss) => {
        msgss.map((mms) => {
            const isUserMessage = userID === mms.senderId;
            const msgClass = isUserMessage ? styleChat.mine : styleChat.yours;
            const divmsgclass = document.createElement('div');
            divmsgclass.className = msgClass;
            divmsgclass.id = "hada";
            const msgcon =document.createElement('p');
            msgcon.className = styleChat.messg;
            msgcon.innerText = mms.content;
            const puser = document.createElement('p');
            puser.className = styleChat.pusername;
            puser.innerText = mms.userName;
            const avContainer = document.createElement('div');
            avContainer.className = styleChat.avacontainer;
            if(isUserMessage){
                divmsgclass.appendChild(msgcon);
                divmsgclass.appendChild(avContainer);
                divmsgclass.appendChild(puser);
            }
            else{
                
                divmsgclass.appendChild(avContainer);
                divmsgclass.appendChild(msgcon);
                divmsgclass.appendChild(puser);
            }
            const avatarElement = (<Avatar name={mms.userName} round={true} size="40" className={styleChat.avauserr} /> );
            ReactDOM.render(avatarElement, avContainer);
            document.getElementById(styleChat.msgdiv).insertBefore(divmsgclass, document.getElementById(styleChat.msgdiv).firstChild);
        });
    }
    const envoyerMsg = (e) => {
        e.preventDefault();
        const userObject = JSON.parse(localStorage.getItem('user'));
        const userId = userObject.userS.id;
        const userName = userObject.userS.name;
        connection.invoke("SendMessage", cRID.toString(), userId, msgContent, userName)
            .catch(err => console.error(err.toString()));
        
    }


    const getMessagesf = async(id, chName) => {
        if(cRID){
            leaveChatRoom(id.toString());
        }
        setChatRName(chName);
        joinChatRoom(id.toString());
        const res = await GetMessages(id);
        if(res.status === 200){
            const data = await res.json();
            if(data.length === 10){
                setLastMsg(data[data.length - 1].sentAt);
            }
            console.log(data);
            setMessages(data.reverse());
            
        }
        setCRID(id);
    }

    const joinChatRoom = (roomid) => {
        const rro = roomid.toString();
        
        connection.invoke("JoinChatRoom", rro)
            .catch(err => console.error(err.toString()));
    };
    const leaveChatRoom = (roomId) => {
        connection.invoke("LeaveChatRoom", roomId.toString())
            .catch(err => console.error(err.toString()));
    };
    connection.on("ReceiveMessage", (userId, message, userName) => {
        //console.log(`${userId} name ${userName} says ${message}`);
        /*const li = document.createElement("p");
        li.textContent = `${userId} name ${userName} says ${message}`;
        document.getElementById(styleChat.msgdiv).appendChild(li);*/
        const isUserMessage = userID === userId;
        const msgClass = isUserMessage ? styleChat.mine : styleChat.yours;
        const divmsgclass = document.createElement('div');
        divmsgclass.className = msgClass;
        divmsgclass.id = 'hada';
        const msgcon =document.createElement('p');
        msgcon.className = styleChat.messg;
        msgcon.innerText = message;
        const puser = document.createElement('p');
        puser.className = styleChat.pusername;
        puser.innerText = userName;
        const avContainer = document.createElement('div');
        avContainer.className = styleChat.avacontainer;
        if(isUserMessage){
            divmsgclass.appendChild(msgcon);
            divmsgclass.appendChild(avContainer);
            divmsgclass.appendChild(puser);
        }
        else{
            
            divmsgclass.appendChild(avContainer);
            divmsgclass.appendChild(msgcon);
            divmsgclass.appendChild(puser);
        }
        const avatarElement = (<Avatar name={userName} round={true} size="40" className={styleChat.avauserr} /> );
        ReactDOM.render(avatarElement, avContainer);
        document.getElementById(styleChat.msgdiv).appendChild(divmsgclass);
        window.scrollTo({
            top: document.getElementById(styleChat.msgdiv).scrollHeight,
            behavior: 'smooth' // Pour un défilement en douceur
        });

        
    });
  
    useEffect(() => {
        const fet = async() => {
            const res = await getChatRoomByuserId();
            if(res.status === 200){
                const data = await res.json();
                setRooms(data);
                console.log(data)
            }
        }


        fet();
    },[messages, chatRName]);
    useEffect(()=> {
        let nodeList = document.querySelectorAll('#hada');
        for (let i = 0; i < nodeList.length; i++) {
            document.getElementById(styleChat.msgdiv).removeChild(nodeList[i]);
        }
        setTre(true);
    },[chatRName])
    return(
        <>
            <Navbar />
            <div className={styleChat.container}>
                <div className={styleChat.left}>
                    <form className={styleChat.search} onSubmit={searchbyRoomName}>
                        <input name='search' id={styleChat.inputsearch} placeholder='Search For ChatRoom' onChange={(e) => setRoomName(e.target.value)} />
                        
                        <input type='submit' id={styleChat.searchbtn} value='Search' />
                    </form>


                   
                    <div className={styleChat.lesUser}>
                        {rooms && (
                            rooms.map((room, index) => (
                                <div className={styleChat.roomCon} onClick={() => getMessagesf(room.chatRoomId, room.chatRoomName)}>
                                <Avatar name={room.chatRoomName} round={true} size='40' className={styleChat.ava} />
                                <h1 key={index} className={styleChat.roomName} >
                                    {room.chatRoomName}
                                </h1>
                                </div>
                            ))
                        )}
                    </div>


                    
                    <div className={styleChat.ajoutRoom} >
                        <form onSubmit={createRoom} >
                            <input name='search' placeholder='Enter ChatRoom Name' id={styleChat.inputchname} onChange={(e) => setRoomName(e.target.value)} />
                            <input type='submit' value="Create Room" id={styleChat.btncreate}/>
                        </form>
                        <input type='submit' value="Join Room" onClick={jjoinRoom} id={styleChat.btnjoin} />
                    </div>
                </div>
                <div className={styleChat.right}>
                    {messages && (
                        <div id={styleChat.headroom}>
                            <Avatar name={chatRName} round={true} size='60' className={styleChat.avahead} />
                            <h1 id={styleChat.namehead}>{chatRName}</h1>
                        </div>
                    )}
                    
                    <div id={styleChat.msgdiv} onScroll={(e) => {
                        if(tre){
                            handleScroll(e);
                        }
                    }}>
                    
                    {messages && 
                        messages.map((msg) => {
                            const isUserMessage = userID === msg.senderId;
                            const msgClass = isUserMessage ? styleChat.mine : styleChat.yours;
                    
                            return (
                                <div key={msg.id}  className={msgClass}>
                                    {isUserMessage && <p className={styleChat.messg} title={msg.sentAt.split(':')[0]+':'+ msg.sentAt.split(':')[1]}>
                                        {msg.content}
                                    </p>
                                }
                                    <Avatar name={msg.userName} round={true} size='40' className={styleChat.avauserr} />
                                    {!isUserMessage && <p className={styleChat.messg} title={msg.sentAt.split(':')[0]+':'+ msg.sentAt.split(':')[1]}>{msg.content}</p>}
                                    <p className={styleChat.pusername}>{msg.userName}</p>
                                </div>
                            );
                        })
                    }
                    </div>
                    
                    {messages && (
                        <form id={styleChat.formenvoie} onSubmit={envoyerMsg}>
                            <input name='msg' id={styleChat.msgin} placeholder='Aa...' onChange={(e) => setMsgContent(e.target.value)} />
                            <input type='submit' value='Send' id={styleChat.msgenbtn} />
                            
                        </form>
                    )}
                </div>
            </div>
        </>
    );
}
export default Chat1;