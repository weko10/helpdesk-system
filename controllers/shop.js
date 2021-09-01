//responsible for shop related operations

exports.getHome = (req, res) => {
    //empty page till now
    res.render("shop/home.ejs", {
        pageTitle: "Home",
        isAuth: req.session.isAuth,
        message: req.flash("message"),
        error: req.flash("error"),
    });
};
