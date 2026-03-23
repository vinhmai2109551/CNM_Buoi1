const Subject = require("../models");

const Controller = {};

// ========================================
// GET ALL SUBJECTS (Render subjects.ejs)
// ========================================
Controller.get = async (req, res) => {
  try {
    const result = await Subject.getSubjects();

    // Nếu model trả về array
    let subjects = [];

    if (Array.isArray(result)) {
      subjects = result;
    }

    // Nếu model trả về dạng { success, data }
    if (result && Array.isArray(result.data)) {
      subjects = result.data;
    }

    return res.render("subjects", {
      subjects: subjects,
    });

  } catch (error) {
    console.error("GET SUBJECTS ERROR:", error);

    return res.render("subjects", {
      subjects: [],
    });
  }
};

// ========================================
// GET ONE SUBJECT BY ID (Render edit.ejs)
// ========================================
Controller.getOne = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send("Subject ID is required");
    }

    const result = await Subject.getOneSubject(id);

    let subject = null;

    // Nếu model trả object trực tiếp
    if (result && !result.data) {
      subject = result;
    }

    // Nếu model trả dạng { success, data }
    if (result && result.data) {
      subject = result.data;
    }

    if (!subject) {
      return res.status(404).send("Subject not found");
    }

    return res.render("edit", {
      subject: subject,
    });

  } catch (error) {
    console.error("GET ONE SUBJECT ERROR:", error);
    return res.status(500).send("Error loading subject");
  }
};

module.exports = Controller;