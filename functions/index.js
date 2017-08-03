'use strict';
const functions = require('firebase-functions')
const admin = require('firebase-admin')
const humps = require('lodash-humps')

admin.initializeApp(functions.config().firebase);

// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original

exports.addMessage = functions.https.onRequest((req, res) => {
  if (req.method !== 'POST') {
    res.status(403).send('Forbidden!');
  }
  // Grab the form post body.
  const original = humps(req.body)
  original.message = new Buffer(original.data, 'hex').toString('utf8')
  // Push it into the Realtime Database then send a response
  admin.database().ref('/messages').push(original)
  .then(snapshot => {
    // res.redirect(303, snapshot.ref); // SEE OTHER. URL of the new object in the Firebase console.
    res.status(200).send('okay')
  })
})

// Listens for new messages added to /messages/:pushId/original and creates an
// uppercase version of the message to /messages/:pushId/uppercase
// exports.makeUppercase = functions.database.ref('/messages/{pushId}/data').onWrite(event => {
//   // Grab the current value of what was written to the Realtime Database.
//   const original = event.data.val();
//   console.log('get msg from', event.params.pushId);
//   const message = new Buffer(original, 'hex').toString('utf8');
//
//   // writing to the Firebase Realtime Database.
//   return event.data.ref.parent.child('message').set(message);
// });
