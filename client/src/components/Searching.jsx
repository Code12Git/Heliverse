import React, { useEffect, useState } from 'react';

const Searching = ({ applySearching }) => {
  const [input, setInput] = useState('');

    useEffect(()=>{
        applySearching({ first_name: input })
    },[input])

  const changeHandler = (e) => {
    setInput(e.target.value);
  };

 
  

  return (
    <div className="form-control">
      <input
        type="text"
        value={input}
        onChange={changeHandler}
       
        placeholder="Write name..."
        className="input input-bordered w-24 md:w-auto"
      />
    </div>
  );
};

export default Searching;
