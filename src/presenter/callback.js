module.exports = {
    single: (responseCode, res, data, message) => {
        return res.status(responseCode).send({
            data: data,
            meta: {
                code: responseCode,
                status: 'OK',
                message: data !== null ? 'Data found' : message
            }
        });
    },
    list: (responseCode, req, res, data) => {
        return res.status(responseCode).send({
            list: data.rows,
            pagination: {
                current_page: parseInt(req.query.page),
                limit: parseInt(req.query.limit),
                total_page:
                    (parseInt(req.query.page) - 1) * parseInt(req.query.limit),
                total_row: data.count
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
                message: message,
                status: 'FAIL'
            }
        });
    }
};
