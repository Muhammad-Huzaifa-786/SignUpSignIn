import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js'; // Add `.js` extension for ES Modules
import product from './routes/products.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(`${process.env.MONGO_URI}`)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err,"error hai"));

app.use('/api/auth', authRoutes);
app.use('/product', product);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
