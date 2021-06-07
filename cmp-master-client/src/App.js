import React,{Component} from 'react'
import Layout from './hoc/Layout/Layout'
import {BrowserRouter,Route} from 'react-router-dom'
import { Switch } from 'react-router-dom/cjs/react-router-dom.min'
import CompanyMasterTable from './components/companymastertable/CompanyMasterTable'
import CompanyMasterForm from './containers/companymasterform/CompanyMasterForm'
import Auth from './containers/Auth/Auth'
import Dashboard from './components/dashboard/Dashboard'
import AuthContext from './context/auth-context';
import LogoutComponent from './containers/Auth/LogoutComponent';
import WelcomeComponent from './components/welcomecomponent/WelcomeComponent'

class App extends Component {

  state={
    isAuthenticated:false,
    currentUser:null,
    
  }


   loginHandler =(curuser)=>{
    this.setState({isAuthenticated:true,currentUser:curuser})
  }

   logoutHandler =()=>{
    this.setState({isAuthenticated:false,currentUser:null})
  }


  render(){
    
    let authobj={isAuthenticated:this.state.isAuthenticated,
      currentUser:this.state.currentUser,
      login:(curuser)=>this.loginHandler(curuser),
      logout:()=>this.logoutHandler()}
    
  
  
    return (
    <div>
      <AuthContext.Provider 
      value = {authobj}
      >
      <BrowserRouter>
      <Layout>
        <Switch>
        {this.state.isAuthenticated ? <Route path='/cmpmaster' component={CompanyMasterTable}></Route> : null }
        {this.state.isAuthenticated ? <Route path='/crud' component={CompanyMasterForm} ></Route> : null }
        <Route path='/auth' component={Auth} ></Route>
        {this.state.isAuthenticated ? <Route path='/dashboard' component={Dashboard} ></Route> : null }
        <Route path='/logout' component={LogoutComponent} ></Route>
        {!this.state.isAuthenticated ? <Route path='/' exact component={WelcomeComponent} ></Route> : null }
          
       </Switch>
      </Layout>
      </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}
}
export default App;
