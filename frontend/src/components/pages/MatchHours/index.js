import React, {Component} from 'react';
import './style.css';

import UserCell from '../../organisms/UserCell';
import authHeader from '../../../_utils/auth-header';

class MatchHours extends Component {
    constructor(props) {
        super(props);

        this.state = {
            numberOfNeoSons: 0,
            selectedAcronyms: new Set(),
            NEOSons: [],
            hours: []
        }

        this.clicked = this.clicked.bind(this);
        this.createCells = this.createCells.bind(this);
        this.createHourCells = this.createHourCells.bind(this);
        this.createColunms = this.createColunms.bind(this);
    }

    componentDidMount() {
        var userData = fetch('http://localhost:8000/timecontrol/visualizar/', { 
            method: "GET",
            headers: authHeader()
        })
        .then((response) => response.json())
        .then((responseJSON) => {
            let neosons = []
            for(let i=0; i< responseJSON.neosons.length; i++) {
                neosons.push(responseJSON.neosons[i].sigla)
            }
            let users = {}
            for(let i=0; i< responseJSON.neosons.length; i++) {
                users[responseJSON.neosons[i].sigla] = responseJSON.neosons[i].id
            }
            this.setState({ 
                users: [users],
                NEOSons: neosons,
                hours: responseJSON.horarios
            });
        });
    }

    clicked(acronym) {
        if(this.state.selectedAcronyms.size < 8) {
            if(!this.state.selectedAcronyms.has(acronym)) {
                this.setState(({ selectedAcronyms }) => ({
                    selectedAcronyms: new Set(selectedAcronyms).add(acronym)
                }));
            } else {
                this.setState(({ selectedAcronyms }) => {
                    const newChecked = new Set(selectedAcronyms);
                    newChecked.delete(acronym);
            
                    return {
                        selectedAcronyms: newChecked
                    };
                });
            }
        } else {
            let iterator = this.state.selectedAcronyms.values();
            this.setState(({ selectedAcronyms }) => {
                const newChecked = new Set(selectedAcronyms);
                newChecked.delete(newChecked.delete(iterator.next().value));
        
                return {
                    selectedAcronyms: new Set(newChecked).add(acronym)
                };
            });
        }
    }

    createCells() {
        const user = this.state.NEOSons              
        const cell = user.map(item => {
            return <UserCell className="acronym-cell" 
                             id={item} 
                             value ={item}
                             selectedAcronyms={this.state.selectedAcronyms}
                             onClick={() =>this.clicked(item)}/>
        });

        return cell;
    }

    createHourCells(identificator) {
        const hours = ['Hora','07:30','08:20','09:10','10:10','11:00','11:50','12:40','13:30','14:20',
                       '15:10','16:20','17:10','18:00'];

        var rows = hours.map(content => {
            return <div className={identificator}><b>{content}</b></div>;
        });

        return rows;
    }

    createColunms(set, day) {
    const dictDay ={"Segunda": 0, "Ter\u00e7a": 13, "Quarta": 26, "Quinta": 39, "Sexta": 52}
    
    let masterDiv = []
        for(let item of set) {
            let rows = []        
            rows.push(<div className="acron-column">{item}</div>) 
            for(let i=0; i<13; i++) {
                rows.push(<div className="acron-column">{this.state.hours[i+dictDay[day]][1+this.state.users[0][item]]}</div>)
            }
            masterDiv.push(<div className="match-unique-acron">{rows}</div>)
        }

        return masterDiv;
    }

    render() {
        console.log(this.state.hours)
        return (
            <div className="match-hours-grid"> 
                <h3 className="match-tittle">Horários em comum</h3>
                <div className="acronym-grid">
                    <div className="acronym-title"><b>Selecione as siglas:</b></div>
                    <div className="acronym-cells">{this.createCells()}</div>
                </div>
                <div className="match-board-grid" style={{display: this.state.selectedAcronyms.size >= 2 ? '' : 'none'}}>
                    <div className="match-grid">
                        <div className="match-grid-title">Segunda-feira</div>
                        <div className="match-hour-grid">{this.createHourCells("match-hour")}</div>
                        <div className="match-acron-grid">{this.createColunms(this.state.selectedAcronyms, "Segunda")}</div>
                    </div>
                    <div className="match-grid">
                        <div className="match-grid-title">Terça-feira</div>
                        <div className="match-hour-grid">{this.createHourCells("match-hour")}</div>
                        <div className="match-acron-grid">{this.createColunms(this.state.selectedAcronyms, "Ter\u00e7a")}</div>
                    </div>
                    <div className="match-grid">
                        <div className="match-grid-title">Quarta-feira</div>
                        <div className="match-hour-grid">{this.createHourCells("match-hour")}</div>
                        <div className="match-acron-grid">{this.createColunms(this.state.selectedAcronyms, "Quarta")}</div>
                    </div>
                    <div className="match-grid">
                        <div className="match-grid-title">Quinta-feira</div>
                        <div className="match-hour-grid">{this.createHourCells("match-hour")}</div>
                        <div className="match-acron-grid">{this.createColunms(this.state.selectedAcronyms, "Quinta")}</div>
                    </div>
                    <div className="match-grid" id="friday-table">
                        <div className="match-grid-title">Sexta-feira</div>
                        <div className="match-hour-grid">{this.createHourCells("match-hour")}</div>
                        <div className="match-acron-grid">{this.createColunms(this.state.selectedAcronyms, "Sexta")}</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MatchHours;