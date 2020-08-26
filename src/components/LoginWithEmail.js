import React from 'react'
import '../Styles/LoginWithEmail.css';
function LoginWithEmail() {
    return (
        <div className="LoginEmail">
            <div className="container">
                <form action="">
                    <input type="text" placeholder="Email" className="input"/>
                    <input type="password" placeholder="password" className="input" />
                    <input type="submit" placeholder="submit" className="sub"/>
                </form>
            </div>
        </div>
    )
}

export default LoginWithEmail;
