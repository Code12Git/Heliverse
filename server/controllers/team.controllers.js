import Team from '../models/team.model.js';
import User from '../models/user.model.js';

export const createTeam = async (req, res) => {
  const { selectedUsers } = req.body;

  try {
    // Fetch users based on the provided user IDs
    const users = await User.find({ _id: { $in: selectedUsers } });

    // Check for unique domains and availability
    const domainsSet = new Set();
    const availabilitySet = new Set();

    for (const user of users) {
      if (domainsSet.has(user.domain) || availabilitySet.has(user.available)) {
        return res.status(400).json({
          error: 'Selected users should have unique domains and availability',
          success: false,
        });
      }
      domainsSet.add(user.domain);
      availabilitySet.add(user.available);
    }

    // Extract user IDs from the fetched users
    const userIds = users.map((user) => user._id);

    // Create a new team and associate the users
    const newTeam = new Team({ team: userIds });
    const savedTeam = await newTeam.save();

    res.status(201).json({ team: savedTeam, success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error', success: false });
  }
};

// export const deleteTeam = async (req, res) => {
//   try {
//     const team = await Team.deleteMany();
//     res.status(200).json({ message: 'deleted Successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Internal server error', success: false });
//   }
// };

// Get Team
export const getTeam = async (req, res) => {
  const { id } = req.params;
  try {
    const team = await Team.findById(id);
    if (!team) {
      res.status(404).json({ message: 'Team not found' });
    }
    res
      .status(200)
      .json({ message: 'Team fetched successfully!', team, success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
