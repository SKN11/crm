import React,{Component} from 'react'
import Button from '../../UI/Button/Button'
import classes from './CompanyMasterForm.module.css'
import Spinner from '../../UI/Spinner/Spinner'
import {withRouter} from 'react-router-dom'
import axios from 'axios';
import Input from '../../UI/Input/Input'
import AuthContext from '../../context/auth-context';
import Modal from '../../UI/Modal/Modal'



const API_URL = 'http://localhost:8080/api'



class CompanyMasterForm extends Component {
    state = {
        orderForm: {
            cmpCodeHRIS: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Company Code HRIS'
                },
                value: this.props.history.location.state.data.length!==0 ? this.props.history.location.state.data[0].cmpCodeHRIS : '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            cmpName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Company Name'
                },
                value: this.props.history.location.state.data.length!==0 ? this.props.history.location.state.data[0].cmpName : '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            cmpAbbrName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Company Name Abbreviation'
                },
                value: this.props.history.location.state.data.length!==0 ? this.props.history.location.state.data[0].cmpAbbrName : '',
                validation: {
                    required: true,
                    minLength: 2,
                    maxLength: 10,
                    
                },
                valid: false,
                touched: false
            },
            cmpregNo: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Company Registration No.'
                },
                value: this.props.history.location.state.data.length!==0 ? this.props.history.location.state.data[0].cmpregNo : '',
                validation: {
                    required: true,
                    isNumeric: true
                    
                },
                valid: false,
                touched: false
            },
            cmplogo: {
                elementType: 'uploadimg',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Company logo'
                },
                value: this.props.history.location.state.data.length!==0 ? this.props.history.location.state.data[0].cmplogo : '',
                validation: {
                    required: false
                },
                valid: false,
                touched: false
            },
            cmpActiveDate: {
                elementType: 'date',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Company Active Date'
                },
                value: new Date(),
                validation: {
                    required: false,
                  
                },
                valid: true,
                touched: false
            }           
        },
        
        formIsValid: false,
        loading: false,
        error:false,
        showConfirmModal:false,


    }

     onDateChange = () =>{

    }

    addMaster =(context)=>{

        this.setState( { loading: true } );
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }

        let d = new Date();
        
        let formDataCreation ={};
        if(this.props.history.location.state.btnName === 'ADD')
        {
            formDataCreation = {...formData,
            cmpIsActive:true,
            cmpCreatedOn:d,
            cmpCreatedBy:context.currentUser
            }
            
        }else{
            formDataCreation = {...this.props.history.location.state.data[0],
                cmpLastModifiedOn:d,
                cmpLastModifiedBy:context.currentUser,
                ...formData
            }
        }

        axios.post( `${API_URL}/cmpmasters`,formDataCreation)
        .then( response => {
                this.setState( { loading: false } );
                this.props.history.push( '/cmpmaster' );
            } )
            .catch( error => {
                console.log("error occurred");
                this.setState( { loading: false,error:true } );

            } );
    }

    
    addMasterDateHandler(context) {return ( event ) => {
         event.preventDefault();
         this.addMaster(context);
    }
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

        
        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        //console.log("inputchangeHnalder");
        //console.log(event);
        //console.log(inputIdentifier);
        //console.log(this.state);
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = { 
            ...updatedOrderForm[inputIdentifier]
        };
        if(inputIdentifier === 'cmpActiveDate' || inputIdentifier === 'cmpCreatedOn' ||inputIdentifier === 'cmpLastModifiedOn' || inputIdentifier === 'cmpDeactivatedOn' || inputIdentifier === 'cmpReactivatedOn')
        updatedFormElement.value = event;
        else if(inputIdentifier === "cmplogo")
        updatedFormElement.value = "assets/Images/"+event[0].name;
        else
        updatedFormElement.value = event.target.value;
        
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
        //console.log(this.state);
    }

    modalClosedHandler = ()=>{
        this.setState( { error:false } );
        
    }

     

    render () {

        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let buttonToShow = null
        if(this.props.history.location.state.btnName === 'ADD'){
           buttonToShow= <Button btnType="Success" disabled={!this.state.formIsValid}>{this.props.history.location.state.btnName}</Button>
            }
            else{
             buttonToShow=   <Button btnType="Success" disabled={false}>{this.props.history.location.state.btnName}</Button>
            }

        let form = (
            <AuthContext.Consumer>
            {
                (context)=>{
            return(<form onSubmit={this.addMasterDateHandler(context)}>
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                {buttonToShow}
                
            </form>)
                }
            }</AuthContext.Consumer>
        );
        if ( this.state.loading ) {
            form = <Spinner />;
        }
        return (
            <React.Fragment>
        
                <Modal show={this.state.error} modalClosed = {this.modalClosedHandler}>
                    {'Error Occurred While Creating Master Data.......'}
                </Modal>
                
            <div className={classes.ContactData}>
                <h4>Enter Company Master Data</h4>
                {form}
            </div>
            </React.Fragment>
        );
    }
}


export default withRouter(CompanyMasterForm);