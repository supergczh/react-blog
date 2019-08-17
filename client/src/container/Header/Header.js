import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Icon, Button,Row,Col,Menu,Modal } from 'antd';
import './Header.scss';

const { Header} = Layout;

export class Headers extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible:false,
    }
}

onCancel=()=>{
  this.setState({
    visible: false,
  });
  
}

  /**
   * @description: 登陆或退出model
   * @param {type} 
   * @return: 
   */
  renderModel=()=>{

       return  <Modal
                    title="login"
                    footer={null}
                    visible={this.state.visible}
                    maskClosable={true}
                    forceRender='true'
                    onCancel={this.onCancel}
                  >
                  <p>login</p>
                </Modal>
            
  };

  /**
   * @description: 展示model
   * @param {type} 
   * @return: 
   */

  showModal=()=>{
    this.setState({
      visible: true,
    });
  };

  render() {

    const Model=this.renderModel()
    const sider = { xxl: 4, xl: 5, lg: 5, sm: 0, xs: 0 }
    const content = { xxl: 20, xl: 19, lg: 19, sm: 24, xs: 24 }

    return (
      <React.Fragment>
        <Header className="header">  
        <Row className="header_wrap">
            {/* 左侧 */}
            <Col {...sider}>
            
            </Col>
            {/* 右侧 */}
            <Col {...content} className="header_wrap">
              <div className="col_wrap">
                <Menu
                  mode="horizontal"
                  className="Menu"
                >
                  <Menu.Item key="mail">
                    <Icon type="home" />首页
                  </Menu.Item>
                  <Menu.Item key="app" >
                    <Icon type="folder" />关于
                  </Menu.Item>
                </Menu>
                  <Button type="primary" 
                          size="small" 
                          className="login_btn" 
                          onClick={this.showModal}
                          >登陆</Button>
                  <Button 
                          type="danger" 
                          size="small" 
                          >注册</Button>
                </div>
            </Col>
          </Row> 
        </Header>
        {Model}
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Headers)
