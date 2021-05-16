module.exports = (word = 0, fixed = 2) => {
    if (word) {
        return word
            .toFixed(fixed)
            .toString()
            .replace('.', ',')
            .replace(/\,00$/, '')
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    }
};
