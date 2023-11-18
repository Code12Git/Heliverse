import React, { useState } from 'react';
import {useDispatch,useSelector} from 'react-redux'
import toast from 'react-hot-toast';
import {fetchAllUsers} from '../redux/userRedux'
import axios from '../helpers/axios'
const Form = () => {
  const dispatch=useDispatch()

  const [formData, setFormData] = useState({
   first_name: '',
    last_name: '',

    domain: '',
    available: '',
    gender: '', 
  });

   

    const [errors, setErrors] = useState();

const handleRadioChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => {
    const updatedFormData = { ...prev, [name]: value };
    return updatedFormData; 
  });
};

const handleSelectChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => {
    const updatedFormData = { ...prev, [name]: value };
    return updatedFormData; 
  });
};

const handleChange = (e) => {
  const {name,value}=e.target
   setFormData((prev) => {
    const updatedFormData = { ...prev, [name]: value };
    return updatedFormData; 
  });
};

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('/users', formData);
    const res = response.data;
    console.log(res)

    if (res.success === true) {
               toast.success('User successfully created !')
                        setFormData({  first_name: '',
    last_name: '',

    domain: '',
    available: '',
    gender: '',  });

      dispatch(fetchAllUsers());
    }
  }catch (err) {
     const inputerror = err.response.data.errors;
      setErrors(inputerror);
    }
};




  return (
  <div className="container shadow-xs  mx-auto py-12">
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-8 rounded-lg shadow-xl">
          <h2 className="text-4xl font-extrabold text-white mb-4">
            Create User
          </h2>
          <div className="mb-3">
            <input
              type="text"
              placeholder="First Name"
              name="first_name"
              value={formData.first_name}
                onChange={handleChange}
              className="bg-white border font-roboto border-gray-300 rounded-md py-3 px-4 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-700"
            />
              {errors &&
  errors?.map((error, index) => {
    if (error.field === 'first_name') {
      return (
        <span key={index} className="text-red-500 text-sm">
          {error.message}
        </span>
      );
    }
    return null;
  })}
           
          </div>
          <div className="mb-6">
            <input
              placeholder="Last Name"
              type="text"
              name="last_name"
                onChange={handleChange}
                value={formData.last_name}
              className="bg-white border border-gray-300 rounded-md py-3 px-4 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-700 resize-none"
              rows="4"
            />
         
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
         <div className="mb-6">
            <input
              placeholder="Email"
              type="text"
                              onChange={handleChange}
                value={formData.email}

              name="email"
          
              className="bg-white border border-gray-300 rounded-md py-3 px-4 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-700 resize-none"
              rows="4"
            />
         
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
       <div className='mb-6 flex flex-col gap-5'>
  <label className="text-lg font-medium leading-6 text-gray-900">Gender</label>
  <div className="flex items-center gap-5">
    <div>
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                checked={formData.gender === 'male'}
                onChange={handleRadioChange}
                className="radio radio-primary"
              />
              <label htmlFor="male" className="ml-2 text-lg text-gray-900">
                Male
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                checked={formData.gender === 'female'}
                onChange={handleRadioChange}
                className="radio radio-primary"
              />
              <label htmlFor="female" className="ml-2 text-lg text-gray-900">
                Female
              </label>
            </div>
   
  </div>
   <div className='flex flex-col gap-2'>
     
      <label  className="text-lg font-medium leading-6 text-gray-900">
        Domain
      </label>
      <input           value={formData.domain} name='domain'      onChange={handleChange}
               className="bg-white border border-gray-300 rounded-md py-3 px-4 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-700 resize-none"
 type='text' placeholder='Domain' />
    </div>
   <div className='flex flex-col gap-2'>
  <label  className="text-lg font-medium leading-6 text-gray-900">
    Available
  </label>
   <div className="form-control w-full max-w-xs">
   <select
  onChange={handleSelectChange} 
  className="select select-bordered p-1 rounded-md"
  value={formData.available}
  name='available'
>
  <option disabled value=''>Pick one</option> 
  <option value='true'>True</option>
  <option value='false'>False</option>
</select>

  </div>
</div>
</div>


          <button
            onClick={handleSubmit}
            className="bg-indigo-700 text-white py-3 px-6 rounded-md hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transform hover:scale-105 transition-transform"
          >
            Create User
          </button>
        </div>
      </div>
  );
};

export default Form;
