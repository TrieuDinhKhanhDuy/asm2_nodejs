import Joi from "joi";

 export const validateRegister = Joi.object({
    email : Joi.string().required().email().empty().message({
        "string.empty" : "email không được bỏ trống",
        "any.required" : "email bắt buộc phải điền",
        "string.email" : "email không đúng định dạng",
    }),
    password : Joi.string().empty().required().min(6).message({
        "string.empty" : "passowrd không được bỏ trống",
        "any.required" : "passowrd bắt buộc phải điền",
        "string.min" : "passowrd phải lớn hơn 6 ký tự",
    }),

})