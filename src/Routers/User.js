import { Router } from "express";
import express from "express";
import { Product } from "../Models/Product.js";
import { validateRegister } from "../Validate/User.js";
import { User } from "../Models/User.js";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
const routerUser = express.Router();

routerUser.post("/register", async (req, res) => {
  try {
  //b1:validate
  const {error} = validateRegister.validate(req.body)
  if(error){
    const erorrs = error.details.map(err => err.message)
    return res.status(400).json({
        message : erorrs
    })
  }
  //b2:kiem tra email ton tai ko
  const checkEmail = await User.findOne({email: req.body.email})
  if(checkEmail){
    return res.status(400).json({
        message :"email này đã được đăng ký vui lòng đăng ký email khác !"
    })
  }
  //b3:ma hoa pass
  const hashPassword = await bcryptjs.hash(req.body.password,10)
  //b4 them vao db
  const user = await User.create({
    email : req.body.email,
    password : hashPassword
  })
  //b5 thong bao
  return res.status(200).json({
    message :"đăng ký thành công",
    data : user
  })
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
});
routerUser.post("/login", async (req, res) => {
    try {
    //b1:validate
    const {error} = validateRegister.validate(req.body)
    if(error){
      const erorrs = error.details.map(err => err.message)
      return res.status(400).json({
          message : erorrs
      })
    }
    //b2:kiem tra email ton tai ko
    const checkEmail = await User.findOne({email: req.body.email})
    if(!checkEmail){
      return res.status(400).json({
          message :"Email này chưa đắng ký vui lòng đăng ký trước!"
      })
    }
    //b3:so sánh password 
    const comparePassword = await bcryptjs.compare(req.body.password,checkEmail.password)
    if(!comparePassword){
        return res.status(400).json({
            message :"mật khẩu không chính xác vui lòng nhập lại!"
        })
    }
    //b4 tạo token
   const token =  await jwt.sign({id :User._id},"123456")
    //b5 thong bao
    return res.status(200).json({
      message :"đăng nhập thành công ",
      checkEmail,
      token,
    })
    } catch (error) {
      return res.status(404).json({
        message: error,
      });
    }
  });


export default routerUser;
