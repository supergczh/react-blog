import React from 'react';
import withTitle from '../../HOC/basetitle'
import './basetitle.scss'

class Basetitle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      
     };
  }
  render() {
    return (
      <div className="basetitle" >{this.props.title}</div>
    )
  }
}

export default withTitle(Basetitle);