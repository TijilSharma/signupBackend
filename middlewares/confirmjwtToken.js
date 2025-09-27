import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({message:"Authentication failed"});
    }
    const token  = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({message:"token missing"});
    }
    try{
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    }
    catch(err){
        return res.status(401).json({message:"Invalid or expired token"});
    }
}