const logger = (req, res, next) => {
    // console.log(`${req.method}  ${req.path}`);
    console.log(req.method);
    console.log(req.path);
    next();
}

module.exports = logger;