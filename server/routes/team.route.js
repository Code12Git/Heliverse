import express from 'express';
import {
  createTeam,
  getTeam,
  deleteTeam,
  getOneTeam,
} from '../controllers/team.controllers.js';
const router = express.Router();

// Creating a router
router.post('/', createTeam);

// // Deleting a team
router.delete('/', deleteTeam);

// Get a team
router.get('/:id', getOneTeam);

// Get a team
router.get('/', getTeam);

export default router;
