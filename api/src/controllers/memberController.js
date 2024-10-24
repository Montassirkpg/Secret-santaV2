const Membership = require('../models/Membership');

exports.addMember = async (req, res) => {
  const { userId } = req.body;
  const { groupId } = req.params;
  try {
    const membership = await Membership.create({ userId, groupId });
    res.status(201).json({ success: true, data: membership });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Other member-related controllers...