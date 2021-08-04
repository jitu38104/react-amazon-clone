import '../css/Product.css';
import { useContext } from 'react';
import { cartContex } from '../CartContex';
import { stringPrice } from '../utils';
import { useHistory } from 'react-router-dom';
import StarIcon from '@material-ui/icons/Star';

const Product = (props) => {
    const {id, title, price, rating, img} = props.detail;
    const { user, setUser, isAuth, setDatabase, database } = useContext(cartContex); //user setUser
    const history = useHistory();
    
    const dbSaving = (userData) => {
        const _database = { ...database };
        _database[user.email] = userData;

        setDatabase(_database);   
    }

    const addToCart = (id, price) => {
        if(!isAuth){
            history.push('/login');
            return;
        }

        const _user = { ...user };
        const _cart = _user.cart;

        try {
            if(_cart.itemIndex[`${id}`]){
                _cart.itemIndex[`${id}`]++;
            } else {
                _cart.itemIndex[`${id}`] = 1;
            }
        } catch (error) {
            console.log(error);
        }        

        _cart.totalItem++;
        _cart.totalAmt += price;        

        setUser(_user);

        dbSaving(_user);
    }

    return (
        <div className="product">
            <div className="product-info">
                <h4>{ title }</h4>
                <span className="product-price">
                    <small>₹</small> 
                    <strong>{ stringPrice(price) }</strong>
                </span>
                <div className="product-rating">
                    {
                        Array(rating).fill("").map((x, i) => <StarIcon key={i} /> )
                    }                    
                </div>
            </div>

            <div className="product-img">
                <img src={ img } alt="prod-img" />
            </div>

            <div className="product-addBtn">
                <button type="button" onClick={ ()=>{ addToCart(id, price) } }>
                    Add to Cart
                </button>
            </div>
        </div>
    )
}

export default Product
