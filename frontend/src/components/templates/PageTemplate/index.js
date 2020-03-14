import React from 'react';
import './style.css';

class PageTemplate extends React.Component {


  render() {
    return(
      <div className='page-template'>
        <div className='page-template-title'>{this.props.title}</div>
        {this.props.children}
      </div>
    )
  }
}

export default PageTemplate;