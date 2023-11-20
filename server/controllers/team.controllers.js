import Team from '../models/team.model.js';
import User from '../models/user.model.js';

export const createTeam = async (req, res) => {
  const { selectedUsers } = req.body;

  try {
    const users = await User.find({ _id: { $in: selectedUsers } }).select(
      'name email domain available gender',
    );

    const domainsSet = new Set();
    const availabilitySet = new Set();
    const conflictingUsers = [];

    for (const user of users) {
      if (domainsSet.has(user.domain) || availabilitySet.has(user.available)) {
        conflictingUsers.push(user);
      } else {
        domainsSet.add(user.domain);
        availabilitySet.add(user.available);
      }
    }

    if (conflictingUsers.length > 0) {
      const duplicateDomains = [
        ...new Set(conflictingUsers.map((user) => user.domain)),
      ];
      const duplicateAvailabilities = [
        ...new Set(conflictingUsers.map((user) => user.available)),
      ];
      return res.status(400).json({
        error: 'Selected users should have unique domains and availability',
        duplicateDomains,
        duplicateAvailabilities,
        conflictingUsers,
        success: false,
      });
    }

    const teamDetails = users.map((user) => ({
      user: user._id,
    }));

    const newTeam = new Team({ team: teamDetails });
    const savedTeam = await newTeam.save();
    console.log(savedTeam);

    res.status(201).json({ team: savedTeam, success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error', success: false });
  }
};

export const deleteTeam = async (req, res) => {
  try {
    const team = await Team.deleteMany();
    res.status(200).json({ message: 'deleted Successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error', success: false });
  }
};

// Get Team
export const getTeam = async (req, res) => {
  try {
    const teamWithUsers = await Team.find().populate('team.user');

    if (!teamWithUsers) {
      return res
        .status(404)
        .json({ message: 'Team not found', success: false });
    }
    const formattedTeam = teamWithUsers.map((teamItem) => ({
      _id: teamItem._id,
      team: teamItem.team
        .map((member) => {
          if (member.user) {
            return {
              _id: member.user._id,
              firstname: member.user.first_name,
              lastname: member.user.last_name,
              email: member.user.email,
              domain: member.user.domain,
              available: member.user.available,
              gender: member.user.gender,
            };
          }
          return null;
        })
        .filter((user) => user !== null),
      __v: teamItem.__v,
    }));

    res.status(200).json({
      message: 'Team fetched successfully!',
      team: formattedTeam,
      success: true,
    });
  } catch (err) {
    res.status(500).json({ message: err.message, success: false });
  }
};
