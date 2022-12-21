const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "content");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 1000000 * 100 },
  fileFilter: (req, file, cb) => {
    const fileTypes = new RegExp(/.png|.mp4|.gif|.jpg|.jpeg/);
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));
    if (extname && mineType) {
      cb(null, true);
    } else {
      cb("Only image format supported");
    }
  },
}).single("content");

module.exports = upload;
