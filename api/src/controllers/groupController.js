const Group = require('../models/Group');

exports.createGroup = async (req, res) => {
  const { name } = req.body;
  try {
    const group = await Group.create({ name, ownerId: req.user.id });
    res.status(201).json({ success: true, data: group });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Other group-related controllers...