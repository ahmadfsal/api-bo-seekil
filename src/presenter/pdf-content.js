const moment = require('moment');
const countSubtotal = require('../utils/count-subtotal');
const currencyFormat = require('../utils/currency-format');
const {
    ORDER_TYPE_DROPOFF,
    ORDER_TYPE_ONSTORE,
    ORDER_TYPE_PICKUP,
    SEEKIL_LOGO_BASE64
} = require('../constants/general.constant');

module.exports = (values) => {
    const tableHead = [
        {
            text: 'No',
            fillColor: '#eaf2f5',
            border: [false, true, false, true],
            margin: [0, 5, 0, 5],
            alignment: 'center'
        },
        {
            text: 'Item Name',
            border: [false, true, false, true],
            alignment: 'left',
            fillColor: '#eaf2f5',
            margin: [0, 5, 0, 5]
        },
        {
            text: 'Treatment',
            border: [false, true, false, true],
            alignment: 'left',
            fillColor: '#eaf2f5',
            margin: [0, 5, 0, 5]
        },
        {
            text: 'Note',
            border: [false, true, false, true],
            alignment: 'left',
            fillColor: '#eaf2f5',
            margin: [0, 5, 0, 5]
        },
        {
            text: 'Item Subtotal',
            border: [false, true, false, true],
            alignment: 'right',
            fillColor: '#eaf2f5',
            margin: [0, 5, 0, 5]
        }
    ];

    let arrayItem = [];
    arrayItem.push(tableHead);

    values.items.map((item, index) => {
        arrayItem.push([
            {
                text: index + 1,
                border: [false, false, false, true],
                margin: [0, 5, 0, 5],
                alignment: 'center',
                fillColor: '#f5f5f5'
            },
            {
                text: item.item_name ? item.item_name : '',
                border: [false, false, false, true],
                margin: [0, 5, 0, 5],
                alignment: 'left',
                fillColor: '#f5f5f5'
            },
            {
                text:
                    item.services_id &&
                    item.services_id
                        .map((item) => {
                            return item.label;
                        })
                        .join('\r\n'),
                border: [false, false, false, true],
                margin: [0, 5, 0, 5],
                alignment: 'left',
                fillColor: '#f5f5f5'
            },
            {
                text: item.note ? item.note : '-',
                border: [false, false, false, true],
                margin: [0, 5, 0, 5],
                alignment: 'left',
                fillColor: '#f5f5f5'
            },
            {
                text: `Rp ${item.subtotal ? currencyFormat(item.subtotal) : 0}`,
                border: [false, false, false, true],
                margin: [0, 5, 0, 5],
                alignment: 'right',
                fillColor: '#f5f5f5'
            }
        ]);
    });

    const isPaid = values.payment_status === 'lunas';

    return {
        watermark: {
            text: isPaid ? '[LUNAS]' : '[BELUM LUNAS]',
            color: isPaid ? 'green' : 'red',
            opacity: 0.1,
            bold: true,
            italics: false
        },
        content: [
            {
                columns: [
                    {
                        image: SEEKIL_LOGO_BASE64,
                        width: 150
                    },
                    [
                        {
                            text: 'Invoice',
                            color: '#333333',
                            width: '*',
                            fontSize: 28,
                            bold: true,
                            alignment: 'right'
                        }
                    ]
                ]
            },
            {
                table: {
                    headerRows: 1,
                    widths: ['0%'],
                    body: [[''], ['']]
                },
                layout: 'headerLineOnly'
            },
            'Blok Kavling Karanganyar, Jamblang, Kab.Cirebon',
            'Instagram: @seekil.id',
            'Telepon/Whatsapp: 0821-2705-1607',
            'Email: seekilshoescleanandcare@gmail.com',
            {
                table: {
                    headerRows: 1,
                    widths: ['100%'],
                    body: [[''], ['']]
                },
                layout: 'headerLineOnly',
                margin: [0, 8, 0, 24]
            },
            {
                columns: [
                    {
                        stack: [
                            {
                                columns: [
                                    {
                                        text: 'Pelanggan',
                                        color: '#aaaaab',
                                        bold: true,
                                        width: '*',
                                        fontSize: 12,
                                        alignment: 'left'
                                    },
                                    {
                                        text: values.customer
                                            ? values.customer.name
                                            : '',
                                        bold: true,
                                        color: '#333333',
                                        fontSize: 12,
                                        alignment: 'left',
                                        width: 100
                                    }
                                ]
                            },
                            values.customer && values.customer.address
                                ? {
                                      columns: [
                                          {
                                              text: '',
                                              color: '#ffffff',
                                              bold: true,
                                              width: '*',
                                              fontSize: 12,
                                              alignment: 'left'
                                          },
                                          {
                                              text: values.customer.address,
                                              bold: true,
                                              color: '#333333',
                                              fontSize: 12,
                                              alignment: 'left',
                                              width: 100
                                          }
                                      ]
                                  }
                                : null,
                            {
                                columns: [
                                    {
                                        text: '',
                                        color: '#ffffff',
                                        bold: true,
                                        fontSize: 12,
                                        alignment: 'left',
                                        width: '*'
                                    },
                                    {
                                        text: values.customer.whatsapp,
                                        bold: true,
                                        fontSize: 12,
                                        alignment: 'left',
                                        width: 100
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        stack: [
                            {
                                columns: [
                                    {
                                        text: 'No. Invoice',
                                        color: '#aaaaab',
                                        bold: true,
                                        width: '*',
                                        fontSize: 12,
                                        alignment: 'left'
                                    },
                                    {
                                        text: values.order_id,
                                        bold: true,
                                        color: '#333333',
                                        fontSize: 12,
                                        alignment: 'right',
                                        width: '*'
                                    }
                                ]
                            },
                            {
                                columns: [
                                    {
                                        text: 'Tanggal Transaksi',
                                        color: '#aaaaab',
                                        bold: true,
                                        width: '*',
                                        fontSize: 12,
                                        alignment: 'left'
                                    },
                                    {
                                        text: moment(values.order_date).format(
                                            'DD MMMM YYYY'
                                        ),
                                        bold: true,
                                        color: '#333333',
                                        fontSize: 12,
                                        alignment: 'right',
                                        width: '*'
                                    }
                                ]
                            },
                            {
                                columns: [
                                    {
                                        text: 'Jam Transaksi',
                                        color: '#aaaaab',
                                        bold: true,
                                        fontSize: 12,
                                        alignment: 'left',
                                        width: '*'
                                    },
                                    {
                                        text: `${moment(
                                            values.createdAt
                                        ).format('HH:mm:ss')} WIB`,
                                        bold: true,
                                        fontSize: 12,
                                        alignment: 'right',
                                        width: '*'
                                    }
                                ]
                            },
                            {
                                columns: [
                                    {
                                        text: 'Jenis Order',
                                        color: '#aaaaab',
                                        bold: true,
                                        fontSize: 12,
                                        alignment: 'left',
                                        width: '*'
                                    },
                                    {
                                        text: values.master_type.name,
                                        bold: true,
                                        fontSize: 12,
                                        alignment: 'right',
                                        width: '*'
                                    }
                                ]
                            },
                            values.order_type_id ===
                            parseInt(ORDER_TYPE_ONSTORE)
                                ? {
                                      columns: [
                                          {
                                              text: 'Lokasi Store',
                                              color: '#aaaaab',
                                              bold: true,
                                              fontSize: 12,
                                              alignment: 'left',
                                              width: '*'
                                          },
                                          {
                                              text: values.master_store.staging,
                                              bold: true,
                                              fontSize: 12,
                                              alignment: 'right',
                                              width: '*'
                                          }
                                      ]
                                  }
                                : null,
                            values.order_type_id === parseInt(ORDER_TYPE_PICKUP)
                                ? {
                                      columns: [
                                          {
                                              text: 'Alamat Tujuan',
                                              color: '#aaaaab',
                                              bold: true,
                                              fontSize: 12,
                                              alignment: 'left',
                                              width: '*'
                                          },
                                          {
                                              text:
                                                  values.customer &&
                                                  values.customer.address,
                                              bold: true,
                                              fontSize: 12,
                                              alignment: 'right',
                                              width: '*'
                                          }
                                      ]
                                  }
                                : null,
                            values.order_type_id ===
                            parseInt(ORDER_TYPE_DROPOFF)
                                ? {
                                      columns: [
                                          {
                                              text: 'Lokasi Drop Off',
                                              color: '#aaaaab',
                                              bold: true,
                                              fontSize: 12,
                                              alignment: 'left',
                                              width: '*'
                                          },
                                          {
                                              text:
                                                  values.master_partnership &&
                                                  values.master_partnership
                                                      .name,
                                              bold: true,
                                              fontSize: 12,
                                              alignment: 'right',
                                              width: '*'
                                          }
                                      ]
                                  }
                                : null,
                            {
                                columns: [
                                    {
                                        text: 'Jenis Pembayaran',
                                        color: '#aaaaab',
                                        bold: true,
                                        fontSize: 12,
                                        alignment: 'left',
                                        width: '*'
                                    },
                                    {
                                        text: values.master_payment_method.name,
                                        bold: true,
                                        fontSize: 12,
                                        alignment: 'right',
                                        width: '*'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                margin: [0, 24, 0, 0],
                layout: {
                    defaultBorder: false,
                    hLineWidth: function (i, node) {
                        return 1;
                    },
                    vLineWidth: function (i, node) {
                        return 1;
                    },
                    hLineColor: function (i, node) {
                        if (i === 1 || i === 0) {
                            return '#bfdde8';
                        }
                        return '#eaeaea';
                    },
                    vLineColor: function (i, node) {
                        return '#eaeaea';
                    },
                    hLineStyle: function (i, node) {
                        // if (i === 0 || i === node.table.body.length) {
                        return null;
                        //}
                    },
                    // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
                    paddingLeft: function (i, node) {
                        return 10;
                    },
                    paddingRight: function (i, node) {
                        return 10;
                    },
                    paddingTop: function (i, node) {
                        return 2;
                    },
                    paddingBottom: function (i, node) {
                        return 2;
                    },
                    fillColor: function (rowIndex, node, columnIndex) {
                        return '#fff';
                    }
                },
                table: {
                    headerRows: 1,
                    widths: [20, '*', '*', '*', '*'],
                    body: arrayItem
                }
            },
            '\n\n',
            {
                layout: {
                    defaultBorder: false,
                    hLineWidth: function (i, node) {
                        return 1;
                    },
                    vLineWidth: function (i, node) {
                        return 1;
                    },
                    hLineColor: function (i, node) {
                        return '#eaeaea';
                    },
                    vLineColor: function (i, node) {
                        return '#eaeaea';
                    },
                    hLineStyle: function (i, node) {
                        // if (i === 0 || i === node.table.body.length) {
                        return null;
                        //}
                    },
                    // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
                    paddingLeft: function (i, node) {
                        return 10;
                    },
                    paddingRight: function (i, node) {
                        return 10;
                    },
                    paddingTop: function (i, node) {
                        return 3;
                    },
                    paddingBottom: function (i, node) {
                        return 3;
                    },
                    fillColor: function (rowIndex, node, columnIndex) {
                        return '#fff';
                    }
                },
                table: {
                    headerRows: 1,
                    widths: ['*', 'auto'],
                    body: [
                        [
                            {
                                text: 'Subtotal',
                                border: [false, true, false, true],
                                alignment: 'right',
                                margin: [0, 5, 0, 5]
                            },
                            {
                                text: `Rp ${currencyFormat(
                                    countSubtotal(values).subtotal
                                )}`,
                                border: [false, true, false, true],
                                alignment: 'right',
                                fillColor: '#f5f5f5',
                                margin: [0, 5, 0, 5]
                            }
                        ],
                        [
                            {
                                text: 'Ongkos Kirim',
                                border: [false, false, false, true],
                                alignment: 'right',
                                color: 'green',
                                margin: [0, 5, 0, 5]
                            },
                            {
                                text: `+ Rp ${
                                    values.pickup_delivery_price
                                        ? currencyFormat(
                                              values.pickup_delivery_price
                                          )
                                        : 0
                                }`,
                                border: [false, false, false, true],
                                fillColor: '#f5f5f5',
                                color: 'green',
                                alignment: 'right',
                                margin: [0, 5, 0, 5]
                            }
                        ],
                        [
                            {
                                text: 'Diskon',
                                border: [false, false, false, true],
                                alignment: 'right',
                                margin: [0, 5, 0, 5],
                                color: 'red'
                            },
                            {
                                text: `- Rp ${
                                    values.potongan
                                        ? currencyFormat(values.potongan)
                                        : 0
                                }`,
                                border: [false, false, false, true],
                                fillColor: '#f5f5f5',
                                color: 'red',
                                alignment: 'right',
                                margin: [0, 5, 0, 5]
                            }
                        ]
                    ]
                }
            },
            values.master_promo
                ? {
                      text: `*Promo ${values.master_promo.code}`,
                      alignment: 'right',
                      width: 100,
                      fontSize: 8
                  }
                : null,
            values.master_promo
                ? {
                      text: values.master_promo.description,
                      alignment: 'right',
                      width: 100,
                      fontSize: 8
                  }
                : null,
            '\n\n',
            {
                layout: {
                    defaultBorder: false,
                    hLineWidth: function (i, node) {
                        return 1;
                    },
                    vLineWidth: function (i, node) {
                        return 1;
                    },
                    hLineColor: function (i, node) {
                        return '#eaeaea';
                    },
                    vLineColor: function (i, node) {
                        return '#eaeaea';
                    },
                    hLineStyle: function (i, node) {
                        // if (i === 0 || i === node.table.body.length) {
                        return null;
                        //}
                    },
                    // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
                    paddingLeft: function (i, node) {
                        return 10;
                    },
                    paddingRight: function (i, node) {
                        return 10;
                    },
                    paddingTop: function (i, node) {
                        return 3;
                    },
                    paddingBottom: function (i, node) {
                        return 3;
                    },
                    fillColor: function (rowIndex, node, columnIndex) {
                        return '#fff';
                    }
                },
                table: {
                    headerRows: 1,
                    widths: ['*', 'auto'],
                    body: [
                        [
                            {
                                text: 'Total',
                                bold: true,
                                fontSize: 16,
                                alignment: 'right',
                                border: [false, false, false, true],
                                margin: [0, 5, 0, 5]
                            },
                            {
                                text: `Rp ${currencyFormat(
                                    countSubtotal(values).total
                                )}`,
                                bold: true,
                                fontSize: 16,
                                alignment: 'right',
                                border: [false, false, false, true],
                                fillColor: '#f5f5f5',
                                margin: [0, 5, 0, 5]
                            }
                        ]
                    ]
                }
            },
            {
                text: 'Catatan:',
                style: 'notesTitle'
            },
            {
                ol: [
                    'Pengambilan barang harus menunjukan invoice',
                    'Cek kondisi barang terlebih dahulu'
                ]
            }
        ],
        styles: {
            notesTitle: {
                fontSize: 10,
                bold: true,
                margin: [0, 24, 0, 0]
            },
            notesText: {
                fontSize: 16
            }
        },
        defaultStyle: {
            columnGap: 20
            //font: 'Quicksand',
        }
    };
};
