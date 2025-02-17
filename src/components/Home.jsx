import React from 'react'
import './Home.css'
import Signup from './Signup'
import Signin from './Signin'
import Navbar from './Navbar'


const Home = () => {
    return (
        <>
            <div className="container">
                <Navbar />
                <Signup/>
                <Signin/>
               
            </div>
        </>
    )
}

export default Home