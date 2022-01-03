require("dotenv").config();
process.argv.forEach((value, index) => console.log(index + " => " + value));
const mongo_user = process.env.MONGO_USER
const mongo_password = process.env.MONGO_PASSWORD
const mongo_server = process.env.MONGO_SERVER

module.exports =  {
    fileSystem: {
        path: './DB'
    },
    admin:true,
    mongodb: {
       cnxStr: 'mongodb+srv://' + process.env.MONGO_USER + ':' + process.env.MONGO_PASSWORD + '@' + process.env.MONGO_SERVER + '/' + process.env.MONGO_BASE,
   
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
           // serverSelectionTimeoutMS: 40000,
        }
    },
    gmail:{
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
        admin:process.env.GMAIL_ADMIN
    },
    firebase: {
        "type": FIREBASE_type,
        "project_id": FIREBASE_project_id,
        "private_key_id": FIREBASE_private_key_id,
        "private_key": FIREBASE_client_email,
        "client_email": FIREBASE_private_key,
        "client_id": FIREBASE_client_id,
        "auth_uri": FIREBASE_auth_uri,
        "token_uri": FIREBASE_token_uri,
        "auth_provider_x509_cert_url": FIREBASE_auth_provider_x509_cert_url,
        "client_x509_cert_url": FIREBASE_client_x509_cert_url
            },
    IS_CLUSTER: process.argv[2] === "CLUSTER" ? true : false,
    PORT: parseInt(process.argv[3]) || process.env.PORT || 8080,
    TIEMPO_EXPIRACION : 200000,
     // credenciales Twillio
     TWILIO_ACCOUNT_SID: TWILIO_ACCOUNT_SID,
     TWILIO_AUTH_TOKEN: TWILIO_AUTH_TOKEN,
     TWILIO_NUM_SMS: TWILIO_NUM_SMS,
     TWILIO_NUM_WHATSAPP: TWILIO_NUM_WHATSAPP,
}



