require("dotenv").config();
process.argv.forEach((value, index) => console.log(index + " => " + value));


module.exports = {
    fileSystem: {
        path: './DB'
    },
    admin: true,
    mongodb: {
        cnxStr: 'mongodb://localhost:27017/ecommerce',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    },
    gmail: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
        admin: process.env.GMAIL_ADMIN
    },
    firebase: {
        "type": process.env.FIREBASE_type,
        "project_id": process.env.FIREBASE_project_id,
        "private_key_id": process.env.FIREBASE_private_key_id,
        "private_key": process.env.FIREBASE_client_email,
        "client_email": process.env.FIREBASE_private_key,
        "client_id": process.env.FIREBASE_client_id,
        "auth_uri": process.env.FIREBASE_auth_uri,
        "token_uri": process.env.FIREBASE_token_uri,
        "auth_provider_x509_cert_url": process.env.FIREBASE_auth_provider_x509_cert_url,
        "client_x509_cert_url": process.env.FIREBASE_client_x509_cert_url
    },
    IS_CLUSTER: process.argv[2] === "CLUSTER",
    PORT: parseInt(process.argv[3]) || process.env.PORT || 8080,
    TIEMPO_EXPIRACION: 200000,
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    TWILIO_NUM_SMS: process.env.TWILIO_NUM_SMS,
    TWILIO_NUM_WHATSAPP: process.env.TWILIO_NUM_WHATSAPP,
    ADMIN_WHATSAPP: process.env.ADMIN_WHATSAPP,
    TWILIO_SMS_SERVICE: process.env.TWILIO_SMS_SERVICE,
    ALLOW_CORS: !!+process.env.ALLOW_CORS,
    ENABLE_WEB_SOCKETS: !!+process.env.ENABLE_WEB_SOCKETS,
    SESSION_CONFIG: {
        key: 'koa:sess',
        maxAge: process.env.COOKIE_MAX_AGE || 86400000,
        autoCommit: true,
        overwrite: true,
        httpOnly: !!+process.env.PROD,
        signed: true,
        rolling: false,
        renew: true,
        secure: !!+process.env.PROD,
        sameSite: !!+process.env.PROD,
    }
}
