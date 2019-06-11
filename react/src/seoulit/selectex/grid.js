import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [{
        headerName: "학번", field: "EMP_CODE"
      }, {
        headerName: "이름", field: "EMP_NAME"
      }, {
        headerName: "기수", field: "GISU"
      },{
        headerName: "평가여부", field: "STATUS"
      },],
      rowSelection: "single",
    }
 
    }

    onGridReady = params => {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    }

    test = () => {

      
      const { history } = this.props;

      

      const emp = this.gridApi.getSelectedRows()[0];

      if(emp.STATUS !== 'N'){
        alert('평가종료');
      } else {
        
        history.push({
          pathname: '/selectex/rating',
          search: `?empName=${emp.EMP_NAME}`,
        });
      }

    }



  render() {

    const { student } = this.props;

    return (
      <div 
        className="ag-theme-balham"
        style={{ 
        height: '300px', 
        width: '830px' }} 
      >
        <AgGridReact
          onGridReady={this.onGridReady}
          rowSelection={this.state.rowSelection}
          columnDefs={this.state.columnDefs}
          rowData={student}
          onCellClicked={this.test}
        >
        </AgGridReact>
      </div>
    );
  }
}

export default Grid;
