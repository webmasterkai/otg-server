import functions from 'firebase-functions'
import admin from 'firebase-admin'
import humps from 'lodash-humps'

admin.initializeApp(functions.config().firebase)

export const addMessage = functions.https.onRequest((req, res) => {
  // Grab the text parameter.
  const original = humps(req.body)
  // Push it into the Realtime Database then send a response
  admin.database().ref('/messages').push(original).then(snapshot => {
    // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
    res.redirect(303, snapshot.ref)
  })
})

// imei - The unique IMEI of your RockBLOCK
// momsn - The Message Sequence Number set by RockBLOCK when the message was sent to the Iridium Gateway. Integer in the range 0 to 65,535. Incremented each time a transmit session is successfully completed from the device to the Iridium Gateway. It is a wrap around counter which will increment to 0 after reaching 65535.
// transmit_time - The date & time (always UTC) that the message was transmitted.
// iridium_latitude - The approximate latitude of the RockBLOCK at the time it transmitted.
// iridium_longitude - The approximate longitude of the RockBLOCK at the time it transmitted.
// iridium_cep - An estimate of the accuracy (in km) of the position information in the previous two fields.
// data - Your message, hex-encoded.

// Must respond with an HTTP status 200, to indicate that you have successfully handled the message.

// What format is transitTime in?
// Figure out how to send GPS with Binary.
// 8 messages. We are okay. Hope all is well.
// Sail status. Anchor/Sailing/Motor/HoveTo
