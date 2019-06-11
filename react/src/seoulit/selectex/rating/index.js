import React, { Component } from 'react';
import { Input, InputNumber, Button } from 'antd';
import queryString from 'query-string';
import Axios from 'axios';

class Rating extends Component {

    constructor(props) {
        super(props);

        this.state = {

        };

        this.ratingList = [];
        this.inputList = [];
        this.ratingData = {};


    }

    componentWillMount() {

        const { location } = this.props;

        const query = queryString.parse(location.search);

        const param = {
            id: query.empName
        }



        Axios.post('http://localhost:8585/api/v1/empSearchRating', param)
            .then(response => {

                this.ratingList = response.data.ratingList;
                this.inputList = response.data.inputList;

                this.ratingList.forEach(v => {

                    this.ratingData[v.RATING_CODE] = v;

                    this.ratingData[v.RATING_CODE].value = '';

                })


                this.setState({
                    ...response.data,
                    ...this.ratingData
                });

                console.log('ddd',this.state)



            }) // SUCCESS
            .catch(response => { console.log(response); }); // ERROR 


    }

    test = e => {

        this.setState({
            aa: e.target.value,
        });
    }


    handleButtonClick =  (e,type) => {


        this.ratingData[type.RATING_CODE].value = e.target.value

        this.setState({

        });


    }

    handleInput = (e,type) => {


        this.ratingData[type.RATING_CODE].value = e.target.value

        this.setState({

        })
        

    }




    render() {

        const { ratingList, inputList } = this;


        const inputType = (type) => {


            const inputTypeContents = [];

            inputList.forEach(r => {


                if (type.INPUT_TYPE === r.INPUT_TYPE) {

                    r.INPUT_TYPE_CONTENTS.split(',').forEach(r => {

                        inputTypeContents.push(r);
                    })
                }

            });

            const buttonType = inputTypeContents.map(
                (index) => (
                    <Button
                    onClick={e => this.handleButtonClick(e,type)}
                    value={index}
                    >
                        {index}
                    </Button>
                )
            )

            return buttonType;
        }




        const test = ratingList.map(
            (subName) => (
                <tr>
                    <th style={{ width:'80px'}}>
                        {subName.RATING_NAME}
                    </th>
                    <td style={{ width:'220px'}}>
                        {subName.INPUT_TYPE === 'I001' || subName.INPUT_TYPE === 'I002'?
                            <Input
                            onChange={e => this.handleInput(e,subName)}
                            placeholder={subName.INPUT_TYPE === 'I001' ? '텍스트 입력' : '숫자 입력'}
                            value={this.ratingData[subName.RATING_CODE].value
                            }
                            >
                            </Input>
                            :
                            inputType(subName)
                        }
                    </td>
                    <td style={{ width:'300px' }}>
                        {this.state[subName.RATING_CODE].value}
                    </td>
                    <td>
                        <Button>
                            입력
                        </Button>
                    </td>
                </tr>
            )

        )

 
        return (
            <div>
                <table>
                    {test}
                </table>
            </div>
        );
    }
}

export default Rating;