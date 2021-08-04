import '../css/Checkout.css';
import { stringPrice } from '../utils';
import { useHistory } from 'react-router-dom';
import { cartContex } from '../CartContex';
import CartItem from '../components/CartItem';
import { useEffect, useState, useContext } from 'react';

const Checkout = () => {
    const history = useHistory();
    const [products, setProducts] = useState([]);
    const { user, isAuth } = useContext(cartContex);

    useEffect(() => {                
        if(user?.cart?.totalItem){
            setProducts(Object.keys(user?.cart?.itemIndex));
        }
    }, [user]);

    return (
        <div className="checkout">
            <div className="checkout-left">
                <img 
                className="checkout-banner"
                src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
                alt="checkout-img"                         
                />
                <h1>Your Shopping Cart</h1>

                <hr/>

                <div className="checkout-cart" style={{ position: 'relative' }}>

                    {user?.cart?.totalItem
                    ?            
                        products.map(id => {
                            return <CartItem key={id} productId={id} />
                        })                                                            
                    : ''}                    

                </div>
                
            </div>

            <div className="checkout-right">
                <div className="cart-totalAmount">
                    <h1>
                        Sub-total ({user?.cart?.totalItem} {user?.cart?.totalItem>1 ? "items" : "item"}): <strong>₹ { stringPrice(user?.cart?.totalAmt) }</strong>
                    </h1>
                    <div className="cart-agree">
                        <input type="checkbox" />
                        <p>This offer contains a gift</p>
                    </div>
                    {isAuth
                    ?            
                        <button disabled={!user?.cart?.totalItem ? true : false} className={!user?.cart?.totalItem ? "disable-btn" : ""}  type="button" onClick={()=>history.push('/checkout/payment')}>
                            proceed to Checkout
                        </button>                                                            
                    : 
                        <button disabled className="disable-btn">
                            proceed to Checkout
                        </button>}                    
                </div>
            </div>

        </div>
    )
}

export default Checkout;
