import React from 'react'
import Button from '../../UI/Button/Button'

const WelcomeComponent = (props) =>{

    const gotoLogin = () => {

        props.history.push('/auth');

    }

return(
    <div style={{textAlign:'center',margin:'90px auto'}}>
        <h3>Welcome To Company Master Application.... Click Login To Continue</h3>
            
        <Button btnType="Success"  clicked={gotoLogin} disabled={false}>Login</Button>
    
    </div>
);



}


export default WelcomeComponent;