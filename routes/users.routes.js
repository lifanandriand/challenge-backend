const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.cotroller");

const authMiddleware = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");

router.get("/detail", authMiddleware.userAuth, userController.getUserBy);

router.put("/update", authMiddleware.userAuth, userController.updateUser);
router.put(
  "/upload/profile_picture",
  authMiddleware.userAuth,
  upload.single("profile_picture"),
  userController.uploadProfile_picture
);

router.delete(
  "/delete/:userId",
  authMiddleware.userAuth,
  userController.deleteUser
);

module.exports = router;