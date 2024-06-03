const multer = require("multer");
const path = require("path");
const fs = require("fs");

exports.multerStorage = (destination, allowedType = /jpeg|jpg|png|webp/) => {
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination);
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, destination);
    },
    filename: (req, file, cb) => {
      const extname = path.extname(file.originalname);
      const filename = Date.now() + Math.floor(Math.random * 9999);
      cb(`${filename}${extname}`);
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
