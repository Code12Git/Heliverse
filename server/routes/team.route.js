import express from 'express';
import { createTeam, getTeam } from '../controllers/team.controllers.js';
const router = express.Router();

// Creating a router
router.post('/', createTeam);

// // Deleting a team
// router.delete('/', deleteTeam);

// Get a team
router.get('/:id', getTeam);

export default router;
