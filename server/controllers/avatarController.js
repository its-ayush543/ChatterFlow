const Avatar = require("../../models/avatars");

async function avatarController(req, res) {
  const { link } = req.body;
  if (!link) {
    return res.status(400).json({ error: "Link is required" });
  }
  try {
    const newAvatar = new Avatar({ link });
    await newAvatar.save();
    return res
      .status(201)
      .json({ success: true, message: "Avatar created successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getAllAvatars(req, res) {
  try {
    const avatars = await Avatar.find();
    return res.status(200).json({ success: true, avatars });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
module.exports = {
  avatarController,
  getAllAvatars,
};
