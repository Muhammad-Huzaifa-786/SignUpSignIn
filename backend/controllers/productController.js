import product from '../models/Product.js';
import dotenv from 'dotenv';

dotenv.config();

export const getProducts = async (req, res) => {
    try {
        const products = await product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error find in' });
    }
};
export const createProduct = async (req, res) => {
    try {
        const { name, price, description, imageUrl} = req.body;
        const newProduct = new product({ name, price, description,imageUrl });
        await newProduct.save();
        res.status(201).json({ message: 'Product created successfully', data: newProduct });
    } catch (error) {
        res.status(500).json({ error: 'Error creating product' });
    }
}
export const getSingleProduct = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'Product ID is required' });
        }
        const productData = await product.findById(id);
        if (!productData) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(productData);
    } catch (error) {
        console.error('Error finding product:', error);
        res.status(500).json({ error: 'Error finding product' });
    }
};