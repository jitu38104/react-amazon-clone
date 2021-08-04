import '../css/Home.css';
import React from 'react'
import Product from '../components/Product';
import { fashion, furniture, electronics } from '../productData';

const Home = () => {
    return (
        <div className="home-container">
            <div className="home-banner">
                <img src="home-banner.jpg" alt="banner" />
            </div>
            
            <div className="home-row">
                <div className="home-products">
                    {
                        electronics.map(item => {
                            return <Product key={item.id} detail={item} />
                        })
                    }                                        
                </div>
                <div className="home-products">  
                    {
                        furniture.map(item => {
                            return <Product key={item.id} detail={item} />
                        })
                    }                                      
                </div>
                <div className="home-products">
                    {
                        fashion.map(item => {
                            return <Product key={item.id} detail={item} />
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Home
