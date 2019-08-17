/** 左侧导航 **/
import React from 'react';
import P from 'prop-types';
import { Layout, Icon ,Row,Avatar,Divider} from 'antd';
import { Link,withRouter } from 'react-router-dom';
import c from 'classnames';
// import css from './index.scss';
import  './index.scss';
// import _ from 'lodash';


const { Sider } = Layout;


 class Side extends React.PureComponent {
  

    constructor(props) {
        super(props);
        this.state = {
            siderGutter:{
                xs: '0',
                sm: '576px',
                md: '768px',
                lg: '992px',
                xl: '1200px',
                xxl: '1600px',
            },
        };
    }

    componentDidMount() {
        
      

    }

    // static getDerivedStateFromProps(nextProps, prevState) {
    //         if(nextProps.data.length){
    //             return {
    //                 sourceData:nextProps.data
    //               };
    //         }
    //           return null
    // }

    componentDidUpdate(prevProps, prevState) {
      
      }
    

    render() {

        return (
           <div className="Sidewrap">
                 <img className="Avatar"  src="https://avatars2.githubusercontent.com/u/37320849?s=460&v=4" />
                 <h5>灰太狼</h5>
                 <div>可恶的喜羊羊，我一定会回来的222</div>
                 <ul className="icon">
                     <li><Icon type="github" style={{fontSize: '16px',marginRight:'7px'}} />
                     <a target="_blank"  href="https://github.com/supergczh">github</a>
                     </li>
                 </ul>
                 <div>
                     <Divider orientation="left">最近文章</Divider>
                     <ul className="article_list">
                         <li></li>
                     </ul>
                 </div>
                 <div>
                     <Divider orientation="left">标签</Divider>
                 </div>
           </div>
            
        );
    }
}

export default withRouter(Side) 