//catch it all route
exports.notFound = (req, res, next) => {
    res.render("error/404.ejs", {
        pageTitle: "Page Not Found",
        isAuth: req.session.isAuth,
    });
};

//logs error to consoles
exports.logger = (err, req, res, next) => {
    console.error("Error Logger", err);
    next(err);
};

//sends a response to the client
exports.responder = async (err, req, res, next) => {
    if (err.statusCode >= 400 && err.statusCode < 500) {
        await req.flash("message", { error: err.message });
        res.redirect(302, req.path);
    } else if (err.statusCode >= 500 && err.statusCode < 600) {
        res.status(err.statusCode).render("error/5xx.ejs", {
            pageTitle: "Error",
            isAuth: req.session.isAuth,
            error: err,
        });
    } else {
        res.status(500).send(`<h1>Something wrong happend</h1> <p>${err}</p>`);
    }
};
