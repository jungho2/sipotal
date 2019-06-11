import React, { Component } from 'react';
import { Select, Button } from 'antd';
import Axios from 'axios';
import Grid from './grid';

const { Option } = Select;

class Grades extends Component {

    constructor(props) {
        super(props);

        this.state = {
            universityList: [],
            professorList: [],
            studentList: [],
        };

    }

    componentWillMount(){
    // CrossOrigin Api 호출
    Axios.get('http://localhost:8585/api/v1/universityList')
      .then(response => {

        this.setState({
            universityList: response.data,
        });

        console.log('ddd',this.state.universityList);


      }) // SUCCESS
      .catch(response => { console.log(response); }); // ERROR 
        
    }


     onChangeUni = key => {

      this.setState({
         uniCode: key, 
      });

      if(this.state.proCode !== undefined){
        this.setState({
            proCode: '', 
         });
      }

        const param = {
            uniCode: key
        }


        Axios.post('http://localhost:8585/api/v1/professorList',param)
        .then(response => {
  
       this.setState({
        professorList: response.data,
       })
    
        }) // SUCCESS
        .catch(response => { console.log(response); }); // ERROR 

      }

      onChangePro = key => {

        this.setState({
            proCode: key, 
         });

      }

    searchEmp = () => {

        const { uniCode, proCode } = this.state;

        if (uniCode === undefined || uniCode === '') {

            alert('대학을 선택해주세요');

        } else {

            if (proCode === undefined || proCode === '') {
                alert('교수를 선택해주세요');
            } else {

                console.log(proCode);

                Axios.get(`http://localhost:8585/api/v1/empSearchList?proCode=${proCode}`)
                    .then(response => {

                        console.log(response);

                        this.setState({
                            studentList: response.data
                        })

                    }) // SUCCESS
                    .catch(response => { console.log(response); }); // ERROR 
            }
        }

    }

      


    render() {

        const { history } = this.props;

         const university = this.state.universityList.map(
            (uni) => (
                <Option key={uni.UNIVERSITY_CODE}>{uni.UNIVERSITY_NAME}</Option>
            )

        )

        const professor = this.state.professorList.length !== 0 ? 
        this.state.professorList.map(
            (pro) => (
                <Option key={pro.PROFESSOR_CODE}>{pro.PROFESSOR_NAME}</Option>
            )
        )
            : []

        


        return (
            <div>
                <div>
                학생선택하기
                    </div>
                    <hr/>
            <div>
                <table>
                    <tr>
                        <th>
                            대학
                        </th>
                        <td>
                            <Select
                                style={{ width: 200 }}
                                placeholder='선택하세요'
                                value={this.state.uniCode}
                                onChange={this.onChangeUni}
                            >
                                {university}
                            </Select>
                        </td>

                        <th>
                            교수
                        </th>
                        <td>
                            <Select
                                style={{ width: 200 }}
                                placeholder={this.state.professorList.length !== 0 ? '선택하세요' : '대학을 선택하세요'}
                                onChange={this.onChangePro}
                                value={this.state.proCode}
                            >
                                {professor}
                            </Select>
                        </td>
                        <td>
                            <Button
                                onClick={this.searchEmp}
                            >
                                조회
                            </Button>
                            </td>
                    </tr>

                </table>
                
            </div>
            
            <Grid
            student={this.state.studentList}
            
            history={history}
            >
                </Grid>
            </div>
        );
    }
}

export default Grades;