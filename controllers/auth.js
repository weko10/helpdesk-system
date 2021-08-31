//responsible for authenticating users and operations on sensitive user data

const User = require("../models/user");

exports.getSignup = (req, res) => {
    res.render("auth/signup.ejs", {
        pageTitle: "Sign Up",
        isAuth: req.session.isAuth,
    });
};

exports.postSignup = async (req, res, next) => {
    try {
        const { username, email, password, phone, home_address } = req.body;

        //check if another account has the same email
        const [[isExist]] = await User.isExist({ where: { email: email } });
        if (isExist.result) {
            throw new Error("Email already belongs to existing account");
        }

        //create new user in database
        User.create({
            attributes: {
                username: username,
                email: email,
                password: password,
                phone: phone,
                homeAddress: home_address,
            },
        });

        req.flash("message", "Account created succesfully!");
        res.redirect("/");
    } catch (err) {
        console.log(err);
    }
};

exports.getLogin = (req, res) => {
    res.render("auth/login.ejs", {
        pageTitle: "Login In",
        isAuth: req.session.isAuth,
        message: req.flash("message"),
    });
};

exports.postLogin = async (req, res) => {
    try {
        //check if this email belongs to an existing email
        const [[isExist]] = await User.isExist({ where: { email: req.body.email } });
        if (!isExist.result) {
            throw new Error("Email does not belong to any acount");
        }

        const [[[user]]] = await User.findAll({ where: { email: req.body.email } });
        //check password
        const checkPassword = user.password === req.body.password;
        if (!checkPassword) {
            throw new Error("Wrong password");
        }

        req.session.isAuth = true;
        req.session.userData = {
            id: user.id,
            username: user.username,
            email: user.email,
            phone: user.phone,
            homeAddress: user.home_address,
        };
        res.redirect("/");
    } catch (err) {
        console.log(err);
    }
};

exports.getDashboardAccount = (req, res) => {
    //render dashboard with account info page
    res.render("auth/dashboard-account.ejs", {
        pageTitle: "Dashboard-Account",
        isAuth: req.session.isAuth,
        userData: req.session.userData,
    });
};

exports.logout = (req, res) => {
    try {
        req.session.destroy();
        res.redirect("/");
    } catch (err) {
        console.log(err);
    }
};
