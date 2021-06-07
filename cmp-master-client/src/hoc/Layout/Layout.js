import React, { Component } from 'react';
import classes from './layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';


class Layout extends Component {
    state={

        showSideDrawer:false
    }

    backdropCloseHandler = () => {
        this.setState({
            showSideDrawer:false
        });
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer:!prevState.showSideDrawer};
        });
    }

    render(){
    return(
        <React.Fragment>
        <div>
            <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
        </div>
        <main className={classes.Content}>
            {this.props.children}
        </main>
        </React.Fragment>
    );

}

}
export default Layout;