import React, {useEffect, useState} from 'react'
import {Avatar, IconButton} from '@material-ui/core';
import '../Styles/sidebar.css';
import db from '../conifgs/config';
import {Link} from 'react-router-dom'

function SidebarChat({addNewChat,userName,recent,id}) {

    const [seed, setSeed] = useState('');
    const [message, setMessage]= useState('');
    
    useEffect(()=>{
        setSeed(Math.floor(Math.random()*5000));
    },[]);

    useEffect(()=>{// to use the last message
        if(id){
            db.collection('Rooms').doc(id).collection('messages').orderBy('timestamp','desc')
            .onSnapshot(snap=>(
                setMessage(snap.docs.map((doc)=>doc.data()))
            ))
        }
    },[id])//id is the dependancy, when only id is available

    const createChat=()=>{
        const userName= prompt('Enter the UserName ?');
        //if userName exists add to firebase userCollection
        if(userName){
            alert(userName+' is added to the chat');
            db.collection('Rooms').add({
                name:userName
            });
        }

    }

    return !addNewChat ?(
        <Link to={`/chat/${id}`}>
            <div className="sidebar_chat">
                    <div className="chatArea">
                        <IconButton>
                            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                        </IconButton>
                        <div className="chat_info">
                            <div className="sidebar_chatName">
                                <strong>{userName}</strong>
                            </div>
                            <div className="sidebar_chatRect">
                                {message[0]?.message}
                            </div>
                        </div>
                    </div>
            </div>
        </Link>
    ):(
        <div onClick={createChat} className="sidebar_chat">
            <h2 style={{textAlign:"center", cursor:"pointer"}}>Add New Chat</h2>
        </div>
    )
}

export default SidebarChat
