module.exports = {
    getPagination: (page, size) => {
        const limit = size ? +size : 10;
        const offset = page ? page * limit : 0;

        return { limit, offset };
    },
    getPagingData: (data, page, limit) => {
        const { count, rows } = data;
        const current_page = page ? +page : 0;
        const total_page = Math.ceil(count / limit);
        const total_row = rows.length;

        return { current_page, limit, total_page, total_row };
    }
};
