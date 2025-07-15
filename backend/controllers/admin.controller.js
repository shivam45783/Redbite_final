import jwt from "jsonwebtoken";
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
}
const adminLogin = async(req, res)=>{
    const {id, password} = req.body;
    if (id === process.env.ADMIN_ID && password === process.env.ADMIN_PASSWORD){
        const token = createToken(id);
        res.json({success: true, message: "Admin logged in successfully", token});
    } else {
        res.json({success: false, message: "Invalid credentials"});
    }
}

export {adminLogin}