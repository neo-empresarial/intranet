import React, {Component} from 'react';
import DayCell from '../../atoms/DayCell';
import "./style.css";

class DaysRow extends Component {
    constructor(props) {
        super(props)

        this.state = {
            click: ''
        }

        this.createWeekDays = this.createWeekDays.bind(this);
        this.clicked = this.clicked.bind(this);
    }
    
    componentDidUpdate(prevProps, prevState) {
        console.log("Component will update",prevProps, prevState, this.state.click)
    }

    createWeekDays() {
        const days = ['Segunda-feira',
                      'Terca-feira',
                      'Quarta-feira',
                      'Quinta-feira',
                      'Sexta-feira'];

        const week = days.map((day) => {
            return <DayCell id={day} 
                            function={() => this.clicked(day)}
                            colorState={this.state.click}/>
        })

        return week;
    }

    clicked(day) {
        if(this.state.click == day) {
            this.setState({
                click: ''
            })
        } else {
            this.setState({
                click: day
            })
        }
    }

    render() {
        return(
            <div className="week-days-grid"
                 value={this.state.click}>
                {this.createWeekDays()}
            </div>
        )
    }
}

export default DaysRow;