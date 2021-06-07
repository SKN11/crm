import React,{useContext} from 'react'
import classes from './Toolbar.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import AuthContext from '../../../context/auth-context'

const Toolbar  = (props) => 
{
    const authContext = useContext(AuthContext);    //Getting context Using Hooks
    const navElement = {
        Home:{
            link:'cmpmaster',
            show:authContext.isAuthenticated
        },
        Login:{
            link:'auth',
            show:!authContext.isAuthenticated
        },
        Logout:{
            link:'logout',
            show:authContext.isAuthenticated
        }
    };

return (

    <header className={classes.Toolbar}>
        <div className={classes.Logo}>
        <Logo/>
        </div>
        <nav className={classes.DesktopOnly}>
           <NavigationItems element={navElement}/>
        </nav>
    </header>
)
}

export default Toolbar;
