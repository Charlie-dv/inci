const Incident = require('../models/Incident');
const { validationResult } = require('express-validator');
const sendEmail = require('../utils/sendEmail');

const reportIncident = async (req, res) => {
    const { title, description, location, coordinates } = req.body;

    const incident = new Incident({
        title,
        description,
        location,
        coordinates, // Include the received coordinates
        reportedBy: req.user._id,
    });

    const createdIncident = await incident.save();
    res.status(201).json(createdIncident);
};


const getIncidents = async (req, res) => {
  try {
    const incidents = await Incident.find({ user: req.user.id });
    res.json(incidents);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server error');
  }
};

module.exports = { reportIncident, getIncidents };
