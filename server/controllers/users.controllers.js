import User from '../models/user.model.js';
import { userSchema } from '../validations/userValidation.js';
import { errors } from '@vinejs/vine';
import vine from '@vinejs/vine';

// Create a new User

export const createUser = async (req, res) => {
  try {
    const validator = vine.compile(userSchema);
    const payload = await validator.validate(req.body);

    const user = await User.create({
      first_name: payload.first_name,
      last_name: payload.last_name,
      email: payload.email,
      gender: payload.gender,
      domain: payload.domain,
      available: payload.available,
    });

    res
      .status(200)
      .json({ success: true, user, message: 'User created Successfully!' });
  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      res.status(400).json({ success: false, errors: error.messages });
    } else {
      console.error(error);

      res
        .status(500)
        .json({ success: false, message: 'Internal Server Error' });
    }
  }
};

// Get All Users

export const getAllUsers = async (req, res) => {
  const { page = 1, limit = 20, domain, available, gender } = req.query;
  const skipCount = (page - 1) * limit;

  const query = {};

  if (domain) {
    query.domain = domain;
  }
  if (available !== undefined) {
    query.available = available === 'true';
  }
  if (gender) {
    query.gender = gender;
  }

  try {
    const users = await User.find(query).skip(skipCount).limit(Number(limit));

    res.status(200).json({ users, success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a specific user
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ user, success: true });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a specific user
export const updateUser = async (req, res) => {
  try {
    const validator = vine.compile(userSchema);
    const payload = await validator.validate(req.body);
    const user = await User.findByIdAndUpdate(req.params.id, payload, {
      new: true,
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    res
      .status(200)
      .json({ success: true, user, message: 'User updated Successfully!' });
  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      return res.status(400).json({ errors: error.messages });
    } else {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, message: 'Internal Server Error' });
    }
  }
};

// Deleting a user
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).json({ message: 'User not found', success: false });
    }
    res
      .status(200)
      .json({ message: 'User deleted successfully', success: true });
  } catch (err) {
    res.status(500).json({ error: err.message, success: false });
  }
};

// Searching a user
export const SearchUser = async (req, res) => {
  const { first_name } = req.query;

  try {
    const users = await User.find({
      first_name: { $regex: new RegExp(first_name, 'i') },
    });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
