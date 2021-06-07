import React from 'react'
import classes from './Logo.module.css'
import masterLogo from '../../assets/Images/master-logo.png'

const Logo  = (props) => (

        <div className={classes.Logo}>
            <img src={masterLogo} alt ="Master"/>
        </div>
    
);


export default Logo;