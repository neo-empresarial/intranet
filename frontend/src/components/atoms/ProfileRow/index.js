import React from 'react';
import './styles.css'
const ProfileRow = props => (
    <div className="profilerow-grid">
        <div className="question"
             id={props.question}
             ><b>{props.question}</b>
        </div>
        <div className="answer"
             id={props.answer}>{props.answer}</div>
    </div>
)

export default ProfileRow;
