import React from 'react'


export const AuthContext = React.createContext({
    isAuthenticated:false,
    currentUser:null,
    login:()=>{},
    logout:()=>{}
});


 


export default  AuthContext;