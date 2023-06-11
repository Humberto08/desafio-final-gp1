import multer from "multer";
import path from "path"

//set storage engine
const storageEngine = multer.diskStorage({
    destination: "./uploads",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}--${file.originalname}`);
    },
});


//add Image Validation Rules:

//update multer configuration object
const upload = multer({
    storage: storageEngine,
    limits: { fileSize: 1000000 },
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    },
});

//implement the file filtering logic
const checkFileType = function (file: any, cb: any) {
    //allowed file extensions
    const fileTypes = /jpeg|jpg|png|gif|svg/;

    //check extension names
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

    const mimeType = fileTypes.test(file.mimetype);

    if (mimeType && extName) {
        return cb(null, true);
    } else {
        cb("Erro: você só pode subir imagens!");
    }
};

// const upload = multer({

//     storage: storageEngine,

//     limits: { fileSize: 1000000 },

//     fileFilter(_req, file, cb) {

//         if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
//             return cb(new Error('✖️ Precisa enviar uma imagem válida!')!)
//         }

//         cb(null, true)

//     }
// });

export default upload;
