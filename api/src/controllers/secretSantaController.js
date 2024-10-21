const SecretSantaAssignment = require('../models/SecretSantaAssignment');
const Membership = require('../models/Membership');

exports.assignSecretSanta = async (req, res) => {
  const { groupId } = req.params;
  try {
    const members = await Membership.find({ groupId, isAccepted: true });
    const assignments = [];
    const shuffledMembers = members.sort(() => 0.5 - Math.random());

    for (let i = 0; i < shuffledMembers.length; i++) {
      const giver = shuffledMembers[i];
      const receiver = shuffledMembers[(i + 1) % shuffledMembers.length];
      assignments.push({ giverId: giver.userId, receiverId: receiver.userId, groupId });
    }

    await SecretSantaAssignment.insertMany(assignments);
    res.status(201).json({ success: true, data: assignments });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Other Secret Santa-related controllers...