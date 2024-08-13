const User = require("../Models/user");

const checkRole = async (req, res, next) => {
    try {
        const { email } = req.user;
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).send("User not found");
        }

        if (user.isAdmin === false) {
            return res.status(403).send("Forbidden");
        }

        next();
    } catch (error) {
        console.error("Error in checkRole middleware:", error);
        res.status(500).send("Server error");
    }
};

module.exports = checkRole;
