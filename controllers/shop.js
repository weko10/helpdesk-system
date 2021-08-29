//responsible for shop related operations

exports.getHome = (req, res) => {
    //empty page till now
    res.render("shop/home.ejs", {
        pageTitle: "Home",
    });
};
