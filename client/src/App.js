import React, { Component } from 'react';
// import Sider from './container/Sider'
import './App.css'

import { renderRoutes } from "react-router-config";

class App extends Component {
 
  render() {;
    return (
      <div className="App">
          {/* <Sider /> */}
          {renderRoutes(this.props.route.routes)}
       </div>
    );
  }
}

export default App;
