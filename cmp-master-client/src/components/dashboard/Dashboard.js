import React,{useContext} from 'react'
import UserLogo from '../Logo/UserLogo'
import classes from './Dashboard.module.css';
import AuthContext from '../../context/auth-context';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';



const Dashboard = (props)=>{

    const authContext = useContext(AuthContext);    //Getting context Using Hooks
    

return(
    <div>
    <SideDrawer/>    
    <div className={classes.Dashboard}>
        <h3 style={{float:'right'}}>Welcome Company Master {authContext.currentUser.toUpperCase()}</h3>
        <div className={classes.Logo}>
        <UserLogo/>
        </div>
    </div>
    </div>
)

}




export default Dashboard;