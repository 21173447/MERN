import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
},{
    timestamps:true // makes sure it has the updated at and created at 
});

const Product = mongoose.model('Product',productSchema);
export default Product;