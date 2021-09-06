//route not found
exports.notFound = (req, res, next) => {
    const error = new Error("Page Not Found");
    error.statusCode = 404;
    next(error);
};

//logger
exports.errorLogger = (err, req, res, next) => {
    console.log(err);
    next(err);
};

//responder
exports.errorResponder = (err, req, res, next) => {
    if (err.statusCode >= 400 && err.statusCode < 500) {
        res.status(err.statusCode).render("error/4xx.ejs", {
            pageTitle: "Error",
            isAuth: req.session.isAuth,
            err: err,
        });
    }
};