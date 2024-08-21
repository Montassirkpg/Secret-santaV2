const assignSecretSanta = (members) => {
    let receivers = [...members];
    const assignments = [];
  
    members.forEach((giver) => {
      let receiverIndex;
      do {
        receiverIndex = Math.floor(Math.random() * receivers.length);
      } while (receivers[receiverIndex]._id.toString() === giver._id.toString());
      assignments.push({ giverId: giver._id, receiverId: receivers[receiverIndex]._id });
      receivers.splice(receiverIndex, 1);
    });
  
    return assignments;
  };
  
  module.exports = assignSecretSanta;
  