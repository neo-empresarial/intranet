import React from 'react';
import './style.css';

class PageTemplate extends React.Component {


  render() {
    return(
      <div className='page-template'>
        <div className='page-template-title'>{this.props.title}</div>
        <div className='page-template-content'>{this.props.children}</div>
      </div>
    )
  }
}

export default PageTemplate;