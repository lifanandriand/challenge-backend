const { User, Notes } = require("../models");

module.exports = {
  createNotes: async (req, res) => {
    try {
      const { title, description } = req.body;

      const newNotes = await Notes.create({
        userId: req.user.id,
        title,
        description,
      });

      const payload = {
        id: newNotes.id,
        title,
        description,
      };

      return res.created("Note created", payload);
    } catch (err) {
      return res.serverError(err.message);
    }
  },

  listNotes: async (req, res) => {
    try {
      const listNotes = await User.findAll({
        attributes: ["id", "email", "name"],
        where: {
          id: req.user.id,
        },
        include: [
          {
            model: Notes,
            as: "listNotes",
            attributes: ["id", "title", "description", "completed"],
          },
        ],
      });

      return res.success("Success get all data", listNotes);
    } catch (err) {
      return res.serverError(err.message);
    }
  },

  detailNotes: async (req, res) => {
    try {
      const { notesId } = req.params;

      const notes = await Notes.findByPk(notesId);
      if (!notes) {
        return res.notFound("Note not found");
      }

      if (req.user.id !== notes.userId) {
        return res.unauthorized("You not authorized");
      }

      const payload = {
        title: notes.title,
        description: notes.description,
      };

      return res.success("Success get note", payload);
    } catch (err) {
      return res.serverError(err.message);
    }
  },

  updateNotes: async (req, res) => {
    try {
      const { notesId } = req.params;
      const { title, description } = req.body;

      if (title) req.body.title = title;
      if (description) req.body.description = description;

      const notes = await Notes.findByPk(notesId);
      if (!notes) {
        return res.notFound("Notes not found");
      }

      if (req.user.id !== notes.userId) {
        return res.unauthorized("You not authorized");
      }

      await Notes.update(
        {
          title,
          description,
        },
        {
          where: {
            id: notesId,
          },
        }
      );

      const payload = {
        title,
        description,
      };

      return res.success("Note updated", payload);
    } catch (err) {
      return res.serverError(err.message);
    }
  },

  completedNotes: async (req, res) => {
    try {
      const { notesId } = req.params;

      const notes = await Notes.findByPk(notesId);
      if (!notes) {
        return res.notFound("Note not found");
      }

      if (req.user.id !== notes.userId) {
        return res.unauthorized("You not authorized");
      }

      await Notes.update(
        {
          completed: true,
        },
        {
          where: {
            id: notesId,
          },
        }
      );

      const payload = {
        id: notes.id,
        title: notes.title,
        description: notes.description,
        completed: true,
      };

      return res.success("Note completed", payload);
    } catch (err) {
      return res.serverError(err.message);
    }
  },

  deleteNotes: async (req, res) => {
    try {
      const { notesId } = req.params;

      const notes = await Notes.findByPk(notesId);
      if (!notes) {
        return res.notFound("Note not found");
      }

      notes.destroy();

      return res.success(`Note ${notes.id} been deleted`);
    } catch (err) {
      return res.serverError(err.message);
    }
  },
};