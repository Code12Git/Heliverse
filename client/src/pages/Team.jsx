import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTeam } from '../redux/teamSlice';

const Team = () => {
  const dispatch = useDispatch();
  const team = useSelector((state) => state.team.teams);

  useEffect(() => {
    dispatch(getTeam());
  }, [dispatch]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Team</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {team.map((member) => (
          <div className="bg-white rounded-lg shadow-lg p-6" key={member.id}>
            <h2 className="text-lg font-semibold mb-2">Team {member.id}</h2>
            <div className="grid gap-4">
             {member.userId.team.map((mem) => {
  console.log(mem.available);
  return (
    <div
      className="border border-gray-200 rounded-md p-4"
      key={mem._id}
    >
      <p className="text-xl font-semibold">{mem.firstname}{" "}{mem.lastname}</p>
      <p className="text-sm text-gray-500 mb-2">{mem.email}</p>
      <div className="flex justify-between">
        <p className="text-sm">Domain: {mem.domain}</p>
        <p className="text-sm">Available: {mem.available}</p>
      </div>
      <p className="text-sm">Gender: {mem.gender}</p>
    </div>
  );
})}

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
