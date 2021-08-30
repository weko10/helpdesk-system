exports.getSignup = (req, res) => {
    res.render("auth/signup.ejs", {
        pageTitle: "Sign Up",
    });
};

exports.getLogin = (req, res) => {
    res.render("auth/login.ejs", {
        pageTitle: "Login In",
    });
};

exports.getDashboardAccount = (req, res) => {
    //render dashboard with account info page
    res.render("auth/dashboard-account.ejs", {
        pageTitle: "Dashboard-Account",
    });
};
