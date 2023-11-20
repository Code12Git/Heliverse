import React, { useEffect, useState } from 'react';
import Card from './Card';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers, filterUsers } from '../redux/userRedux'; // Import the filterUsers action
import toast from 'react-hot-toast';
import FilterModal from './common/FilterModal';
const Cards = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.user.users.users);
  const [filteredUserList, setFilteredUserList] = useState([]);

  useEffect(() => {
    dispatch(fetchAllUsers(page));
  }, [dispatch, page]);

  useEffect(() => {
    // Update filteredUserList when userList changes
    setFilteredUserList(userList);
  }, [userList]);

  const applyFilter = (filters) => {
    dispatch(filterUsers({ page: 1, filters }));
    // Since filterUsers is an async action, the filtered list will be updated in the Redux store
    // No need to manually set filteredUserList here
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    } else {
      toast.error('No page to show');
    }
  };

  return (
    <>
      <FilterModal applyFilter={applyFilter} /> 

      <div className="m-4 md:m-8 lg:m-16 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
       
        {filteredUserList && filteredUserList?.length > 0 ? (
          filteredUserList.map((user) => (
            <Card key={user._id} user={user} />
          ))
        ) : (
          <p>No users found</p>
        )}
      </div>
      <div className='flex p-10 justify-between mb-4'>
        <button onClick={handlePrevPage} className="bg-slate-800 text-white p-2 px-4 text-lg rounded-lg transition-transform hover:scale-110 duration-200 delay-200 ease-in-out">
          Prev
        </button>
        <button onClick={handleNextPage} className="bg-blue-800 text-white p-2 px-4 text-lg rounded-lg transition-transform hover:scale-110 duration-200 delay-200 ease-in-out">
          Next
        </button>
      </div>
    </>
  );
};

export default Cards;
