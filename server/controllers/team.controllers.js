import Team from '../models/team.model.js';
import User from '../models/user.model.js';
export const createTeam = async (req, res) => {
  const { selectedUserIds } = req.body;
  console.log('Request Body:', req.body);
  console.log('Selected User IDs:', selectedUserIds);
  try {
    console.log('users');
    const users = await User.find({ _id: { $in: selectedUserIds } });
    console.log('Users' + users);
    const uniqueUsers = users.filter((user, index, self) => {
      return (
        self.findIndex(
          (u) => u.domain === user.domain && u.available === user.available,
        ) === index
      );
    });
    console.log('Unique' + uniqueUsers);

    const teamMembers = uniqueUsers.map((user) => ({
      user: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      domain: user.domain,
      available: user.available,
      gender: user.gender,
    }));
    console.log('team' + teamMembers);

    const newTeam = new Team({ team: teamMembers });
    console.log('NewTeam' + newTeam);
    await newTeam.save();

    return res
      .status(201)
      .json({ message: 'Team created successfully', team: newTeam });
  } catch (err) {
    return res
      .status(500)
      .json({ error: 'Could not create team', details: err.message });
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

// Get Single team

export const getOneTeam = async (req, res) => {
  const { id } = req.params;
  try {
    const teamWithUsers = await Team.findById(id).populate('team.user');

    if (!teamWithUsers) {
      return res
        .status(404)
        .json({ message: 'Team not found', success: false });
    }

    const formattedTeam = {
      _id: teamWithUsers._id,
      team: teamWithUsers.team
        .filter((member) => member.user)
        .map((member) => ({
          _id: member.user._id,
          firstname: member.user.first_name,
          lastname: member.user.last_name,
          email: member.user.email,
          domain: member.user.domain,
          available: member.user.available,
          gender: member.user.gender,
        })),
    };

    res.status(200).json({
      message: 'Team fetched successfully!',
      team: formattedTeam,
      success: true,
    });
  } catch (err) {
    res.status(500).json({ message: err.message, success: false });
  }
};
