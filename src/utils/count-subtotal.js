module.exports = (values) => {
    const getSubtotalOrTotal = () => {
        return values['items'].reduce((acc, curr) => {
            const subtotal = acc + parseInt(curr.subtotal);

            if (!isNaN(subtotal)) {
                return parseInt(subtotal);
            }
            return 0;
        }, 0);
    };

    const getTotal = () => {
        const { pickup_delivery_price, potongan } = values;
        const ongkir = pickup_delivery_price
            ? parseInt(pickup_delivery_price)
            : 0;
        const diskon = potongan ? parseInt(potongan) : 0;

        return getSubtotalOrTotal() + ongkir - diskon;
    };

    return {
        subtotal: getSubtotalOrTotal(),
        total: getTotal()
    };
};
