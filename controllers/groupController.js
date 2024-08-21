const Group = require('./models/Group');
const Membership = require('../models/Membership');

const createGroup = async (req, res) => {
  try {
    const group = await Group.create({
      name: req.body.name,
      ownerId: req.user.id,
    });
    await Membership.create({
      userId: req.user.id,
      groupId: group._id,
      isAccepted: true,
    });
    res.status(201).json(group);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getGroups = async (req, res) => {
  try {
    const groups = await Group.find({ ownerId: req.user.id });
    res.json(groups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createGroup, getGroups };
