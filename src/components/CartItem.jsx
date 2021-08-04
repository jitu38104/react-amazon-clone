import { useEffect, useState, useContext } from 'react';
import StarIcon from '@material-ui/icons/Star';
import { cartContex } from '../CartContex';
import { stringPrice } from '../utils';
import { electronics, fashion, furniture } from '../productData';

const CartItem = (props) => {
    const [prodItem, setProdItem] = useState({});
    const { user, setUser, database, setDatabase } = useContext(cartContex);
    const prodId = props.productId;
    
    useEffect(()=>{
        const AllProducts = [ ...electronics, ...fashion, ...furniture ];
        const foundItem = AllProducts.filter(item => item.id === Number(prodId));
        setProdItem(foundItem[0]);
    }, [prodId]);   
    
    const dbSaving = (userData) => {
        const _database = { ...database };
        _database[user.email] = userData;

        setDatabase(_database);   
    }

    const removeItem = (id) => {
        const _user = { ...user }
        const _cart = _user.cart;
        _cart.totalAmt -= (prodItem.price * _cart.itemIndex[id]);
        _cart.totalItem -= _cart.itemIndex[id];        
        delete _cart.itemIndex[id];
        setUser(_user);
        dbSaving(_user);
    }

    const increase = () => {
        const _user = { ...user }
        const _cart = _user.cart;     
        _cart.itemIndex[prodItem.id]++;
        _cart.totalItem++;
        _cart.totalAmt += prodItem.price;
        setUser(_user);
        dbSaving(_user);
    }

    const decrease = () => {
        const _user = { ...user }
        const _cart = _user.cart;
        
        if(_cart.itemIndex[prodItem.id] !== 1){
            _cart.itemIndex[prodItem.id]--;
            _cart.totalItem--;
            _cart.totalAmt -= prodItem.price;
            setUser(_user);
            dbSaving(_user);
        }
    }

    return (
        <div className="cart-item">
            <img className="cart-prodImg" src={ prodItem.img } alt="prod-img" />
            <div className="cart-itemInfo">
                <div className="item-header">
                    <h3>{ prodItem.title }</h3>
                    <span>
                        <strong>₹ { stringPrice(prodItem.price) }</strong>
                    </span>
                    <div className="item-more">
                        
                        <p className="item-rating">
                            {Array(prodItem.rating).fill("").map((x, i) => <StarIcon key={i} /> )}
                        </p>

                        {
                            !props.isOrderPage 
                            ?
                                <div className="item-qty">
                                    <button type="button" className={ user?.cart?.itemIndex[prodItem.id] === 1 ? "disable-btn" : "dec-btn" } onClick={decrease}>-</button>
                                    <p>{ user?.cart?.itemIndex[prodItem.id] }</p>
                                    <button type="button" onClick={increase}>+</button>
                                </div>
                            :
                            ""
                        }                        

                    </div>                                
                </div>

                {
                    !props.isOrderPage 
                    ?
                        <button className="delBtn" type="button" onClick={() => {removeItem(prodId)}}>
                            Remove from cart
                        </button>
                    :
                        ""
                }
                
            </div>
        </div>                        
    );
}

export default CartItem
