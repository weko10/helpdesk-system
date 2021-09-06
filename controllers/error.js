//logger
exports.errorLogger = (err, req, res, next) => {
    console.log(err);
    next(err);
};

//responder
exports.errorResponder = (err, req, res, next) => {
    res.header("Content-Type", "application/json");
    res.status(err.statusCode).send(JSON.stringify(err, null, 4));
};
