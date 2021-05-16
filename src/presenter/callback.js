module.exports = {
    single: (responseCode, res, data) => {
        return res.status(responseCode).send({
            data: data,
            meta: {
                code: responseCode,
                status: 'OK'
            }
        });
    },
    list: (responseCode, req, res, data) => {
        return res.status(responseCode).send({
            list: data,
            pagination: {
                current_page: req.query.page ? parseInt(req.query.page) : null,
                limit: req.query.limit ? parseInt(req.query.limit) : null,
                total_row: data.length
            },
            meta: {
                code: responseCode,
                status: 'OK'
            }
        });
    },
    create: (responseCode, res, status, data) => {
        const getStatus = () => {
            let msg = '';

            if (status === 'success') {
                msg = `Success create data`;
            } else if (status === 'failed') {
                msg = `Error while create data`;
            }

            return msg;
        };

        return res.status(responseCode).send({
            data: data,
            meta: {
                code: responseCode,
                message: getStatus()
            }
        });
    },
    update: (responseCode, res, status, id) => {
        const getStatus = () => {
            let msg = '';

            if (status === 'success') {
                msg = `Success update data`;
            } else if (status === 'failed') {
                msg = `Error while update id=${id}`;
            }

            return msg;
        };

        return res.status(responseCode).send({
            meta: {
                code: responseCode,
                message: getStatus()
            }
        });
    },
    delete: (responseCode, res, status, id) => {
        const getStatus = () => {
            let msg = '';

            if (status === 'success') {
                msg = `Success delete data`;
            } else if (status === 'failed') {
                msg = `Error while delete id=${id}`;
            }

            return msg;
        };

        return res.status(responseCode).send({
            meta: {
                code: responseCode,
                message: getStatus()
            }
        });
    },
    error: (responseCode, res, message) => {
        return res.status(responseCode).send({
            meta: {
                code: responseCode,
                message: message
            }
        });
    }
};
