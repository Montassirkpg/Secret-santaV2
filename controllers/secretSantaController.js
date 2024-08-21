const Membership = require('../models/Membership');
const SecretSantaAssignment = require('../models/SecretSantaAssignment');
const assignSecretSanta = require('../utils/secretSanta');

const assignSanta = async (req, res) => {
  try {
    const members = await Membership.find({ groupId: req.params.groupId, isAccepted: true });
    if (members.length < 2) {
      return res.status(400).json({ message: 'Not enough members to assign Secret Santa' });
    }
    const assignments = assignSecretSanta(members);
    await SecretSantaAssignment.insertMany(assignments);
    res.status(201).json(assignments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { assignSanta };
