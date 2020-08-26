import React,{useState,useEffect} from 'react'
import '../Styles/sidebar.css';
import {Avatar, IconButton} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import SearchOutlined from '@material-ui/icons/Search';
import SidebarChat from '../components/SidebarChat';
import db from '../conifgs/config';
import {useSelector} from 'react-redux';

function Sidebar() {
    let user = useSelector(state => state.user);
    console.log(user);
    // const [userData, setUserData]=useState({});
    // setUserData(user);
    // console.log(userData, ':');
    // console.log('User from store:', userData)
    const [rooms,setRooms]=useState([]); //rooms is an array since default is an array

    //use Effect when the sidebar loads useEffect runs
    useEffect(()=>{
        //if the array is empty it will run once
    const unsubscribe = db.collection('Rooms').onSnapshot(snapshot=>{
            setRooms(snapshot.docs.map((doc)=>
                {
                    return {
                        id:doc.id,
                        data: doc.data()
                    }
                }
            ))
        })
        return ()=>{
            unsubscribe();
        }
    },[])    
    return (
        <div className="Sidebar">
            <div className="siderbar_header">
                <div className="HeaderInfo">
                    <Avatar src={user?.photoURL} />
                        <h3>
                            {user?.displayName || "qhizer shareef"}
                        </h3>
                </div>
                <div className="sidebar_headerRight">
                    <IconButton>
                        <DonutLargeIcon/>
                    </IconButton>
                    <IconButton>
                        <ChatIcon/>
                    </IconButton>    
                    <IconButton>
                        <MoreVertIcon/>     
                    </IconButton>   
                </div>
            </div>
            <div className="siderbar_search">
                <div className="sidebar_searchContainer">
                    <SearchOutlined className="icon"/>
                    <input type="text" placeholder="Search or start a new chat"/>
                </div>
            </div>
            
            {/* make chat as a component and use it here on useeffect pass the props */}
            <div className="sidebar_chats">
                <SidebarChat addNewChat/>
                {rooms.map((room)=>{
                    return (
                            <SidebarChat userName={room.data.name} recent={"hello there"} key={room.id} id={room.id} />
                    )
                })}
                {/* <SidebarChat userName={"qhizer"} recent={"hello there"} />
                
                <SidebarChat userName={"Amreen"} recent={"Bhaiyya"} /> */}
                
            </div>
            
        </div>
    )
}

export default Sidebar
