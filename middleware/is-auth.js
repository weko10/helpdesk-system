exports.isAuth = (req, res, next) => {
    if (req.session.isAuth) {
        return next();
    }
    res.redirect(401, "/");
};
