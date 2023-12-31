import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchAllUsers } from '../redux/userRedux';
import UpdateModal from './common/UpdateModal';
import { deleteUser } from '../redux/userRedux';
import UserDetailsModal from './common/UserDetailsModal';



const Card = ({ user, onCheckboxChange  }) => {
  const dispatch = useDispatch();



const handleDeleteUser = async (id) => {
  try {
    await dispatch(deleteUser(id));
    dispatch(fetchAllUsers()); 
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};


  const handleCheckbox = (event) => {
    const { checked } = event.target;
    onCheckboxChange(user._id, checked);
  };





  

 


 

  return (
    <div className="max-w-full rounded-md cursor-pointer overflow-hidden shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
      <div className="relative">
        <img className="w-12" src={user.avatar || 'Simple'} alt="User Avatar" />
        <div className="absolute inset-0 bg-gradient-to-b from-purple-600 to-transparent opacity-70"></div>
      </div>
      <div className='flex justify-between'>
      <div className="px-6 py-4 relative">
        <div className="font-bold text-xl mb-2 text-purple-600">{`${user.first_name} ${user.last_name}`}</div>
        <p className="text-green-600 text-base mb-2">{`Email: ${user.email}`}</p>
        <p className="text-cyan-600 text-base mb-2">{`Gender: ${user.gender}`}</p>
        <p className="text-blue-600 text-base mb-2">{`Domain: ${user.domain}`}</p>
        <p className="text-violet-600 text-base mb-2">{`Available: ${user.available}`}</p>
      </div>
       <div className="flex flex-col gap-2  items-center m-6">
           <input
      type="checkbox"
      className="checkbox"
      onChange={handleCheckbox}
      value={user._id}
    />
          <button
          onClick={()=>handleDeleteUser(user._id)}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-110"
        >
        Delete
        </button>
        </div>
      </div>
      <div className="px-6 py-4 flex justify-between">
      
       <button>         
        <UserDetailsModal id={user._id} />
         </button> 
        <button>
         <UpdateModal user={user} />
        </button>
      </div>
    </div> 
  );
};

export default Card;
