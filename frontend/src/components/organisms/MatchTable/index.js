import React, {Component} from 'react';
import './styles.css'

class MatchTable extends Component {
    constructor(props){
        super(props);
        this.state = {
            neoSons: ['ATH','PDK'],
            acronyms: 2,
            hours: 13,
        };

        this.createHourColunm = this.createHourColunm.bind(this);
        this.createColunm = this.createColunm.bind(this);
    }

    createHourColunm() {
        const hours = ['--/--','07:30','08:20','09:10','10:10',
                       '11:00','11:50','12:40','13:30',
                       '14:20','15:10','16:20','17:10',
                       '18:00'];
                       
        const colunm = hours.map(item => {
            return (<div className="match-jobHour" id={item}>{item}</div>);
        });

        return colunm;
    }

    createColunm(day) { /* Use 2d array to create the columns, */ 
        const acronyms = [['ATH','07:30','08:20','09:10','10:10',
                           '11:00','11:50','12:40','13:30',
                           '14:20','15:10','16:20','17:10',
                           '18:00'],
                          ['PDK','07:30','08:20','09:10','10:10',
                           '11:00','11:50','12:40','13:30',
                           '14:20','15:10','16:20','17:10',
                           '18:00']];
        const hours = ['07:30','08:20','09:10','10:10',
                       '11:00','11:50','12:40','13:30',
                       '14:20','15:10','16:20','17:10',
                       '18:00'];
        const result = [];

        /*acronyms.map(neoson => {
            result.push(<div className="match-jobHour">{neoson}</div>)
        });

        hours.map(content => {
            acronyms.map(neoson => {
                result.push(<div className="match-jobHour" id={day+": "+content}>{neoson + content}</div>);
            });
        });*/

        acronyms.map(array => {
            array.map(content => {
                result.push(<div className="match-jobHour" id={day+": "+content}>{content}</div>)
            });
        });

        return result;
    }
        

    render() {
        return (
            <div className="match-table-grid">
                <div className="hour">
                    <h5 className="match-table-tittle">Hora</h5>
                    {this.createHourColunm()}
                </div>
                <div className="days">
                    <h5 className="match-table-tittle">Segunda-feira</h5>
                    <div className="days-grid">
                        {this.createColunm('Segunda-feira')}
                    </div>
                </div>
                <div className="days">
                    <h5 className="match-table-tittle">Terca-feira</h5>
                    <div className="days-grid">
                    {this.createColunm('Terca-feira')}
                    </div>
                </div>    
                <div className="days">
                    <h5 className="match-table-tittle">Quarta-feira</h5>
                    <div className="days-grid">
                    {this.createColunm('Quarta-feira')}
                    </div>
                </div>
                <div className="days">
                    <h5 className="match-table-tittle">Quinta-feira</h5>
                    <div className="days-grid">
                    {this.createColunm('Quinta-feira')}
                    </div>
                </div>
                <div className="days">
                    <h5 className="match-table-tittle">Sexta-feira</h5>
                    <div className="days-grid">
                    {this.createColunm('Sexta-feira')}
                    </div>
                </div>
            </div>
        )
    }
}

export default MatchTable;
