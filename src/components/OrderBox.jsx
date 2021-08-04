import { useEffect, useState } from 'react';
import moment  from 'moment';
import CartItem from '../components/CartItem';

const OrderBox = ({ products, order }) => {
    const [prodId, setProdId] = useState([]);

    useEffect(() => {        
        setProdId(Object.keys(products));        
    }, [products]);

    return (
        <div className="order-container">
            <div className="order-header">
                <div className="order-id">
                    <h2>Order</h2>
                    <p>{ order.id }</p>
                </div>
                <h4>{ moment.unix(order.date).format('MMMM Do YYYY, h:mm:ss a') }</h4>
            </div>
            <div className="order-products">
                {
                    prodId.map(id => {
                        return <CartItem key={id} productId={id} isOrderPage={true} />
                    })
                }
            </div>
        </div>
    )
}

export default OrderBox
