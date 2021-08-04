import '../css/Header.css';
import { useContext } from 'react'
import { Link } from 'react-router-dom';
import { cartContex } from '../CartContex';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const Header = () => {
    const { user, setUser, isAuth, setIsAuth, database, setDatabase } = useContext(cartContex);

    const logOut = () => {        
        const _database = { ...database };
        _database[user.email] = user;

        setDatabase(_database);
        setIsAuth(false);
        setUser({});
    }

    return (
        <div className="header">
            <Link to="/">
                <img src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="brand-logo" />
            </Link>            
            <div className="header-search">
                <input type="text" className="search-bar" />
                <SearchIcon className="search-btn" />
            </div>
            <div className="header-nav">
                {isAuth
                ?                
                    <div className="header-link" onClick={logOut}> 
                        <span className="header-linkOne">Hello, {user.name}</span>
                        <span className="header-linkTwo">Sign Out</span>
                    </div>
                : 
                    <Link to="/login">
                        <div className="header-link">
                            <span className="header-linkOne">Hello, Guest</span>
                            <span className="header-linkTwo">Sign In</span>
                        </div>
                    </Link>                    
                }           

                {        
                isAuth 
                ?   
                    <Link to="/order">
                        <div className="header-link">
                            <span className="header-linkOne">Returns</span>
                            <span className="header-linkTwo">& Orders</span>
                        </div>
                    </Link>
                :
                    <div className="header-link">
                        <span className="header-linkOne arrow-cursor">Returns</span>
                        <span className="header-linkTwo arrow-cursor">& Orders</span>
                    </div>
                }

                <div className="header-link">
                    <span className="header-linkOne">Your</span>
                    <span className="header-linkTwo">Prime</span>
                </div>

                <Link to="/checkout">                
                    <div className="header-Cart">
                        <ShoppingCartIcon className="basket-icon" />
                        <span className="header-linkTwo total-item">
                            {isAuth? user.cart.totalItem : 0}       
                        </span>                                  
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Header
