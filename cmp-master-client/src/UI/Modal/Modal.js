import React,{Component} from 'react'
import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.module.css';
import Button from '../Button/Button'


class Modal  extends Component{

    shouldComponentUpdate(nextProps,nextState){
        return nextProps.show !== this.props.show || nextProps.children !==this.props.children
    }


    render(){
    return(
        <React.Fragment>
            <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
            <div className={classes.Modal}
            style={{
                transform : this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity : this.props.show ? 1 : 0
            }}>
                {this.props.children}
                <br/>
                <Button btnType="Success" clicked={this.props.modalClosed} disabled={false}>Close</Button>
            </div>
        </React.Fragment>
    );
}

}
export default Modal;