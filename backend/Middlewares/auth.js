const { getUser } = require("../service/auth");

const loggedinOnly = (req, res, next) => {
    const userUid = req.cookies.uid;

    if (!userUid) {
        return res.status(401).json({
            message: "User is not logged in",
            success: false
        });
    }

    const user = getUser(userUid);

    if (!user) {
        return res.status(404).json({
            message: "User not found",
            success: false
        });
    }

    req.user = user;
    next();
};  

module.exports = loggedinOnly;
