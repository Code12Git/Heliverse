import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import axios from '../../helpers/axios'; 

export default function UserDetailsModal({ id }) {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/users/${id}`); 
        setUserData(response.data.user);
        
      } catch (error) {
        console.error(error);
        throw error;
      }
    };


    fetchData();
  }, [id]);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div>
        <button
          type="button"
          onClick={openModal}
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-110"
        >
          Details
        </button>
      </div>

      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={closeModal}>
          <div className="flex items-center justify-center min-h-full">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black/25" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="w-full max-w-md p-6 my-10 text-left align-middle transition-all transform bg-white rounded-2xl shadow-xl">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  Id: {userData && userData._id}
                </Dialog.Title>
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  Name: {userData && userData.first_name}
                </Dialog.Title>
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  Domain: {userData && userData.domain}
                </Dialog.Title>
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                 Available: {userData && userData.available}
                </Dialog.Title>
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                Gender: {userData && userData.gender}
                </Dialog.Title>
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                Email: {userData && userData.email}
                </Dialog.Title>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={closeModal}
                  >
                    Got it, thanks!
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
