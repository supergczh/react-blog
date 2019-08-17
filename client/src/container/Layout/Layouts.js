import React, { Component } from 'react';

import { Layout, Icon, Button,Row,Col } from 'antd';

import Side from "../Side";

import Headers from '../Header/Header'

import { withRouter ,Link} from 'react-router-dom';

import { renderRoutes } from "react-router-config";

import {request} from '../../utils/httpUtil';
import *as actionCreators from '../../redux/actions/sys-action';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'

// import {
//   Link
// } from 'react-router-dom';

import "./Layouts.scss";

const {Content } = Layout;

class Layouts extends Component {

  state = {
    collapsed: false,
    // data:[]


  };

  // componentDidMount(){
  //     const asyncLoadData= async ()=> {

  //       let menuData=  await request('get','/api/useradmin',{})

  //       console.log("menuData",menuData);
        
        
  //       this.setState({data:menuData.data})
  //   }
  //   asyncLoadData()


  // }


  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  logout = () => {
    
      console.log(this.props);
      this.props.onLogout();
      localStorage.removeItem("userLoginInfo");
      this.props.history.push('/login')
  }



  render() {
    let {data}=this.state;
    const sider = { xxl: 4, xl: 5, lg: 5, sm: 0, xs: 0 }
    const content = { xxl: 20, xl: 19, lg: 19, sm: 24, xs: 24 }


  //  let home={pathname:'/system2/useradmin2'}
    return (
      <Layout style={{height:"100vh",background: '#fff'}} >
      
        <Headers />
        <Row>
          <Col {...sider}>
             <Side
              data={data}
              collapsed={this.state.collapsed}
              />
          </Col>
          <Col {...content}>

          <div className="main-container">
          {renderRoutes(this.props.route.routes)}
          </div>
            {/* <Content
                style={{margin: '24px 16px', padding: 24, background: '#fff',}}
                >
                    {renderRoutes(this.props.route.routes)}
              </Content> */}
          </Col>
        </Row>
        {/* <Layout style={{marginTop:'40px',background: '#fff'}}>
            <Side
              data={data}
              collapsed={this.state.collapsed}
              />
           
        </Layout> */}
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, (dispatch) => bindActionCreators(actionCreators, dispatch))(withRouter(Layouts))


// export default withRouter(Layouts);
