import React,{useState, useEffect} from 'react';
import '../Styles/Chat.css';
import {Avatar, IconButton} from '@material-ui/core';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import SearchOutlined from '@material-ui/icons/Search';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import {useParams} from 'react-router-dom';
import db from '../conifgs/config';
import {useSelector} from 'react-redux';
import firebase from 'firebase';

function Chat() {
    const [message, setMessage]= useState('');
    let {chatId} = useParams(); //chatId is obtained from header 
    const [roomName, setRoomName] =useState("");
    const [messages, setMessages] = useState([]);
    let user = useSelector(state => state.user);

    useEffect(()=>{
        if(chatId){ //if it exists
            db.collection('Rooms')
            .doc(chatId)
            .onSnapshot(
                  snapshot=>{
                      setRoomName(snapshot.data().name);
                  }
            );
            db.collection('Rooms')
              .doc(chatId)
              .collection('messages')
              .orderBy('timestamp','asc')
              .onSnapshot((snap)=>
                  setMessages(snap.docs.map(doc=>doc.data()))
            );

        }
    },[chatId])

    let sendMessage=(e)=>{
        e.preventDefault();
        let obj={
            message,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }
        console.log(message);
        db.collection('Rooms')
          .doc(chatId)
          .collection('messages')
          .doc()
          .set(obj)
          .then(()=>console.log('Uploaded!'));
        setMessage("");
        ResetForm();
        //add time new Date().toLocaleTimeString()
    }
    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar/>
                <div className="chat_headerInfo">
                    <strong>{roomName}</strong>
                    <p className="activeStatus">
                        {navigator.onLine?'Online':'Offline'}
                    </p>
                </div>
                <div className="chat_headerRight">
                    <IconButton>
                        <SearchOutlined/>
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                </div>
            </div>
            <div className="chat_body">
                {/* if message.name == user.displayName */}
                {messages.map((data)=>(
                        <p className={`chat_message ${data.name===user.displayName && "chat_Receiver"}`}  onChange={scrollToBottom}>
                            <span className="chat_name">{data.name}</span>
                            {data.message}
                            <span className="chat_timeStamp">
                                {new Date(data.timestamp?.toDate()).toUTCString()}
                            </span>
                        </p>
                    )
                )}
            </div>
            <div className="chat_footer">
                <IconButton>
                    <InsertEmoticonIcon />
                </IconButton>
                <form action="" id="myForm">
                    <input  onChange={(e)=>setMessage(e.target.value)} type="text" placeholder="Type a message!"/>
                    <button onClick={sendMessage} type="submit">Send a message!</button>
                </form>
                <IconButton>
                    <MicIcon/>
                </IconButton>
            </div>
        </div>
    )
}
const ResetForm=()=>{
    document.getElementById("myForm").reset();
}
function scrollToBottom(){
        var element = document.getElementById("yourDivID");
        element.scrollTop = element.scrollHeight;
}
export default Chat;
