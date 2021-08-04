import '../css/Login.css';
import { useState, useContext } from 'react';
import { cartContex } from '../CartContex';
import { Link } from 'react-router-dom'

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const { setUser, database, setDatabase } = useContext(cartContex);

    const register = (e) => {
        e.preventDefault();
        console.log("inside fun");
        if(!name || !email || !pass){
            alert("Please fill all fields.");
            return;
        }

        const userCart = {
            itemIndex: {},
            totalItem: 0,
            totalAmt: 0
        }

        const userData = { name, email, pass, cart: userCart, orders: [] };            

        try {                
            if(database[email]){
                    console.log("inside try deep");
                    alert("This E-mail already exists!");
                    return;
            } else {                
                const _user = {};
                _user[email] = userData;
                setUser(_user);
                setDatabase({ ...database, ..._user });    
            }
        } catch (error) {
            const _user = {};
            _user[email] = userData;
            setUser(_user);
            setDatabase({ ...database, ..._user });
        }

        setName('');
        setEmail('');
        setPass('');
        alert("REGISTERED SUCCESSFULLY!");        
    }

    return (
        <div className="login">
             <Link to="/">
                <img src="https://pngimg.com/uploads/amazon/amazon_PNG21.png" alt="amazon-logo" />
            </Link>  
            <div className="login-container">
                <h1>Sign-up</h1>
                <div className="login-input">
                    <div className="login-user login-name">
                        <label className="password">Name</label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} />
                    </div> 
                    <div className="login-user login-username">
                        <label className="username">E-mail</label>
                        <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="login-user login-password">
                        <label className="password">Password</label>
                        <input type="password" value={pass} onChange={e => setPass(e.target.value)} />
                    </div>                    
                </div>
                <button className="login-btn" type="button" onClick={register}>Register</button> 
                <div className="register-link">
                    <p>or</p>
                    <Link to="/login">
                        <p className='login-page'>Already have an account?</p>
                    </Link>                    
                </div>                
            </div>
        </div>
    )
}

export default Register
