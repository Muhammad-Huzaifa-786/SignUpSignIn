import express from 'express';
import { createProduct, getProducts, getSingleProduct } from '../controllers/productController.js';

const router = express.Router();

router.get('/', getProducts);
router.post('/addProduct', createProduct);
router.get('/singleProduct/:id', getSingleProduct);

export default router;
