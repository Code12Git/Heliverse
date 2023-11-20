import React,{useState} from 'react'
import FilterModal from '../common/FilterModal'
import axios from '../../helpers/axios'
const Filtering = () => {
   const [filteredUsers, setFilteredUsers] = useState([]);

  const applyFilter = async (filters) => {
 
    console.log('Applying filters:', filters);
    try{
      const res=await axios.get('/users')
      console.log(res)
    }catch(err){}
  };
  return (
    <div>
      <FilterModal applyFilter={applyFilter} />
   </div>
  )
}

export default Filtering