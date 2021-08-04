import '../css/Order.css';
import { useContext } from 'react';
import { cartContex } from '../CartContex';
import OrderBox from '../components/OrderBox';

const Order = () => {
    const { user } = useContext(cartContex);

    return (
        <div className="order">
            <h2>Your Orders</h2>
            {
                user.orders.map(order => {
                    return <OrderBox key={order.id} products={order.cartProduct} order={order} />
                })
            }            
        </div>
    )
}

export default Order;