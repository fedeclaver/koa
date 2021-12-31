const multer = require('multer');

// configuro multer
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + '../../public/img')
    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + '_' + file.originalname)
    }
});

const upload = multer({ storage: storage });

module.exports = upload;