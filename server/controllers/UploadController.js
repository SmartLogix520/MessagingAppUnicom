const multer = require("multer");
const path = require("path");

// Définir l'endroit ou stocker les images
const storage = multer.diskStorage({
  destination: "./public/medias/",
  filename: function (req, file, callback) {
    callback(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});
// Définir le stockage pour les fichiers audio 
const storageAudio = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const audioUpload = multer({ 
  storage: storageAudio,
}).single("audio");

/* Mettre en ligne l'image */
const upload = multer({
  storage: storage,
}).single("image");

/* Permet d'envoyer un fichier */
const UploadFile = async (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
      res.send("File upload unsuccessfull");
    } else {
      res.send("File upload successfull");
    }
  });
};
// Upload Audio
const UploadAudio = async (req, res) => {
  audioUpload(req, res, (err) => {
    if (err) {
      console.log(err);
      res.send("Audio file upload unsuccessful");
    } else {
      res.send("Audio file upload successful");
    }
  });
};
module.exports = { UploadFile , UploadAudio};
