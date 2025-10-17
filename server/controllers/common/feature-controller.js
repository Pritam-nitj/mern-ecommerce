const Feature = require("../../models/Feature");
const cloudinary = require('../../helpers/cloudinary');


const addFeatureImage = async (req, res) => {
  try {
    // 1. Check if a file was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image file provided.",
      });
    }

    // 2. Convert buffer to a data URI for Cloudinary
    // This makes it easy for Cloudinary to process the image from memory.
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;

    // 3. Upload the image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(dataURI, {
      folder: "feature_images", // Optional: organize uploads in a specific folder
    });

    // 4. Create a new document in your database with the Cloudinary URL
    const feature = new Feature({
      image: uploadResult.secure_url, // Use the secure HTTPS URL
    });

    // 5. Save the document to the database
    await feature.save();

    // 6. Send success response
    res.status(201).json({
      success: true,
      message: "Feature image uploaded successfully!",
      data: feature,
    });

  } catch (e) {
    console.error("Error uploading feature image:", e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

// const addFeatureImage = async (req, res) => {
//   try {
//     const { image } = req.body;

//     const featureImages = new Feature({
//       image,
//     });

//     await featureImages.save();

//     res.status(201).json({
//       success: true,
//       data: featureImages,
//     });
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({
//       success: false,
//       message: "Some error occured!",
//     });
//   }
// };

const getFeatureImages = async (req, res) => {
  try {
    const images = await Feature.find({});

    res.status(200).json({
      success: true,
      data: images,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

module.exports = { addFeatureImage, getFeatureImages };
