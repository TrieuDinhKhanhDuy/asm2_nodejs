import express from 'express';
import mongoose from 'mongoose';
import routerProduct from './src/Routers/Product.js';
import routerUser from './src/Routers/User.js';
const app = express();
app.use(express.json())
const connect = async () => {
try {
    await mongoose.connect("mongodb://localhost:27017/assignment2")
} catch (error) {
    console.log(error);
}
}
connect()
app.use("/",routerProduct)
app.use("/auth",routerUser)

app.listen(4000,()=>{
    console.log(`Listening on port 4000`);
})