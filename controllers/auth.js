exports.getDashboardAccInfo = (req, res) => {
    //acc => account
    res.render("auth/dashboard-acc-info.ejs", {
        pageTitle: "Dashboard",
    });
};
