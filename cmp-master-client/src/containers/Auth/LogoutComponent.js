import React, {  useEffect,useContext } from 'react'
import Button from '../../UI/Button/Button'
import AuthContext from '../../context/auth-context'

 const LogoutComponent =(props)=> {

    const authContext = useContext(AuthContext);    //Getting context Using Hooks
    
    useEffect(()=>{
        authContext.logout();
    },[]);

     const goToLoginPage =(context)=>{
        props.history.push('auth');
    }
        return (
                <div style={{textAlign:'center',margin:'90px auto'}}>
                <h1>You are logged out</h1>
                <div className="container">
                    Thank You for Using Our Application.
                    <br/>Click To Login Again...
                    <Button btnType="Success" clicked={()=>goToLoginPage()} disabled={false}>Login</Button>
                 </div>
                 </div>
            
        )
    }


export default LogoutComponent