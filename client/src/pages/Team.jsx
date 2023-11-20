import React, { useEffect, useState } from 'react';
import axios from '../helpers/axios';

const Team = () => {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await axios.get('/teams');
        setTeam(res.data.team);
      } catch (error) {
        console.error('Error fetching team:', error);
      }
    };

    fetchTeam();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Team</h1>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8">
        {team.map((member) => (
          <div className="bg-white rounded-lg shadow-lg p-6 w-full" key={member._id}>
            <h2 className="text-lg font-semibold mb-2">Team {member._id}</h2>
            <div className="grid gap-4 overflow-auto max-h-96">
              {member.team.map((mem) => (
                <div className="border border-gray-200 rounded-md p-4" key={mem._id}>
                  <p className="text-xl font-semibold truncate">
                    {mem.firstname} {mem.lastname}
                  </p>
                  <p className="text-sm text-gray-500 mb-2 truncate">{mem.email}</p>
                  <div className="flex justify-between">
                    <p className="text-sm truncate">Domain: {mem.domain}</p>
                  </div>
                  <p className="text-sm truncate">Gender: {mem.gender}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
