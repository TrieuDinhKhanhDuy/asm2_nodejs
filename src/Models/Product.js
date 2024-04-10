
import mongoose from 'mongoose';
const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    age:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    phone:{
        type:String,
        required: true
    },
})
export const Product = mongoose.model('Product', productSchema)