import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Articlelist.scss';

export class Articlelist extends Component {

  render() {
    return (
      <div id="Articlepreview">
         <ul className="wrap">
              <li className="Articlelist"></li>
         </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Articlelist)
