import React from 'react'
import '../Styles/Login.css';
import {auth, provider} from '../conifgs/config';
//import LoginWithEmail from './LoginWithEmail';
import { useDispatch } from "react-redux";
import * as ActionTypes from '../redux/ActionTypes';

//use props {setUser}
function Login() {

//    const [{},dispatch]= useStateValue();

    const dispatch = useDispatch();
    // const [emailPass, setEmailPass] =useState(false);
    const signIn=()=>{
        auth.signInWithPopup(provider)
            .then(result=>{
                console.log(result.user,result.user.displayName);
                dispatch({
                    type: ActionTypes.SET_USER,
                    user: result.user
                })
                //setUser(result.user.displayName)
            })
            .catch(e=> alert(e.message));
    }
    // const signinWithEmailPass=()=>{
    //     // alert('hello')
    //     setEmailPass(true);
    // }
    return (
        // emailPass?(
        //         <div>
        //             {/* <h1>hello</h1> */}
        //             <LoginWithEmail />
        //         </div>
        //     )
        //         :
        //    (
            <div className="LoginScreen">
                <div className="containerLogin">
                    <div className="Logo">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/597px-WhatsApp.svg.png" alt="Whatsapp Qhizer"/>
                    </div>
                    <div className="loginInfo">
                        <h4>Sign in to Whatsapp!</h4>
                        {/* <p onClick={signinWithEmailPass}>Signin with email password </p> */}
                        <p onClick={signIn}>Sign in With google</p>
                    </div>
                </div>
            </div>
        //)
    )
}

export default Login
