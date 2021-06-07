import React from 'react'
//import classes from './Button.module.css'
import classes from '../../global/Global.module.css'


const Button = (props) => (

    <button 
    onClick={props.clicked}
    className={[classes.Button , classes[props.btnType]].join(' ')}
    disabled={props.disabled}

    > {props.children}</button>
);

export default Button;