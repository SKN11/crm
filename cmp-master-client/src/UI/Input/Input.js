import React from 'react';
//import classes from './Input.module.css';
import classes from '../../global/Global.module.css'
import DateTimePicker from "react-datetime-picker";
import ImageUploader from 'react-images-upload';
import "react-datepicker/dist/react-datepicker.css";


const Input = ( props ) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    switch ( props.elementType ) {
        case ( 'input' ):
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ( 'textarea' ):
            inputElement = <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ( 'select' ):
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        case ('date'):
            inputElement = (<DateTimePicker
                className={inputClasses.join(' ')+' datePicker'}
                value={props.value}
                onChange={(date) => props.changed(date)} />);

            break;
        case ('uploadimg'):
            inputElement = (<ImageUploader
                withIcon={true}
                buttonText='Choose images'
                onChange={props.changed}
                imgExtension={['.jpg', '.png', '.jpeg']}
                maxFileSize={10485760}
            />);
break;
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );

};
export default Input;