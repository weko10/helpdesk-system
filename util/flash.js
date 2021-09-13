const router = require("express").Router();

const flash = require("connect-flash");

router.use(flash());

//modifies and stores flash message in request object
router.use((req, res, next) => {
    //ideal value of message:
    // {success: "Ticket created", error: null} or
    // {success: null, error: "Wrong password"}
    let message = req.flash("message");
    message = message[0];

    //modify message to ease its use in ejs
    if (message.success === undefined || message.success === false)
        message.success = null;
    else if (message.error === undefined || message.error === false) message.error = null;
    else if (message === undefined || message === false) message = null;

    console.log(message);
    req.message = message;
    next();
});

module.exports = router;
