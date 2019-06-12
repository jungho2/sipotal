import React, { Component } from 'react';
import { Table, Input, Button, Modal, Icon, PageHeader, Avatar, Drawer, Progress, Typography, Alert, Popover } from 'antd';
import queryString from 'query-string';
import Axios from 'axios';
import moment from 'moment';


// 평가 저장버튼 활성화
let isCheck = true;

const { Text } = Typography;

class RatingView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            studentInfo: {},
            visible: false,
            percent: 0,
            previewVisible: false,
        };

        this.ratingList = [];
        this.inputList = [];
        this.ratingData = {};


    }

    componentWillMount() {

        const { location } = this.props;

        // url param값 셋팅
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
                    this.ratingData[v.RATING_CODE].check = '';
                    this.ratingData[v.RATING_CODE].isSave = false;
                })
                this.setState({
                    studentInfo: response.data.user,
                    ...response.data,
                    ...this.ratingData
                });

            }) // SUCCESS
            .catch(response => { console.log(response); }); // ERROR 
    }

    componentWillUnmount() {
        isCheck = true;
    }




    // 선택버튼 value 셋팅
    handleButtonClick = (e, type) => {

        this.ratingData[type.RATING_CODE].value = e.target.value

        this.setState({});
    }

    // input값 validation 체크 및 value 셋팅
    handleInput = (e, type) => {

        this.ratingData[type.RATING_CODE].check = '';

        if (type.INPUT_TYPE === 'I002') {
            if (isNaN(e.target.value)) {
                this.error('숫자를 입력하세요');
                return;
            } else {
                const v1 = parseFloat(e.target.value);
                this.ratingData[type.RATING_CODE].value = v1
            }
        } else if (type.INPUT_TYPE === 'I001') {
            if (e.target.value.length > 19) {
                this.error('20자리까지 입력가능합니다');
            } else {
                this.ratingData[type.RATING_CODE].value = e.target.value
            }
        }

        this.setState({})
    }

    // error Alert
    error = (msg) => {
        Modal.error({
            title: 'This is an error message',
            content: msg,
        });
    }

    // success Alert
    success = (msg) => {
        Modal.success({
            title: 'This is a success message',
            content: msg,
        });
    }



    // 저장버튼 클릭
    saveBtn = key => {

        const value = this.ratingData[key.RATING_CODE].value;

        if (value !== '') {
            if (key.INPUT_TYPE === 'I002') {
                if (value < 0 || value > 100) {
                    this.error('상하한 한도를 벗어났습니다. \n 1~100 사이 숫자를 입력해주세요');
                    this.ratingData[key.RATING_CODE].value = '';
                    this.ratingData[key.RATING_CODE].check = 'no';
                    isCheck = true;
                    this.setState({});
                } else {
                    this.success('저장완료');
                    this.ratingData[key.RATING_CODE].check = 'ok';
                    this.ratingData[key.RATING_CODE].isSave = true;
                    let percent = this.state.percent + 15;

                    this.setState({ percent });

                    this.state.ratingList.some(rating => {
                        if (rating.check === 'ok') {
                            isCheck = false;
                        } else {
                            isCheck = true;
                        }
                        return (rating.check !== 'ok')
                    })
                }

            } else {
                this.success('저장완료');
                this.ratingData[key.RATING_CODE].check = 'ok';
                this.ratingData[key.RATING_CODE].isSave = true;
                let percent = this.state.percent + 15;
                this.setState({ percent });

                this.state.ratingList.some(rating => {

                    if (rating.check === 'ok') {
                        isCheck = false;
                    } else {
                        isCheck = true;
                    }
                    return (rating.check !== 'ok')
                })
            }
            this.setState({});
        } else {
            this.error('값을 입력하세요');
        }

    }

    // 편집버튼 선택
    editBtn = key => {

        this.ratingData[key.RATING_CODE].isSave = false;
        this.ratingData[key.RATING_CODE].check = '';

        let percent = this.state.percent - 15;


        this.setState({ percent });


    }


    // 학생 상세정보 Modal
    studentInfoBtn = () => {
        this.setState({
            visible: true,
        });

    }

    // 학생 상세정보 Close
    onClose = () => {
        this.setState({
            visible: false,
        });
    };


    // 평가표 초기화
    initRating = () => {

        this.ratingList.forEach(v => {
            v.value = '';
            v.check = '';
            v.isSave = false;
        })

        this.setState({
            percent: 0
        });

    }

    // 평가표 DB 저장
    saveRating = () => {

        const { studentInfo } = this.state;

        const param = {
            empCode: studentInfo.EMP_CODE,
            empName: studentInfo.EMP_NAME,
            gisuS: studentInfo.GISU,
            ratingList: this.ratingList,
        }

        Axios.post('http://localhost:8585/api/v1/ratingSave', param)
            .then(response => {

                if (response.data === 1) {
                    this.success(`${this.state.studentInfo.EMP_NAME}학생의 평가가 완료되었습니다`);
                    window.history.back()
                } else {
                    this.error('저장에 실패하였습니다')
                    return;
                }

            }) // SUCCESS
            .catch(response => { console.log(response); }); // ERROR 

            console.log('sdada');
    }



    // 학생 상세정보 사진창 Modal
    handlePreview = () => {
        this.setState({
            previewVisible: true,
        });
    }

    // 학생 상세정보 사진창 Modal Close
    handleCancel = () => this.setState({ previewVisible: false });

    test = () => {
     alert('dd');
    }

    render() {

        const { ratingList, inputList } = this;

        // 평가항목 버튼타입 버튼 생성
        const buttonType = (type) => {
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
                        style={{ width: '80px' }}
                        onClick={e => this.handleButtonClick(e, type)}
                        value={index}
                        disabled={this.state[type.RATING_CODE].isSave}
                    >
                        {index}
                    </Button>
                )
            )
            return buttonType;
        }

        // 테이블 칼럼 생성
        const columns = [
            {
                title: '항목',
                dataIndex: 'name',
                key: 'name',
                width: '14%',
                align: 'center'
            },
            {
                title: '등급',
                dataIndex: 'type',
                key: 'type',
                width: '35%',
                align: 'center'
            },
            {
                title: '입력사항',
                dataIndex: 'value',
                key: 'value',
                width: '31%',
                align: 'center'
            },
            {
                title: '',
                dataIndex: 'saveBtn',
                key: 'saveBtn',
                width: '10%',
                align: 'center'
            },
            {
                title: '',
                dataIndex: 'check',
                key: 'check',
                width: '10%',
                align: 'center'
            }
        ];


        // 테이블 Data리스트
        const dataList = [];

        ratingList.forEach(
            r => {
                const data = {}
                data.name = r.RATING_NAME;
                if (r.INPUT_TYPE === 'I001' || r.INPUT_TYPE === 'I002') {
                    data.type = <Input
                        onChange={e => this.handleInput(e, r)}
                        placeholder={r.INPUT_TYPE === 'I001' ? '텍스트 입력' : '숫자 입력(1~100)'}
                        value={this.ratingData[r.RATING_CODE].value}
                        disabled={this.ratingData[r.RATING_CODE].isSave}
                    />
                } else {
                    data.type = buttonType(r);
                }
                data.value = this.state[r.RATING_CODE].value;

                data.saveBtn =
                    this.state[r.RATING_CODE].check !== 'ok'
                        ?
                        <Button
                            onClick={() => this.saveBtn(r)}
                        >
                            저장
                    </Button>
                        :
                        <Button
                            onClick={() => this.editBtn(r)}
                        >
                            편집
                    </Button>;

                data.check =
                    this.state[r.RATING_CODE].check === ''
                        ?
                        ''
                        :
                        this.state[r.RATING_CODE].check === 'ok'
                            ?
                            <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
                            :
                            <Popover content={(
                                <div>
                                   <Text type="danger">잘못된 값이 입력되었습니다</Text>
                                </div>
                            )}>
                            <Icon
                            type="close-circle" theme="twoTone" twoToneColor="red" />
                            </Popover>;
                dataList.push(data);
            });


        const title =
            <div>
                <span>{this.state.studentInfo.EMP_NAME}</span><pre style={{ display: 'inline' }}> </pre>
                <Avatar
                    className='btn'
                    src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
                    onClick={this.studentInfoBtn}
                />
            </div>


        const { studentInfo } = this.state;

        const studentInfoList =
            [{ 'col': '학생이름', 'row': studentInfo.EMP_NAME }
                , { 'col': '기수', 'row': studentInfo.GISU }
                , { 'col': '생일', 'row': moment(studentInfo.BIRTHDATE).format('YYYY-MM-DD') }
                , { 'col': '성별', 'row': studentInfo.GENDER }
                , { 'col': '주소', 'row': studentInfo.ADDRESS }]


        const studentI = studentInfoList.map(
            r => (
                <div>
                    <tr>
                        <th><a>{r.col}</a></th>
                    </tr>
                    <tr>
                        <td>{r.row}</td>
                    </tr>
                </div>
            )
        )

        const imgFile = `/img/${studentInfo.URL}`


        const studentDetail =
            <div>
                <img className='btn' src={imgFile} onClick={this.handlePreview} width="180" height="120" />
                <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={imgFile} />
                </Modal>
                <table>
                    {studentI}
                </table>
            </div>


        return (
            <div>
                <div>
                    <PageHeader onBack={() => window.history.back()}
                        title={title}
                        subTitle='학생 능력 평가를 시작하겠습니다'
                        extra={[
                            <Button key="1"
                                onClick={this.initRating}
                            >
                                초기화</Button>,
                            <Button
                                type="primary"
                                disabled={isCheck}
                                key="2"
                                onClick={this.saveRating}
                            >평가 저장</Button>
                        ]}>
                    </PageHeader>
                    <Drawer
                        title="학생 정보"
                        placement='left'
                        closable={false}
                        onClose={this.onClose}
                        visible={this.state.visible}
                    >
                        {studentDetail}
                    </Drawer>
                </div>
                <div className='div1'>
                    <div className='left'>
                        <Table
                            style={{ width: '800px', higth: '500px' }}
                            columns={columns}
                            dataSource={dataList}
                            bordered />
                    </div>
                    <div className='right'>
                        <div>
                            <Progress type="circle" percent={this.state.percent} />
                        </div>
                        <br />
                        <div>
                            <Text strong>항목별 평가진행 상황</Text>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RatingView;