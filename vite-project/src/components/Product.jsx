import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Product() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    // Fetch products when the component mounts
    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await axios.get('http://localhost:5000/product/');
                setProducts(res.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }
        fetchProducts();
    }, []); // Empty dependency array ensures this runs only once

    // Function to add product to cart and store in local storage

    return (
        <div>
            <h2>Products</h2>
            <button onClick={() => navigate('/cart')}>Go to Cart</button>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {products.map((product) => (
                    <div
                        style={{
                            width: '150px',
                            border: '4px solid green',
                            margin: '10px auto 10px auto',
                            padding: '10px',
                            textAlign: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                        }}
                        key={product._id}
                    >
                        <img style={{width:'100%'}} src={product.imageUrl ? product.imageUrl : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCmgkix4DEJoToCFKP-g8ztCYa9bIuxAC3pA&s"} alt="" />
                        <h3>{product.name}</h3>
                        <p>Price: {product.price}</p>
                        <p>{product.description}</p>
                        <button onClick={() => {navigate(`/products/${product._id}`)}}>View</button><br />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Product;