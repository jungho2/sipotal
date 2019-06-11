import React, { Component } from 'react';
import Axios from 'axios';
import { Menu, Icon, Modal } from 'antd';
import '../App.css'


const baseMenu = [];

const { SubMenu } = Menu;


class MenuBar extends Component {

  constructor(props) {
    super(props);
    console.log("constructor");
    this.state = {
      tt: '',
      flag: false,
    };
  }

  componentWillMount() {
    // CrossOrigin Api 호출
    Axios.get('http://localhost:8585/api/v1/menuList')
      .then(response => {
        response.data.forEach(r => {
          baseMenu.push(r);
        });

        this.setState({
          flag: true
        })

      }) // SUCCESS
      .catch(response => { console.log(response); }); // ERROR 


  }

  handleClick = e => {

    const { history, userAuth } = this.props;


    const menuCode = baseMenu.filter(r => r.MENU_URL === e.key)[0].MENU_CODE;

    let flag = false;

    if(sessionStorage.getItem("id") === null){

      this.warning('로그인 해주시길 바랍니다');

    } else {

    userAuth.some(r => {

      if (r.MENU_CODE === menuCode) {
        flag = true;
      }
      return (r.MENU_CODE === menuCode);
    })

    if (flag) history.push(e.key);
    else this.warning('접근권한이 없습니다');
  
  }
  
  }


  warning = (text) => {
    Modal.warning({
      title: text,
      content: 'You do not have permission',
    });
  }

  render() {

    const menuName = [];
    const menuSubName = [];

    baseMenu.forEach(r => {
      if (r.SUPER_MENU_CODE === undefined) {
        menuName.push(r);
      } else {
        menuSubName.push(r);
      }
    })

    const subMenu = (name) => {

      const subMenuName = [];

      menuSubName.forEach(r => {

        if (name.MENU_CODE === r.SUPER_MENU_CODE) {
          subMenuName.push(r);
        }

      });

      const subMenuTag = subMenuName.map(
        (subName) => (
          <Menu.Item key={subName.MENU_URL}>
            {subName.MENU_NAME}
          </Menu.Item>
        )
      )

      return subMenuTag;
    }


    const menuList = menuName.map(
      (name) => (
        <SubMenu
          title={
            <span className="submenu-title-wrapper">
              <Icon type="appstore" />
              {name.MENU_NAME}
            </span>
          }
        >
          {subMenu(name)}
        </SubMenu>
      )

    )

    return (

      <div>
        <Menu
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode="horizontal">
          {menuList}
        </Menu>
      </div>
    );
  }
}

export default MenuBar;

