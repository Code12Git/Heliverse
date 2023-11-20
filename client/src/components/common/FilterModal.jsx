import { Dialog, Transition } from '@headlessui/react';
import { Fragment,useState } from 'react';
import {useDispatch} from 'react-redux'
import { filterUsers } from '../../redux/userRedux';
export default function FilterModal({applyFilter}) {
  const [isOpen, setIsOpen] = useState(false);
   const [filtering, setFiltering] = useState({
    domain: '',
    gender: '',
    available: '',
  });
    const dispatch = useDispatch();

 
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleChange=(e)=>{
        const{name,value} = e.target;
        setFiltering((prev)=>({...prev,[name]:value}))
    }

    const handleSubmit=()=>{        
    dispatch(filterUsers({ page: 1, filters: filtering }));
    closeModal();
  };

    


  return (
    <>
     <div >
        <button
          type="button"
          onClick={openModal}
          className=" bg-gradient-to-r from-purple-400 via-cyan-400 to-violet-400 m-12 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-110"
        >
         Filter
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
    Filtering
  </Dialog.Title>
  <div className="flex flex-col gap-4">
   
     
   
    <div className="mt-2">
      <input type="text" onChange={handleChange} placeholder="Domain"  name='domain' className="input-style border-slate-700 border rounded-lg p-1 w-72 indent-1" />
    </div>
    <div className="mt-2">
      <label className="text-gray-800 mb-2">Gender</label>
      <div className="flex items-center gap-4">
        <input  type="radio" value="male" onChange={handleChange} 
                 name="gender"
                  className="radio-input" />
        <label htmlFor="radio1" className="text-gray-800">
          Male
        </label>
        <input type="radio"  name="gender"
                value="female" onChange={handleChange} 
              className="radio-input" />
        <label htmlFor="radio2" className="text-gray-800">
          Female
        </label>
      </div>
    </div>
    <div className="mt-2">
      <div className="mt-2">
                    <label className="text-gray-800 mb-2 p-1">Availability</label>
                    <select
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
      onSubmit={handleSubmit}
      className="btn-blue rounded-lg bg-red-400 inline-flex items-center px-4 py-2 text-sm font-medium text-white hover:bg-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      
    >
     Filter
    </button>
  </div>
</Dialog.Panel>

              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
