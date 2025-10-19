const express = require("express");
const multer = require('multer')
const {
  addFeatureImage,
  getFeatureImages,
} = require("../../controllers/common/feature-controller");

const router = express.Router();

const upload = multer(); 

router.post("/add",upload.single("image"), addFeatureImage);
router.get("/get", getFeatureImages);

module.exports = router;
