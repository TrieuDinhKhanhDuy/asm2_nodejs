import jwt from "jsonwebtoken"
export const checkPermission = (req,res,next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]
        const data = jwt.verify(token,"123456")
        next()
    } catch (error) {
        return res.status(403).json({
            message: "bạn không có quyền truy cập"
        })
    }
}