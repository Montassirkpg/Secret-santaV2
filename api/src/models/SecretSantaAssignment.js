const mongoose = require('mongoose');

const secretSantaAssignmentSchema = new mongoose.Schema({
  giverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
});

const SecretSantaAssignment = mongoose.model('SecretSantaAssignment', secretSantaAssignmentSchema);

module.exports = SecretSantaAssignment;