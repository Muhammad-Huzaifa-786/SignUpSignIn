import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function SingleProduct() {
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const { id } = useParams();
const navigate = useNavigate();
    const addToCart = (product) => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
    };
    useEffect(() => {
        async function fetchProduct() {
            try {
                const res = await axios.get(`http://localhost:5000/product/singleProduct/${id}`);
                setProduct(res.data);
            } catch (err) {
                console.error('Error fetching product:', err);
            }
        }
        fetchProduct();
    }, [id]);

    const handleIncrement = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const handleDecrement = () => {
        setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    };


    if (!product) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>Single Product</h1>
            <button onClick={() => navigate('/cart')}>Go to Cart</button>

            <div style={{ border: '1px solid gray', padding: '20px', margin: '20px' }}>
                <img
                    style={{ width: '100%', maxWidth: '300px', margin: 'auto', border: '5px solid grey', position: 'relative', left: 'calc(50% - 150px)' }}
                    src={product.imageUrl ? product.imageUrl : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCmgkix4DEJoToCFKP-g8ztCYa9bIuxAC3pA&s'}
                    alt={product.name}
                />
                <h2>{product.name}</h2>
                <p>Price: {product.price}</p>
                <p>Description: {product.description}</p>
                <div style={{ gap: '10px', display: 'flex', alignItems: 'center', fontSize: '1.5rem' }}>
                    <button onClick={handleDecrement}>-</button>
                    <span>{quantity}</span>
                    <button onClick={handleIncrement}>+</button>
                </div>
                <br />
                <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
        </div>
    );
}

export default SingleProduct;