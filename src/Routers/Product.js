import { Router } from "express";
import express from "express";
import { Product } from "../Models/Product.js";
import { validateProduct } from "../Validate/Product.js";
import { checkPermission } from "../middlewear/checkPermission.js";
const routerProduct = express.Router();
routerProduct.get("/products", async (req, res) => {
  try {
    const data = await Product.find();
    return res.status(200).json({
      message: "Danh sách dữ liệu",
      data: data,
    });
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
});
routerProduct.get("/products/:id", async (req, res) => {
  try {
    const data = await Product.findById(req.params.id);
    if(!data){
        return res.status(404).json({
            message : "Dữ liệu không tồn tại!"
        })
    }
    return res.status(200).json({
      message: "Danh sách dữ liệu",
      data: data,
    });
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
});
routerProduct.post("/products", checkPermission,async (req, res) => {
  try {
      //b1:validate
      const {error} = validateProduct .validate(req.body)
      if(error){
        const erorrs = error.details.map(err => err.message)
        return res.status(400).json({
            message : erorrs
        })
      }
    const data = await Product.create(req.body);
    return res.status(200).json({
      message: "Thêm dữ liệu thành công",
      data: data,
    });
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
});
routerProduct.put("/products/:id",checkPermission ,async (req, res) => {
  try {
    const {error} = validateProduct .validate(req.body)
      if(error){
        const erorrs = error.details.map(err => err.message)
        return res.status(400).json({
            message : erorrs
        })
      }
    const data = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new :true 
    });
    if(!data){
        return res.status(404).json({
            message : "Dữ liệu không tồn tại!"
        })
    }
    return res.status(200).json({
      message: "Cập nhật dữ liệu thành công",
      data: data,
    });
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
});
routerProduct.delete("/products/:id",checkPermission ,async (req, res) => {
  try {
    const data = await Product.findByIdAndDelete(req.params.id);
    if(!data){
        return res.status(404).json({
            message : "Dữ liệu không tồn tại!"
        })
    }
    return res.status(200).json({
      message: "Xóa dữ liệu thành công",
      data: data,
    });
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
});

export default routerProduct;
