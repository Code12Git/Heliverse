import React, { useEffect, useState } from 'react';
import Card from './Card';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers } from '../redux/userRedux';
import toast from 'react-hot-toast';

const Cards = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.user.users.users);
  console.log(userList);

  useEffect(() => {
   dispatch(fetchAllUsers(page));
  }, [dispatch, page]);

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
      <div className="m-4 md:m-8 lg:m-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
     {userList && userList?.length > 0 ? (
  userList.map((user) => {
    console.log(user);
    return  <Card key={user._id} user={user} />;
  })
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
