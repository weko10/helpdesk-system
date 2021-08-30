//responsible for authenticating users and operations on sensitive user data

const User = require("../models/user");

exports.getSignup = (req, res) => {
    res.render("auth/signup.ejs", {
        pageTitle: "Sign Up",
    });
};

exports.postSignup = async (req, res, next) => {
    console.log(req.body);
    try {
        User.create({ attributes: req.body });
    } catch (err) {
        res.send(err);
    }
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
