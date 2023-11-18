import React from 'react'
import Form from '../components/Form'
import Cards from '../components/Cards'

const Home = () => {
  return (
    <div>
      <h1 className='text-3xl  md:text-4xl mt-10 lg:text-5xl bg-gradient-to-r from-red-600 via-purple-600 to-teal-700 bg-clip-text text-transparent text-center'>User Management System</h1>
      <Form />
      <Cards />
      </div>
  )
}

export default Home