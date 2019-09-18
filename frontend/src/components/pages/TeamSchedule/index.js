import React, {Component} from 'react';
import './style.css'
import DayCell from '../../atoms/DayCell';
import authHeader from '../../../_utils/auth-header';

class TeamSchedule extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedDay: '',
            NEOSons: [],
            hours: []
        }
        
        this.createWeekDays = this.createWeekDays.bind(this);
        this.clicked = this.clicked.bind(this);
        this.createHourCells = this.createHourCells.bind(this);
        this.createTable = this.createTable.bind(this);
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
                            colorState={this.state.selectedDay}/>
        })

        return week;
    }

    componentDidMount() {
        const date = new Date()
        const dictDay = {
                         0: "Domingo",
                         1: "Segunda-feira", 
                         2: "Terça-feira", 
                         3: "Quarta-feira", 
                         4: "Quinta-feira", 
                         5: "Sexta-feira",
                         6: "Sábado"}
                         
        var userData = fetch('http://localhost:8000/timecontrol/visualizar/', { 
            method: "GET",
            headers: authHeader()
        })
        .then((response) => response.json())
        .then((responseJSON) => {
            let users = []
            for(let i=0; i< responseJSON.neosons.length; i++) {
                users.push(responseJSON.neosons[i].sigla)
            }
            this.setState({ 
                NEOSons: users,
                hours: responseJSON.horarios,
                selectedDay: dictDay[date.getDay()]
            });
        });

        
    }

    clicked(day) {
        if(this.state.click == day) {
            this.setState({
                selectedDay: ''
            })
        } else {
            this.setState({
                selectedDay: day
            })
        }
    }

    createHourCells(identificator) {
        const hours = ['Hora','07:30','08:20','09:10','10:10','11:00','11:50','12:40','13:30','14:20',
                       '15:10','16:20','17:10','18:00'];

        var rows = hours.map(content => {
            return <div className="hour-column"id={identificator}><b>{content}</b></div>;
        });

        return rows;
    }

    createTable(day) {
        /*const listAcronym = ['AGK', 'DFG', 'FTT', 'GCA',	
                            'JVA', 'LAB', 'LCZ', 'LIT',	
                            'MON', 'NIR', 'PDK', 'VRN',	
                            'AGK', 'DFG', 'FTT',
                            'AGK', 'DFG', 'FTT'];*/

        const dictDay ={"Segunda": 0, "Ter\u00e7a": 13, "Quarta": 26, "Quinta": 39, "Sexta": 52}
        const listAcronym = this.state.NEOSons;
        var rows = []
        listAcronym.map((content, index) => {
            rows.push(<div className="acronym-column"><b>{content}</b></div>);
            for(let i=0; i<13; i++) {
                rows.push(<div className=""><b>{this.state.hours[i+dictDay[day]][2+index]}</b></div>)
            }
        });

        return rows;
    }
    
    render() {
        console.log(this.state.selectedDay)
        return (
            <div>
                <h3 className="team-tittle">Visualizar Horários</h3>
                <div className="day-board">
                        <div className="week-days-grid">
                                {this.createWeekDays()}
                        </div>
                    </div>
                    <div className="week-day-grid">
                        <div id="Segunda-feira" 
                             style={{display: this.state.selectedDay == 'Segunda-feira'? '' : 'none' }}
                             className="team-weekday"
                             >Segunda-feira
                             <div className="team-week-grid">
                                <div>
                                    {this.createHourCells()}
                                </div>
                                <div className="team-day-grid">
                                    {this.state.hours.length > 0 ? this.createTable("Segunda") : ''}
                                </div>
                            </div>
                        </div>
                        <div id="Terca-feira" 
                             style={{display: this.state.selectedDay == 'Terca-feira'? '' : 'none' }}
                             className="team-weekday"
                             >Terca-feira
                             <div className="team-week-grid">
                                <div>
                                    {this.createHourCells()}
                                </div>
                                <div className="team-day-grid">
                                    {this.state.hours.length > 0 ? this.createTable("Ter\u00e7a") : ''}   
                                </div>
                            </div>
                        </div>
                        <div id="Quarta-feira" 
                             style={{display: this.state.selectedDay == 'Quarta-feira'? '' : 'none' }}
                             className="team-weekday"
                             >Quarta-feira
                             <div className="team-week-grid">
                                <div>
                                    {this.createHourCells()}
                                </div>
                                <div className="team-day-grid">
                                    {this.state.hours.length > 0 ? this.createTable("Quarta") : ''}
                                </div>
                            </div>
                        </div>
                        <div id="Quinta-feira" 
                             style={{display: this.state.selectedDay == 'Quinta-feira'? '' : 'none' }}
                             className="team-weekday"
                             >Quinta-feira
                             <div className="team-week-grid">
                                <div>
                                    {this.createHourCells()}
                                </div>
                                <div className="team-day-grid">
                                    {this.state.hours.length > 0 ? this.createTable("Quinta") : ''}
                                </div>
                            </div>
                        </div>
                        <div id="Sexta-feira" 
                             style={{display: this.state.selectedDay == 'Sexta-feira'? '' : 'none' }}
                             className="team-weekday"
                             >Sexta-feira
                             <div className="team-week-grid">
                                <div>
                                    {this.createHourCells()}
                                </div>
                                <div className="team-day-grid">
                                    {this.state.hours.length > 0 ? this.createTable("Sexta") : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}

export default TeamSchedule;