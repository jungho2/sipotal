import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';

import Axios from 'axios';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [{
        headerName: "사번", field: "EMP_CODE"
      }, {
        headerName: "이름", field: "EMP_NAME"
      }, {
        headerName: "직급", field: "POSITION"
      },  {
        headerName: "부서", field: "DEPT_NAME"
      }],
      rowData: [],
    }
    }

    componentWillMount() {
      // CrossOrigin Api 호출
      Axios.get('http://localhost:8585/api/v1/empList')
        .then(response => {

          

          this.setState({
            rowData: response.data,
          });
          

          
  
        }) // SUCCESS
        .catch(response => { console.log(response); }); // ERROR 
  
  
    }


  render() {
    return (
      <div 
        className="ag-theme-balham"
        style={{ 
        height: '300px', 
        width: '830px' }} 
      >
        <AgGridReact
          columnDefs={this.state.columnDefs}
          rowData={this.state.rowData}>
        </AgGridReact>
      </div>
    );
  }
}

export default Grid;
