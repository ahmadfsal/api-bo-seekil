module.exports = (title, body, orderId) => {
    const admin = require('firebase-admin');
    const path = require('path');
    const serviceAccount = require(path.resolve(
        'tools',
        './seekil-back-office-firebase-adminsdk-dxkpm-c25e521951'
    ));

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL:
            'https://seekil-back-office-default-rtdb.asia-southeast1.firebasedatabase.app/'
    });

    const payload = {
        data: {
            click_action: 'FLUTTER_NOTIFICATION_CLICK',
            order_id: orderId,
        },
        notification: {
            title: title,
            body: body
        }
    };

    // Send a message to devices subscribed to the provided topic.
    admin
        .messaging()
        .sendToTopic('SeekilNotification', payload)
        .then((response) => console.log('Successfully sent message:', response))
        .catch((error) => console.log('Error sending message:', error));
};
