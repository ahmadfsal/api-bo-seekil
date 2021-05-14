module.exports = (responseCode, res, obj) => {
    return res.status(responseCode).send(obj);
};
