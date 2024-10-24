const mongoose = require('mongoose');

const membershipSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
  isAccepted: { type: Boolean, default: false },
});

const Membership = mongoose.model('Membership', membershipSchema);

module.exports = Membership;