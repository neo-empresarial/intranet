import React, {Component} from 'react';
import './styles.css';

class DayCell extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (    
            <div className="cell-day"
                 style={{backgroundColor: this.props.colorState == this.props.id ? '#ff720a' : 'white'}}>
                    <label className="day-label" 
                            style={{color: this.props.colorState == this.props.id ? 'white' : 'black'}}>
                            {this.props.id}
                    <input className="myCheck"
                            id={this.props.id}
                            value={this.props.id}
                            type="checkbox"
                            onClick={this.props.function}  
                            />
                            </label>
            </div>
        )
    }
}

export default DayCell;
