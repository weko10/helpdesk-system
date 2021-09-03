//responsible for authenticating users and operations on sensitive user data

const User = require("../models/user");
const bcrypt = require("bcryptjs");

//functions
const hashPassword = async password => {
    try {
        const hashed = await bcrypt.hash(password, 4);
        return hashed;
    } catch (err) {
        console.log(err);
    }
};

const comparePassword = async (hashedReference, sample) => {
    try {
        const isMatch = await bcrypt.compare(sample, hashedReference);
        if (!isMatch) {
            throw Error("Invalid password");
        }
    } catch (err) {
        throw Error("Wrong Password. Please try again!", { cause: err });
    }
};

exports.getSignup = (req, res) => {
    res.render("auth/signup.ejs", {
        pageTitle: "Sign Up",
        isAuth: req.session.isAuth,
        message: req.flash("message"),
        error: req.flash("error"),
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

        const hash = await hashPassword(password);

        //create new user in database
        await User.create({
            attributes: {
                username: username,
                email: email,
                password: hash,
                phone: phone,
                homeAddress: home_address,
            },
        });

        req.flash("message", "Account created succesfully!");
        return res.redirect("/");
    } catch (err) {
        console.log(err);
        req.flash("error", err.message);
        return res.redirect("/");
    }
};

exports.getLogin = (req, res) => {
    res.render("auth/login.ejs", {
        pageTitle: "Login In",
        isAuth: req.session.isAuth,
        message: req.flash("message"),
        error: req.flash("error"),
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
        checkPassword = await comparePassword(user.password, req.body.password);

        req.session.isAuth = true;
        req.session.userData = {
            id: user.id,
            username: user.username,
            email: user.email,
            phone: user.phone,
            homeAddress: user.home_address,
        };

        return res.redirect("/");
    } catch (err) {
        req.flash("error", err.message);
        return res.redirect("/");
    }
};

exports.getDashboardAccount = (req, res) => {
    //render dashboard with account info page
    res.render("auth/dashboard-account.ejs", {
        pageTitle: "Dashboard-Account",
        isAuth: req.session.isAuth,
        userData: req.session.userData,
        message: req.flash("message"),
        error: req.flash("error"),
    });
};

exports.logout = (req, res) => {
    try {
        req.session.destroy();
        return res.redirect("/");
    } catch (err) {
        req.flash("error", err.message);
        return res.redirect("/");
    }
};
