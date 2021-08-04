import './App.css';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { cartContex } from './CartContex';
import { useState, useEffect } from 'react';
import { getDatabase, addDatabase } from './utils';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Order from './pages/Order';
import Payment from './pages/Payment';
import Register from './pages/Register';
import Checkout from './pages/Checkout';

function App() {
  const [database, setDatabase] = useState({});  
  const [user, setUser] = useState({}); 
  const [isAuth, setIsAuth] = useState(false);
  
  const publishableKey = "pk_test_51J9YWaSB8Rl9bKhN3LptaEdSxdz3ejE02gS4kaecdOMleZWLQUnepyAqiPKT9IYEUi3QRqQjeD9NJo47BKVp0kDx00OKDQOUin";
  const promise = loadStripe(publishableKey);

  useEffect(() => {
    getDatabase('database').then(res => {
      setDatabase(res);
    });
    
  }, []);

  useEffect(() => {

    addDatabase('database', database);

  }, [database]);

  return (
    <cartContex.Provider value={{database, setDatabase, user, setUser, isAuth, setIsAuth}}> 
      <div className="App">
        <Router>          
          <Switch>
              <Route path="/login">
                <Login />
              </Route>              

              <Route path="/register">
                <Register />
              </Route>

              <Route path="/order">
                <Header />
                <Order />
              </Route>

              <Route path="/checkout/payment">                
                <Elements stripe={promise}>
                  <Payment />
                </Elements>                
              </Route>

              <Route path="/checkout" exact={true}>
                <Header />
                <Checkout />
              </Route>              
              
              <Route path="/" exact={true}>    
                <Header />                    
                <Home />
              </Route>
          </Switch>      
        </Router>      
      </div>
    </cartContex.Provider>
  );
}

export default App;
