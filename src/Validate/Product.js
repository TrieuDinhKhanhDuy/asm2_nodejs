import Joi from "joi";

 export const validateProduct = Joi.object({
    name : Joi.string().empty().required().min(6).message({
        "string.empty" : "name không được bỏ trống",
        "any.required" : "name bắt buộc phải điền",
        "string.min" : "name phải lớn hơn 6 ký tự",
    }),
    age : Joi.string().empty().required().min(0).message({
        "string.empty" : "age không được bỏ trống",
        "any.required" : "age bắt buộc phải điền",
        "string.min" : "age không được âm",
    }),
    email:Joi.string().allow("",null),
    phone:Joi.string().allow("",null)

})