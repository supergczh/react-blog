import React from 'react';
const withTitle= (Component) => {
  const NewComponent = (props) => {
    
      return <Component {...props} />;
   
    
  }

   return NewComponent;
};
export default withTitle