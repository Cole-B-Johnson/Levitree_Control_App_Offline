import React from 'react'
import './HomePage.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet } from 'react-router-dom';
import NavBarComponent from '../../components/NavbarComponent/NavbarComponent';


const HomePage = () => {
    return (
        <div className='homepage_container'>
            {<NavBarComponent/>}
            {/* Outlet is the output of all the children as per the routes */}
            <Outlet/>
        </div>
    )
}

export default HomePage