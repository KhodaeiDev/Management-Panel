const multer = require("multer");
const path = require("path");
const fs = require("fs");

exports.multerStorage = (destination, allowedType = /jpeg|jpg|png|webp/) => {
  destination = path.join(__dirname, "..", "public", "images") + destination;

  if (!fs.existsSync(destination)) {
    fs.mkdir(destination);
  }

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, destination);
    },
    filename: function (req, file, cb) {
      const extname = path.extname(file.originalname);
      const filename = Date.now() + Math.floor(Math.random() * 9999);
      cb(null, `${filename}${extname}`);
    },
  });

  const fileFilter = function (req, file, cb) {
    if (allowedType.test(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("File Type Not Allowed"));
    }
  };

  const uploader = multer({
    storage,
    limits: {
      fileSize: 5000000,
    },
    fileFilter,
  });
  return uploader;
};
