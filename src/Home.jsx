import React, { useContext } from 'react'
import { UserContext } from './context/Context'

const Home = () => {
    const fruits = useContext(UserContext)
  return (
    <>

    <h2>Fruits Profile</h2>
    <p><strong>Name:</strong> {fruits.apple}</p>
    
    
    
    </>
  )
}

export default Home