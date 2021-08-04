import '../css/Payment.css';
import axios from '../axios';
import { stringPrice } from '../utils';
import { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { cartContex } from '../CartContex';
import CartItem from '../components/CartItem';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

const Payment = () => {
    const [products, setProducts] = useState([]);    
    const [error, setError] = useState(null);
    const [disable, setDisable] = useState(true);
    const [succeded, setSucceded] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [clientSecret, setClientSecret] = useState(null);

    const { user, database, setDatabase } = useContext(cartContex);
    const history = useHistory();
    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {                
        if(user.cart.itemIndex){
            setProducts(Object.keys(user.cart.itemIndex));
        }

        //generates the special stripe secret which allows us to charge the customer
        const getClientSecret = async() => {
            const response = await axios({
                method: 'post',
                url:    `/payment/create?total=${user.cart.totalAmt * 100}` //stripe expects the total amount in sub-currency units
            });
            setClientSecret(response.data.clientSecret);
        }
        getClientSecret();
    }, [user]);

    const createOrderSection = (paymentInfo) => {
        const paymentStatus = {
            id: paymentInfo.id,
            date: paymentInfo.created,
            amount: paymentInfo.amount / 100,
            cartProduct: user.cart.itemIndex
        }
        const _database = {...database};
        
        user.orders.unshift(paymentStatus);
        user.cart["itemIndex"] = {};
        user.cart["totalItem"] = 0;
        user.cart["totalAmt"] = 0;        
        
        _database[user.email] = user;
        setDatabase(_database);
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        setProcessing(true);

        stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(async({ paymentIntent }) => { //paymentIntent is a payment confirmation object            
            setSucceded(true);
            setError(null);
            setProcessing(false);

            console.log(paymentIntent);

            await createOrderSection(paymentIntent);

            history.replace('/');
        });
    }

    const handleChange = (e) => {
        if(e.error){
            setError(e.error.message);
        } else {
            setError(null);
        }      
        setDisable(e.empty);
    }

    return (
        <div className="payment">
            <Link to="/checkout">
                <h1>Checkout ({user.cart.totalItem} {user.cart.totalItem > 1 ? "items" : "item"})</h1>
            </Link>            
            <div className="payment-container">
                <div className="payment-add">
                    <h4>Delivery Address</h4>
                    <div className="add-details">
                        <p>House no-95,</p>
                        <p>Street no-5, B-block,</p>
                        <p>Uttrakhand enclave part-I,</p>
                        <p>Burari, Delhi-110084, India</p>
                    </div>
                </div>
                <hr/>
                <div className="payment-products">
                    <h4>Review items and delivery</h4>
                    <div className="checkout-products">
                        {user.cart.totalItem
                        ?            
                            products.map(id => {
                                return <CartItem key={id} productId={id} />
                            })                                                            
                        : history.replace('/checkout') }
                    </div>
                </div>
                <hr/>
                <div className="payment-method">
                    <h4>Payment Method</h4>
                    <div className="card-detail">
                        <h4>Card Details</h4>
                        <form onSubmit={handleSubmit}>
                            <div className="card-number">                            
                                    <CardElement onChange={handleChange} />                            
                            </div>
                            <div className="payment-amount">
                                <h4>Order Total: ₹ {stringPrice(user.cart.totalAmt)}</h4>
                                <button type="submit" disabled={processing || disable || succeded} className={`${processing || disable || succeded ? "disable-btn" : ""}`}>
                                    {processing ? "Processing..." : "Buy now"}
                                </button>
                            </div>
                            {error 
                            ?
                                <div className="payment-error">
                                    <h4>{error}</h4>
                                </div>
                            :
                                null
                            }                            
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment;