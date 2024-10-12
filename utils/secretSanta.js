const Membership = require('../models/Membership');

exports.assignSecretSantas = async (groupId) => {
    const members = await Membership.find({ group: groupId });
    if (members.length < 2) throw new Error('Not enough members in the group');

    const assignments = [];
    const shuffledMembers = members.sort(() => 0.5 - Math.random());

    for (let i = 0; i < shuffledMembers.length; i++) {
        const santa = shuffledMembers[i];
        const receiver = shuffledMembers[(i + 1) % shuffledMembers.length]; // Ensure no one is assigned to themselves
        assignments.push({ santaId: santa.user, receiverId: receiver.user });
    }

    // Save assignments in the database
    await Membership.updateMany(
        { group: groupId },
        { $set: { assignments } }
    );

    return assignments;
};
