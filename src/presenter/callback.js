module.exports = (responseCode, res, obj) => {
    return res.sendStatus(responseCode).send(obj)
}