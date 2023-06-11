import multer from "multer";

const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(_req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('✖️ Precisa enviar uma imagem válida!')!)
        }
        cb(null, true)
    }
});

export default upload;
