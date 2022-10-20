
const allMimetypes = ['image/jpeg', 'image/jpg', 'image/png'];
const path = require('path');
const multer = require('multer');

// Configuração de armazenamento
function configStorage(choosenPath) {

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve('src/images/' + choosenPath))
        },
        filename: (req, file, cb) => {
            const time = new Date().getTime();
            cb(null, `${time}_${file.originalname}`)
    
        }
    });

    const upload = multer({ storage: storage });

    return upload;

}

module.exports = configStorage;