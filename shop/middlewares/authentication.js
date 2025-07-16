import User from "../models/User.js";

const hasAdminRole = async (req, res, next) => {
    if (!req.session.user) {
        return res.status(403).json({ message: "올바르지 않은 접근입니다." });
    }
    
    const currentUser = await User.findOne({ username: req.session.user.username });
    if(!currentUser) {
        return res.status(404).json({message: "사용자를 찾을 수 없습니다."});
    }

    if(currentUser.role === "admin") {
        return next();
    }

    return res.status(403).json({message:"올바르지 않은 접급입니다."});
}

const isAuthentication = async (req, res, next) => {
     if (!req.session.user) {
        return res.status(403).json({ message: "올바르지 않은 접근입니다." });
    }
    
    const currentUser = await User.findOne({ username: req.session.user.username });
    if(!currentUser) {
        return res.status(404).json({message: "사용자를 찾을 수 없습니다."});
    }

    next();
}

export {hasAdminRole, isAuthentication};