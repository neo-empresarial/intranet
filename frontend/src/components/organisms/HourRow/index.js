import React, {Component} from "react";
import './styles.css';

const HourRow = props =>  {
    return (
        <div className="hourRow-grid">
            <div className="hourRow-camp"><p>{props.acronym}</p></div>
            <div className="hourRow-camp"><p>{props.balance}</p></div>
            <div className="hourRow-camp"><p>{props.dayoff}</p></div>
            <div className="hourRow-camp"><p>{props.xhour}</p></div>
            <div className="hourRow-camp"><p>{props.neoson}</p></div>
        </div>
    )
}

export default HourRow;