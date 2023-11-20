import mongoose from 'mongoose';

const teamMembersSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  first_name: String,
  last_name: String,
  email: String,
  domain: String,
  available: Boolean,
  gender: String,
});

const teamSchema = new mongoose.Schema({
  team: [teamMembersSchema],
});

const Team = mongoose.model('Team', teamSchema);

export default Team;
