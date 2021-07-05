const path = require('path');

require('dotenv').config({
    path: path.resolve(__dirname, `.env.${process.env.NODE_ENV}`)
});

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./src/models/db');
const authenticateToken = require('./src/middleware/authenticate-token');
// Routes
const masterRoutes = require('./src/routes/master');
const customerRoutes = require('./src/routes/customer');
const authRoutes = require('./src/routes/auth');
const orderRoutes = require('./src/routes/order');

const app = express();
const PORT = process.env.PORT || 8080;

let corsOptions = {
    origin: [
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:8081',
        'https://seekil.id'
    ],
    Headers: {
        'Access-Control-Allow-Origin': '*'
    }
};

app.use(cors(corsOptions));

db.sequelize.sync();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', async (req, res) => {
    res.send({ meesage: `Server is running on port: ${PORT}` });
});

app.use('/order', authenticateToken, orderRoutes.order);
app.use('/order', authenticateToken, orderRoutes.orderItem);
app.use('/order', authenticateToken, orderRoutes.orderItemServices);
app.use('/order', authenticateToken, orderRoutes.orderTracker);
app.use('/invoice', authenticateToken, orderRoutes.invoice);

app.use('/master/partnership', authenticateToken, masterRoutes.partnership);
app.use('/master/product', authenticateToken, masterRoutes.product);
app.use('/master/promo', authenticateToken, masterRoutes.promo);
app.use('/master/service', authenticateToken, masterRoutes.services);
app.use('/master/status', authenticateToken, masterRoutes.status);
app.use('/master/store', authenticateToken, masterRoutes.store);
app.use('/master/type', authenticateToken, masterRoutes.type);
app.use(
    '/master/payment-method',
    authenticateToken,
    masterRoutes.paymentMethod
);

app.use('/customer', authenticateToken, customerRoutes.customer);
app.use('/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
