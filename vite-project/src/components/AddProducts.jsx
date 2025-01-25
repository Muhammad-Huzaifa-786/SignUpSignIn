import React, { useState } from 'react';
import axios from 'axios';

function AddProducts() {
    const [imageUrl, setImageUrl] = useState('');
  const handleImage = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const cloudName = "dgfckzk91";
    const uploadPreset = "huzaifa";

    const formData = new FormData();
    formData.append('file', file);
    formData.append("upload_preset", uploadPreset);
    try {
      const res = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData);
      setImageUrl(res.data.secure_url);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const price = e.target.price.value;
        const description = e.target.description.value;

        try {
            await axios.post('http://localhost:5000/product/addProduct', {
                name,
                price,
                description,
                imageUrl,
            });
            alert('Product added successfully');
            e.target.reset(); // Clears the form fields
        } catch (error) {
            console.error('Failed to add product:', error);
            alert('Failed to add product');
        }
    };

    return (
        <div>
            <h2>Add Product</h2>
            <form onSubmit={handleSubmit}>
                <label>Product image:</label>
                <input onChange={handleImage} type="file" name="file" required />
                <br />
                <label>Product Name:</label>
                <input type="text" name="name" required />
                <br />
                <label>Product Price:</label>
                <input type="number" name="price" required />
                <br />
                <label>Product Description:</label>
                <input type="text" name="description" required />
                <br />
                <button type="submit">Add Product</button>
            </form>
        </div>
    );
}

export default AddProducts;
