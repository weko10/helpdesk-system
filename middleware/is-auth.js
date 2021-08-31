exports.isAuth = (req, res, next) => {
    if (req.session.isAuth) {
        return next();
    }
    req.flash("message", "Please login with your account first");
    return res.redirect(303, "/auth/login");
};
