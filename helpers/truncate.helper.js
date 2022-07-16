const { User, Notes } = require("../models");

module.exports = {
  user: () => User.destroy({ truncate: true, restartIdentity: true }),
  notes: () => Notes.destroy({ truncate: true, restartIdentity: true }),
};