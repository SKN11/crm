import React, { useState,useEffect,useContext } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import Button from '../../UI/Button/Button';
import {withRouter} from 'react-router-dom'
import ConfirmModal from '../../UI/InfoModal/ConfirmModal'
import axios from 'axios';
import AuthContext from '../../context/auth-context';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
import Modal from '../../UI/Modal/Modal'


import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const CompanyMasterTable = (props) => {
    const [gridApi, setGridApi] = useState(null);
    const [rowData, setRowData] = useState([]);
    const [rowDataOld, setRowDataOld] = useState([]);
    const [selectedRowData, setSelectedRowData] = useState([]);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [btnClicked, setBtnClicked] = useState();
    const [errorOccurred, seterrorOccurred] = useState(false);
    
    const authContext = useContext(AuthContext);    //Getting context Using Hooks
    const API_URL = 'http://localhost:8080/api'
    
    useEffect(() => {
         
        axios.get( `${API_URL}/cmpmasters`)     //
        .then((response) =>  response.data )
         .then(rowData => {
             setRowDataOld(rowData);
            let parsed = parseDates(rowData);
             setRowData(parsed);
            })
     }, []);

    const onGridReady = (params) => {
        setGridApi(params.api);
       
    }

    const parseDates = (rowData)=>{
        
        const parse = ['cmpActiveDate','cmpCreatedOn','cmpDeactivatedOn','cmpLastModifiedOn','cmpReactivatedOn',]

        let rowDataMod = [];
        rowDataMod = rowData.map((data)=>{
                 
            var updatedData={...data};
                 for(let i in data){
                     if(parse.includes(i) && data[i]!==null)
                     {
                       let d = new Date(data[i]);
                        let datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
                        d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2)+ ":" + ("0" + d.getSeconds()).slice(-2);//+" "+(d.getHours() >= 12 ? 'pm' : 'am');
                        updatedData[i] = datestring
                     }
                    };
                 
                 return updatedData;
             });
         return rowDataMod;
    }

    const onSelectionChanged = () => {
        console.log();
        var selectedRows = gridApi.getSelectedRows();
       setSelectedRowData(selectedRows)

    }
    
    

    const openConfirmationBox = (btnName)=>{
        if(selectedRowData.length ===0)
        {
            alert("Please Select Any Row to "+btnName);
            return;
        } 

        
        setShowConfirmModal(true);
        setBtnClicked(btnName);
    }

    const selRowOld = (sel)=>{

        const parse = ['cmpActiveDate','cmpCreatedOn','cmpDeactivatedOn','cmpLastModifiedOn','cmpReactivatedOn'];
        rowDataOld.map((r)=>{
            if(r.cmpCode === sel.cmpCode)
            {
                parse.map((e)=>{
                    sel[e] = r[e];
                });
            }

        });
        return sel;
    }

    const deactivateCompanyMasterHandler = ()=>{
        let formDataCreation={};
        let d = new Date();
        let dt = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
        d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);//+":" + ("0" + d.getHours()).slice(-2);
        const selectedRow = selRowOld({...selectedRowData[0]})
        

        formDataCreation={
            ...selectedRow,
            cmpIsActive:false,
            cmpDeactivatedBy:authContext.currentUser,
            cmpDeactivatedOn:d
        }
        axios.post( `${API_URL}/cmpmasters`,formDataCreation)
        .then( response => {

                let rwdta = [...rowData];
                for(let i=0;i<rwdta.length;i++)
                {
                    if(rwdta[i].cmpCode===formDataCreation.cmpCode)
                    {
                        rwdta[i] = {
                            ...selectedRowData[0],
                            cmpIsActive:false,
                            cmpDeactivatedBy:authContext.currentUser,
                            cmpDeactivatedOn:dt
                        }
                        break;
                    }
                }
                setRowData(rwdta);
                
            
        } )
        .catch( error => {
                seterrorOccurred(true);
        } );


    }

    const reactivateCompanyMasterHandler = ()=>{
        let formDataCreation={};
        let d = new Date();
        let dt = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
        d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);//+":" + ("0" + d.getHours()).slice(-2);
        const selectedRow = selRowOld({...selectedRowData[0]})
        
        formDataCreation={
            ...selectedRow,
            cmpIsActive:true,
            cmpReactivatedBy:authContext.currentUser,
            cmpReactivatedOn:d
        }
        axios.post( `${API_URL}/cmpmasters`,formDataCreation)
        .then( response => {

            let rwdta = [...rowData];
                for(let i=0;i<rwdta.length;i++)
                {
                    if(rwdta[i].cmpCode === formDataCreation.cmpCode)
                    {
                        rwdta[i] = {
                        ...selectedRowData[0],
                        cmpIsActive:true,
                        cmpReactivatedBy:authContext.currentUser,
                        cmpReactivatedOn:dt
                            }
                        break;
                    }
                }
                setRowData(rwdta);
 
               
        } )
        .catch( error => {
                seterrorOccurred(true);
        } );


    }

    const updateCompanyMasterHandler = ()=>{

        if(selectedRowData.length ===0)
        {
            alert("Please Select Any Row to Update");
            return;
        }
        const selectedRow = selRowOld({...selectedRowData[0]})
        
        props.history.push( {
            pathname: '/crud',
            state: { data: [selectedRow],btnName:'UPDATE' }
        } );
        
    }

    const addCompanyMasterHandler = ()=>{
        setShowConfirmModal(false);
        props.history.push( {
            pathname: '/crud',
            state: { data:[] ,btnName:'ADD' }
        } );
        
    }
    const cancelHandler = ()=>{
        setShowConfirmModal(false);
    }

    const confirmHandler = ()=>{
        setShowConfirmModal(false);
        setSelectedRowData([]);

        if(btnClicked === 'Deactivate')
        deactivateCompanyMasterHandler();
        else if(btnClicked === 'Reactivate')
        reactivateCompanyMasterHandler();
        

    }

    
    const modalClosedHandler = ()=>{
        seterrorOccurred(false);

    }

    return (

        <div>
            <Modal show={errorOccurred} modalClosed = {modalClosedHandler}>
                    {'Oops Error Occurred.......'}
            </Modal>
            <SideDrawer/>
            <div style={{float:'right' }}>
            {showConfirmModal &&<ConfirmModal 
            clickConfirm={confirmHandler}
            clickCancel={cancelHandler}
            >{'Please Confirm'}
            </ConfirmModal>}
            &emsp;&emsp;
            
            <Button btnType="Success"  clicked={addCompanyMasterHandler} disabled={false}>Add</Button>
            <Button btnType="Success" clicked={updateCompanyMasterHandler} disabled={false}>Update</Button>
            <Button btnType="Success"  clicked={()=>openConfirmationBox('Deactivate')} disabled={false}>Deactivate</Button>
            <Button btnType="Success"  clicked={()=>openConfirmationBox('Reactivate')} disabled={false}>Reactivate</Button>
            
        <div>
            
        </div>
        <div className="ag-theme-alpine" style={{ height: 500, width: 1200,float:'right',marginRight:'20px' }}>
            <AgGridReact
                rowData={rowData}
                onSelectionChanged={onSelectionChanged}
                onGridReady={onGridReady}
                pagination= {true}
                paginationPageSize={10}
                  >
                <AgGridColumn field="cmpCode" sortable={ true } headerName={'Company Code'} filter={ true } checkboxSelection={true}></AgGridColumn>
                <AgGridColumn field="cmpCodeHRIS" sortable={ true } headerName={'Code HRIS'} filter={ true }></AgGridColumn>
                <AgGridColumn field="cmpName" sortable={ true } headerName={'Company Name'} filter={ true }></AgGridColumn>
                <AgGridColumn field="cmpAbbrName" sortable={ true } headerName={'Abbreviation'} filter={ true }></AgGridColumn>
                <AgGridColumn field="cmpregNo" sortable={ true } headerName={'Registration No'} filter={ true }></AgGridColumn>
                <AgGridColumn field="cmplogo" sortable={ true } headerName={'Company Logo'}  filter={ true }></AgGridColumn>
                <AgGridColumn field="cmpActiveDate" sortable={ true } headerName={'Active Date'}  filter={ true }></AgGridColumn>
                <AgGridColumn field="cmpIsActive" sortable={ true } headerName={'Company Active'}  filter={ true }></AgGridColumn>
                <AgGridColumn field="cmpCreatedOn" sortable={ true } headerName={'Created On'}  filter={ true }></AgGridColumn>
                <AgGridColumn field="cmpCreatedBy" sortable={ true } headerName={'Created BY'}  filter={ true }></AgGridColumn>
                <AgGridColumn field="cmpLastModifiedOn" sortable={ true } headerName={'LastModified On'}  filter={ true }></AgGridColumn>
                <AgGridColumn field="cmpLastModifiedBy" sortable={ true } headerName={'LastModified By'}  filter={ true }></AgGridColumn>
                <AgGridColumn field="cmpDeactivatedBy" sortable={ true } headerName={'Deactivated By'}  filter={ true }></AgGridColumn>
                <AgGridColumn field="cmpDeactivatedOn" sortable={ true } headerName={'Deactivated On'}  filter={ true }></AgGridColumn>
                <AgGridColumn field="cmpReactivatedBy" sortable={ true } headerName={'Reactivated By'}  filter={ true }></AgGridColumn>
                <AgGridColumn field="cmpReactivatedOn" sortable={ true } headerName={'Reactivated On'}  filter={ true }></AgGridColumn>
            </AgGridReact>
        </div>
        </div>
        </div>
    );
};
export default withRouter(CompanyMasterTable);