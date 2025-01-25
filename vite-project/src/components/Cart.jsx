import React, { useState, useEffect } from 'react';

function Cart() {
    const [cart, setCart] = useState([]);

    // Retrieve cart items from local storage and set the state
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);
    }, []);

    // Function to update the cart in local storage
    const updateLocalStorage = (updatedCart) => {
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        setCart(updatedCart);
    };

    // Function to increase the quantity of an item
    const increaseQuantity = (index) => {
        const updatedCart = [...cart];
        if (!updatedCart[index].quantity) {
            updatedCart[index].quantity = 1;
        }
        updatedCart[index].quantity += 1;
        updateLocalStorage(updatedCart);
    };

    // Function to decrease the quantity of an item
    const decreaseQuantity = (index) => {
        const updatedCart = [...cart];
        if (!updatedCart[index].quantity) {
            updatedCart[index].quantity = 1;
        }
        if (updatedCart[index].quantity > 1) {
            updatedCart[index].quantity -= 1;
            updateLocalStorage(updatedCart);
        }
    };

    // Function to delete an item from the cart
    const deleteItem = (index) => {
        const updatedCart = [...cart];
        updatedCart.splice(index, 1);
        updateLocalStorage(updatedCart);
    };

    return (
        <div>
            <h2>Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {cart.map((item, index) => (
                        <div
                            key={index}
                            style={{
                                border: '1px solid #ccc',
                                padding: '10px',
                                margin: '10px',
                                width: '300px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <img src={item.imageUrl ? item.imageUrl :'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCmgkix4DEJoToCFKP-g8ztCYa9bIuxAC3pA&s'} alt={item.name} style={{ width: '50px', height: '50px' ,objectFit:'cover'}} />
                            <div>
                                <h3>{item.name}</h3>
                                <p>Price: {item.price}</p>
                                <p>Quantity: {item.quantity || 1}</p>
                            </div>
                            <div>
                                <button onClick={() => increaseQuantity(index)}>+</button><br /><br />
                                <button onClick={() => decreaseQuantity(index)}>-</button><br /><br />
                                <button onClick={() => deleteItem(index)}>Delete</button>
                            </div>
                        </div>
                    ))}
                    Total Price: {cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0)}
                </div>
            )}
        </div>
    );
}

export default Cart;