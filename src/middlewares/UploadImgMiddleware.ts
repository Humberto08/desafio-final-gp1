import multer from "multer";

const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req: any, file: any, cb: any) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('✖️ Precisa enviar uma imagem válida!')!)
        }
        cb(null, true)
    }
});

export default upload;
