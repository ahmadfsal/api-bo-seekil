module.exports = (title, body, orderId) => {
    const admin = require('firebase-admin');
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
