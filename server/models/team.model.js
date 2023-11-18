import mongoose from 'mongoose';

const teamMembersSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const teamSchema = new mongoose.Schema({
  team: [teamMembersSchema],
});

const Team = mongoose.model('Team', teamSchema);

export default Team;
