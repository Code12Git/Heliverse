import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import axios from '../../helpers/axios'
import { fetchAllUsers } from '../../redux/userRedux';
import {useDispatch} from 'react-redux'
import toast from 'react-hot-toast';

export default function UpdateModal({user}) {
    const dispatch=useDispatch()

  const [formData, setFormData] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
     available: user.available, 
    domain: user.domain,
        gender: user.gender,

  });

      const [errors, setErrors] = useState();

  let [isOpen, setIsOpen] = useState(false)



  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }
  
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
};




const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.put(`/users/${user._id}`, formData);
    const res = response.data;
    console.log(res);

    if (res.success === true) {
      toast.success('User updated successfully!');
      dispatch(fetchAllUsers());
    }
  } catch (err) {
    const inputError = err.response.data.errors;
   
    setErrors(inputError);
  }
};
  



  return (
    <>
      <div >
        <button
          type="button"
          onClick={openModal}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-110"
        >
          Update
        </button>
      </div>

      <Transition  show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
               <Dialog.Panel className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 text-left align-middle transition-all">
  <Dialog.Title as="h3" className="text-2xl font-bold text-gray-800 mb-4">
    Update User
  </Dialog.Title>
  <div className="flex flex-col gap-4">
    <div className="mt-2">
      <input type="text" placeholder="First Name"   value={formData.first_name}
                 
                name="first_name" onChange={handleChange}  className="input-style border-slate-700 border rounded-lg p-1 w-72 indent-1" />
        
    </div>
      {errors &&
  errors.map((error, index) => {
    if (error.field === 'first_name') {
      return (
        <span key={index} className="text-red-500 text-sm">
          {error.message}
        </span>
      );
    }
    return null;
  })}

    <div className="mt-2">
      <input type="text" placeholder="Last Name" value={formData.last_name} name='last_name' onChange={handleChange}  className="input-style border-slate-700 border rounded-lg p-1 w-72 indent-1" />
    </div>
     {errors &&
  errors.map((error, index) => {
    if (error.field === 'last_name') {
      return (
        <span key={index} className="text-red-500 text-sm">
          {error.message}
        </span>
      );
    }
    return null;
  })}
    <div className="mt-2">
      <input type="text" placeholder="Email" value={formData.email} name='email' onChange={handleChange}  className="input-style border-slate-700 border rounded-lg p-1 w-72 indent-1" />
    </div>
      {errors &&
  errors.map((error, index) => {
    if (error.field === 'email') {
      return (
        <span key={index} className="text-red-500 text-sm">
          {error.message}
        </span>
      );
    }
    return null;
  })}
    <div className="mt-2">
      <input type="text" placeholder="Domain" value={formData.domain} name='domain' onChange={handleChange}  className="input-style border-slate-700 border rounded-lg p-1 w-72 indent-1" />
    </div>
    <div className="mt-2">
      <label className="text-gray-800 mb-2">Gender</label>
      <div className="flex items-center gap-4">
        <input  type="radio" value="male"
                checked={formData.gender === 'male'}  name="gender"
                 onChange={handleChange}  className="radio-input" />
        <label htmlFor="radio1" className="text-gray-800">
          Male
        </label>
        <input type="radio"  name="gender"
                value="female"
                checked={formData.gender === 'female'} onChange={handleChange}  className="radio-input" />
        <label htmlFor="radio2" className="text-gray-800">
          Female
        </label>
      </div>
    </div>
    <div className="mt-2">
      <div className="mt-2">
                    <label className="text-gray-800 mb-2 p-1">Availability</label>
                    <select
                      value={formData.available}
                      name="available"
                      onChange={handleChange}
                      className="select-input w-32 p-1 rounded bg-gray-400 text-white"
                    >
                      <option value="true">True</option>
                      <option value="false">False</option>
                    </select>
                  </div>
    </div>
  </div>

  <div className="mt-6 flex justify-end">
    <button
      type="button"
      onClick={handleSubmit}
      className="btn-blue rounded-lg bg-blue-400 inline-flex items-center px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      
    >
      Update User
    </button>
  </div>
</Dialog.Panel>

              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
