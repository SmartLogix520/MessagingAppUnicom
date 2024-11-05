const multer = require("multer"); // ce fichier est un autre middleware multer pour prendre en charge l'upload et le sotckage de la piéce jointe 
//configure how the files are stored
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //where to store the file
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  //reject a file if it's not a jpg or png
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "application/pdf" ||
    file.mimetype === "application/msword" ||
    file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

const UploadFile = (req, res) => {
    upload(req, res, (err) => {
      if (err) {
        console.log(err);  // Affichez les erreurs ici
        res.send("Téléchargement de fichier échoué");
      } else {
        console.log(req.files);  // Affichez les fichiers téléchargés ici
        res.send("Téléchargement de fichier réussi");
      }
    });
};

module.exports = upload;


// const UploadFile = (req, res) => {
//   upload(req, res, (err) => {
//     if (err) {
//       console.error(err);
//       res.status(500).json({ message: "Téléchargement de fichier échoué" });
//     } else {
//       res.status(200).json({ message: "Téléchargement de fichier réussi" });
//     }
//   });
// };

//module.exports = { UploadFile, upload };
//module.exports = {upload };
