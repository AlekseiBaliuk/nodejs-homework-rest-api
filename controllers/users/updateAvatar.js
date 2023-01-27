const { User } = require("../../models");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id: id } = req.user;

  const [extension] = originalname.split('.').reverse();
  const avatarName = `${id}.${extension}`;

  // const avatarName = `${id}_${originalname}`;

  await Jimp.read(tempUpload)
    .then((avatar) => {
      avatar.resize(250, 250);
      avatar.write(tempUpload);
    })
    .catch((err) => {
      throw err;
    });

  try {
    const resultUpload = path.join(avatarsDir, avatarName);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("avatars", avatarName);
    await User.findByIdAndUpdate(id, { avatarURL });
    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw new Error(error.message);
  }
};

module.exports = updateAvatar;
