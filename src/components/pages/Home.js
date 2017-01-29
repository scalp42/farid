import React from 'react'
import Header from '../Header'

const Home = ({ children }) => {
  return (
    <div className="container">
      <Header />
      Home
      {children}
    </div>
  )
}

export default Home
