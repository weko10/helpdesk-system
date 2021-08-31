exports.isAuth = (req, res, next) => {
    if (req.session.isAuth) {
        return next();
    }
    return res.redirect(303, "/");
};
