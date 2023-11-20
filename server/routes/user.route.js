import express from 'express';
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from '../controllers/users.controllers.js';

const router = express.Router();

// Creating a router
router.post('/', createUser);

// Getting all user
router.get('/', getAllUsers);

// Getting a single user
router.get('/:id', getUser);

// Updating a user
router.put('/:id', updateUser);

// Deleting a user
router.delete('/:id', deleteUser);

export default router;
