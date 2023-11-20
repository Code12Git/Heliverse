import React, { useEffect, useState } from 'react';
import Card from './Card';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers, filterUsers } from '../redux/userRedux';
import toast from 'react-hot-toast';
import { createTeam } from '../redux/teamSlice';
import FilterModal from './common/FilterModal';
import Searching from './Searching';

const Cards = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.user.users.users);
    const [selectedUsers, setSelectedUsers] = useState([]);

  const [filteredUserList, setFilteredUserList] = useState([]);

  useEffect(() => {
    dispatch(fetchAllUsers(page));
  }, [dispatch, page]);

  useEffect(() => {
    setFilteredUserList(userList);
  }, [userList]);

  const applyFilter = (filters) => {
    dispatch(filterUsers({ page: 1, filters }));
  };
const applySearching = (filters) => {
  dispatch(filterUsers({ page: 1, filters }));
};



  const handleAddToTeam = () => {
    if (selectedUsers.length > 0) {
      dispatch(createTeam({ selectedUserIds: selectedUsers }));
      toast.success('Users added to the team');
      setSelectedUsers([]);
    } else {
      toast.error('Please select users to add to the team');
    }
  };
   const handleCheckboxChange = (userId, checked) => {
    setSelectedUsers((prevSelectedUsers) => {
      if (checked && !prevSelectedUsers.includes(userId)) {
        return [...prevSelectedUsers, userId];
      } else {
        return prevSelectedUsers.filter((id) => id !== userId);
      }
    });
  };

  useEffect(() => {
    setFilteredUserList(userList);
  }, [userList]);

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    } else {
      toast.error('No page to show');
    }
  }

  return (
    <>
    <div className='flex items-center justify-around'>
      <FilterModal applyFilter={applyFilter} />
<Searching applySearching={applySearching} />
<button  className='p-2 bg-cyan-400 rounded-lg text-white' onClick={handleAddToTeam}>
        Add Selected Users to Team
      </button>
</div>
      <div className="m-4 md:m-8 lg:m-16 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredUserList && filteredUserList?.length > 0 ? (
          filteredUserList.map((user) => <Card key={user._id} user={user} onCheckboxChange={handleCheckboxChange} />)
        ) : (
          <p>No users found</p>
        )}
      </div>
       
      <div className="flex p-10 justify-between mb-4">
        <button
          onClick={handlePrevPage}
         className="bg-slate-800 text-white p-2 px-4 text-lg rounded-lg transition-transform hover:scale-110 duration-200 delay-200 ease-in-out"
        >
          Prev
        </button>
        <button
          onClick={handleNextPage}
          className="bg-blue-800 text-white p-2 px-4 text-lg rounded-lg transition-transform hover:scale-110 duration-200 delay-200 ease-in-out"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Cards;
