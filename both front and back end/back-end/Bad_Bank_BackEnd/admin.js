const admin = require('firebase-admin');

require ('dotenv').config();

admin.initializeApp({
    credential: admin.credential.cert({
        type: process.env.type,
        project_id: process.env.project_id,
        private_key_id: process.env.private_key_id,
        private_key:
            process.env.private_key.replace(/\\n/g,'\n'),
            client_email: process.env.client_email
    })
});
module.exports =admin