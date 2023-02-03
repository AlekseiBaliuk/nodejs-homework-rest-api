const { User } = require("../../models");
// const path = require("path");
const fs = require("fs/promises");
// const Jimp = require("jimp");
const cloudinary = require("cloudinary").v2;

// const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { path: tempUpload } = req.file;
  const { _id: id } = req.user;

  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true,
  });

  // const uploadCloud = (pathPile) => {
  //   return new Promise((resolve, reject) => {
  //     cloudinary.uploader.upload(
  //       pathPile,
  //       { folder: "contacts", transformation: { with: 250, crop: "pad" } },
  //       (error, result) => {
  //         console.log(result);
  //         if (error) reject(error);
  //         if (result) resolve(result);
  //       }
  //     );
  //   });
  // };

  try {
    const { secure_url: avatarURL, public_id: idCloudAvatar } =
      await cloudinary.uploader.upload(tempUpload, {
        folder: "contacts",
        transformation: { with: 250, crop: "pad" },
      });

    const user = await User.findOne(id);
    await cloudinary.uploader.destroy(user.idCloudAvatar, {
      folder: "contacts",
    });
    
    await User.findByIdAndUpdate(id, { avatarURL, idCloudAvatar });

    await fs.unlink(tempUpload);

    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw new Error(error.message);
  }
};

module.exports = updateAvatar;
