
import mongoose from 'mongoose';
const productSchema = new mongoose.Schema({
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
})
export const User = mongoose.model('User', productSchema)