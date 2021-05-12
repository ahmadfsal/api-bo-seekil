const path = require('path');
require('dotenv').config({
    path: path.resolve(__dirname, `.env.${process.env.NODE_ENV}`)
});

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

let corsOptions = {
    origin: [
        'http://localhost:3000',
        'http://localhost:3001',
        'https://glacial-journey-79187.herokuapp.com/master/type'
    ],
    Headers: {
        'Access-Control-Allow-Origin': '*'
    }
};

app.use(cors(corsOptions));

const db = require('./src/models/db');
db.sequelize.sync();
// db.sequelize.sync({ force: true }).then(() => {
//     console.log('Drop and re-sync db.')
// })

if (process.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express.static('client/build'));
}

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({
        message: 'Server is already running...'
    });
});

require('./src/routes/order/order')(app);
require('./src/routes/order/order-item')(app);
require('./src/routes/order/order-item-services')(app);
require('./src/routes/order/order-tracker')(app);
require('./src/routes/master/master-status')(app);
require('./src/routes/master/master-type')(app);
require('./src/routes/master/master-products')(app);
require('./src/routes/master/master-services')(app);
require('./src/routes/master/master-partnership')(app);
require('./src/routes/master/master-promo')(app);
require('./src/routes/customer')(app);

// set port, listen for request
app.listen(PORT, () => {
    console.log('Server is running on port: 8080');
});
