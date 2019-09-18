import React from 'react';
import './styles.css';

const AcronymBorder = props => {
    return (
        <div className="out-circle" 
             id={props.acronym} 
             value={props.value} 
             style={{ backgroundColor: props.value >= 0 ? '#60c98d' : '#ef7b7b' }}>
            <div className="in-circle">
                <div className="neosons-name">
                    <p>{props.acronym}</p>
                </div>
            </div>
        </div>
    )
}

export default AcronymBorder;