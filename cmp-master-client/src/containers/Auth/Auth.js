import React, { Component } from 'react';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import classes from './Auth.module.css';
import AuthContext from '../../context/auth-context';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api'

class Auth extends Component {

   

    state = {
        formIsValid:false,
        hasLoginFailed: false,
        showSuccessMessage: false,
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Username',
                    name:'username'
                    
                },
                value: '',
                
                validation: {
                    required: true,
                    minLength: 4
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password',
                    name:'password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 4
                },
                valid: false,
                touched: false
            }
        }
    }
    

    executeBasicAuthenticationService(username, password) {
        return axios.get(`${API_URL}/basicauth`,
            { headers: { authorization: this.createBasicAuthToken(username, password) } })
    }

    createBasicAuthToken(username, password) {
        return 'Basic ' + window.btoa(username + ":" + password)   //btoa encodes the string 
    }

    registerSuccessfulLogin(username, password) {
        this.setupAxiosInterceptors(this.createBasicAuthToken(username, password))
    }

    setupAxiosInterceptors(token) {
        axios.interceptors.request.use(
            (config) => {
                    config.headers.authorization = token
                return config
            }
        )
    }

    

    handleChange(event) {
        this.setState(
            {
                [event.target.name]
                    : event.target.value
            }
        )
    }

    loginClicked(context) {
            this.executeBasicAuthenticationService(this.state.controls.email.value, this.state.controls.password.value)
            .then(() => {
                this.registerSuccessfulLogin(this.state.controls.email.value, this.state.controls.password.value)
                context.login(this.state.controls.email.value);
                
                this.props.history.push('/cmpmaster');
            }).catch(() => {
                this.setState({ showSuccessMessage: false })
                this.setState({ hasLoginFailed: true })
            })
    }


    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

       
        return isValid;
    }

    inputChangedHandler = (event, controlName) => {
        this.handleChange(event);
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };

        let formIsValid = true;
        for (let inputIdentifier in updatedControls) {
            formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
        }
        
        this.setState({controls: updatedControls,formIsValid:formIsValid});
    }


    handleSubmit (context) {
        return event => {
          event.preventDefault();
          this.loginClicked(context);
        }
      }

    render () {
        const formElementsArray = [];
        for ( let key in this.state.controls ) {
            formElementsArray.push( {
                id: key,
                config: this.state.controls[key]
            } );
        }

        const form = formElementsArray.map( formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={( event ) => this.inputChangedHandler( event, formElement.id )} />
        ) );

        return (
            <div>
                <h3 className={classes.loginheading}>Enter Username Password to Login</h3>

            <div className={classes.Auth}>
                {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                {this.state.showSuccessMessage && <div>Login Sucessful</div>}
                    
                <AuthContext.Consumer>
                {
                    (context)=>{
                        return (
                            <form onSubmit={this.handleSubmit(context)}>
                                {form}
                                <Button btnType="Success" disabled={!this.state.formIsValid}>Login</Button>
                            </form>
                                )
                                                
                    }
                }
                </AuthContext.Consumer>
            </div>

            </div>
        );
    }
}




export default Auth;