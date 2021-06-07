import React from 'react'
import classes from './Logo.module.css'
import userLogo from '../../assets/Images/cmpmasteruser.jpeg'

const UserLogo  = (props) => (

        <div className={classes.UserLogo}>
            <img src={userLogo} alt ="Company Master User"/>
        </div>
    
);


export default UserLogo;