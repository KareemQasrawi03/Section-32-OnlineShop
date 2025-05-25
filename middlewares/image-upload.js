const multer = require("multer");
const uuid = require("uuid").v4;

const upload = multer({
  storage: multer.diskStorage({
    destination: "product-data/images", // storeg file
    filename: function (req, file, cb) {
      cb(null, uuid() + "-" + file.originalname);
    },
  }),
}); //normal setting

const configredMulterMiddlewar = upload.single("image"); // only processing image file  (image name input file)

module.exports = configredMulterMiddlewar;
