//catch it all route
exports.notFound = (req, res, next) => {
    const error = new Error("Page Not Found");
    error.statusCode = 404;
    next(error);
};

//logs error to consoles
exports.logger = (err, req, res, next) => {
    console.error("Error Logger", err);
    next(err);
};

//sends a response to the client
exports.responder = (err, req, res, next) => {
    if (err.statusCode >= 400 && err.statusCode < 500) {
        if (err.statusCode == 422) {
            req.flash("message", { error: err.message });
            res.redirect(req.path);
        }
        res.status(err.statusCode).render("error/4xx.ejs", {
            pageTitle: "Error",
            isAuth: req.session.isAuth,
            error: err,
        });
    } else if (err.statusCode >= 500 && err.statusCode < 600) {
        res.status(err.statusCode).render("error/5xx.ejs", {
            pageTitle: "Error",
            isAuth: req.session.isAuth,
            error: err,
        });
    } else {
        res.status(500).send("<h1>Something wrong happend</h1>");
    }
};
