require("dotenv").config();
process.argv.forEach((value, index) => console.log(index + " => " + value));


module.exports =  {
    fileSystem: {
        path: './DB'
    },
    admin:true,
    mongodb: {
      // cnxStr: '"mongodb+srv://' + process.env.MONGO_USER + ':' + process.env.MONGO_PASSWORD + '@' + process.env.MONGO_SERVER + '/' + process.env.MONGO_BASE + '"',
      cnxStr:'mongodb://localhost:27017/ecommerce',
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
    IS_CLUSTER: process.argv[2] === "CLUSTER" ? true : false,
    PORT: parseInt(process.argv[3]) || process.env.PORT || 8080,
    TIEMPO_EXPIRACION : 200000,
     // credenciales Twillio
     TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
     TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
     TWILIO_NUM_SMS: process.env.TWILIO_NUM_SMS,
     TWILIO_NUM_WHATSAPP: process.env.TWILIO_NUM_WHATSAPP,
}



