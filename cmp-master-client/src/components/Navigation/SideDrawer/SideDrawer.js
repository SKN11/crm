
import React from 'react'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.module.css'


const SideDrawer = (props) => {
    
    const navElement = {
        DashBoard:{
            link:'dashboard',
            show:true
        },
        CompanyMaster:{
            link:'cmpmaster',
            show:true
        }
    };


    return(
        <React.Fragment>
        <div className={classes.SideDrawer}>
            <nav>
                <NavigationItems element={navElement} where="SideDrawer"/>
            </nav>
        </div>
        </React.Fragment>
        
    );
}


export default SideDrawer