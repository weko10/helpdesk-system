exports.notFound = (req, res, next) => {
    const error = new Error("Page Not Found");
    error.statusCode = 404;
    next(error);
};

exports.logger = (err, req, res, next) => {
    console.log(err);
    next(err);
};

//responder
exports.responder = (err, req, res, next) => {
    if (err.statusCode >= 400 && err.statusCode < 500) {
        res.status(err.statusCode).render("error/4xx.ejs", {
            pageTitle: "Error",
            isAuth: req.session.isAuth,
            err: err,
        });
    } else if (err.statusCode >= 500 && err.statusCode < 600) {
        console.log("entered");
        res.status(err.statusCode).render("error/5xx.ejs", {
            pageTitle: "Error",
            isAuth: req.session.isAuth,
            err: err,
        });
    } else {
        res.status(500).send("<h1>Something wrong happend</h1>");
    }
};
