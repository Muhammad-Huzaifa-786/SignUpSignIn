import mongoose from 'mongoose';
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String},
});


const product = mongoose.model('product', productSchema);

export default product;
