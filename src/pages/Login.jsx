import '../css/Login.css';
import { useHistory } from 'react-router-dom';
import { useState, useContext } from 'react';
import { cartContex } from '../CartContex';
import { Link } from 'react-router-dom';

const Login = () => {
    const histroy = useHistory();
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const { setUser, setIsAuth, database } = useContext(cartContex);    

    const signIn = (e) => {
        e.preventDefault();

        if(!email || !pass) {
            alert("Please fill all fields.");
            return;
        }

        try {
            if(database[email]){
                if(database[email].pass === pass){
                    setIsAuth(true);
                    setUser(database[email]);
                    alert("LOGIN SUCCESSFULLY!");
                    histroy.push('/');
                    return;
                }
            } else {
                alert("Wrong E-mail or Password. Try again!");
                return;
            }
        } catch (error) {            
            alert("Wrong E-mail or Password. Try again!");
        }        
    }    

    return (
            <div className="login">                        
                <Link to="/">
                    <img src="https://pngimg.com/uploads/amazon/amazon_PNG21.png" alt="amazon-logo" />
                </Link>  
                <div className="login-container">
                    <h1>Sign-in</h1>
                    <div className="login-input">
                        <div className="login-user login-username">
                            <label className="username">E-mail</label>
                            <input type="text" value={email} onChange={(e)=> setEmail(e.target.value)} />
                        </div>
                        <div className="login-user login-password">
                            <label className="password">Password</label>
                            <input type="password" value={pass} onChange={(e)=> setPass(e.target.value)} />
                        </div>                    
                    </div>
                    <button className="login-btn" type="button" onClick={signIn}>Sign In</button>
                    <div className="login-newAccount">
                        <p>
                            By signing-in you agree to Amazon conditions of Users & Sale. Please see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                        </p>
                        <Link to="/register">
                            <button type="button">Create your Amazon Account</button>
                        </Link>                        
                    </div>
                </div>
            </div>
    )
}

export default Login
