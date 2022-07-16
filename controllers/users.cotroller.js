const {User, Notes} = require("../models")
const { imagekit } = require("../library/imagekit");
const user = require("../validator/user");

module.exports = {
    getUserBy: async (req, res) => {
      try {
        const user = await User.findByPk(req.user.id);
  
        const payload = {
          id: user.id,
          email: user.email,
          name: user.name,
          profile_picture: user.profile_picture,
        };
  
        return res.success("Success retreived data", payload);
      } catch (err) {
        return res.serverError(err.message);
      }
    },
  
    uploadProfile_picture: async (req, res) => {
      try {
        const profile_picture = req.file.buffer.toString("base64");
        const fileName = `profile_picture - ${req.file.originalname}`;
  
        const uploadProfile_picture = await imagekit.upload({
          file: profile_picture,
          fileName,
        });
  
        await User.update(
          {
            profile_picture: uploadProfile_picture.url,
          },
          { where: { id: req.user.id } }
        );
  
        const payload = {
          id: req.user.id,
          profile_picture: uploadProfile_picture.url,
        };
  
        return res.success("User updated", payload);
      } catch (err) {
        return res.serverError(err.message);
      }
    },
  
    updateUser: async (req, res) => {
      try {
        const { name } = req.body;
  
        if (name) req.body.name = name;
  
        await User.update(
          {
            name,
          },
          { where: { id: req.user.id } }
        );
  
        const payload = {
          id: req.user.id,
          name,
        };
  
        return res.success("User updated", payload);
      } catch (err) {
        return res.serverError(err.message);
      }
    },
  
    deleteUser: async (req, res) => {
      try {
        const { userId } = req.params;
  
        const user = User.findByPk(userId);
        if (!user) {
          return res.notFound("User not found");
        }
  
        await Notes.destroy({ where: { userId } });
        await User.destroy({ where: { id: userId } });
  
        return res.success(`User has been deleted`);
      } catch (err) {
        return res.serverError(err.message);
      }
    },
  };