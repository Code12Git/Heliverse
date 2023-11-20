import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  first_name: {
    type: String,
    required: true,
    trim: true,
  },
  last_name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  domain: {
    type: String,
    required: true,
  },
  available: {
    type: Boolean,
    default: false,
  },
});
const User = mongoose.model('User', userSchema);

export default User;
