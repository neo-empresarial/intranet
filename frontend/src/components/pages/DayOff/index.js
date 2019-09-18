import React, {Component} from 'react';
import Calendar from 'react-calendar';
import moment, { calendarFormat } from 'moment';
import './styles.css'
import authHeader from '../../../_utils/auth-header';

import Delete from '../../atoms/icons/delete-button.svg';
import Done from '../../atoms/icons/done.svg';
import Info from '../../atoms/icons/information.svg';

class DayOff extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visibility: "none",
            selectedDate: moment(),
            checkCalendar: false,
            timeControl: [],
            approved: [{"id": 11, 
                        "neoson_id": 2, 
                        "tipo": 0, 
                        "hora": 0, 
                        "data": 
                        "2019-04-07", 
                        "dataPedido": 
                        "2019-04-07", 
                        "quantidade": 1, 
                        "conformidade": true, 
                        "aprovante_id": 4, 
                        "aprovada": true, 
                        "justificativa":"N\u00e3o conforme!"}, 
                        {"id": 12, 
                        "neoson_id": 2, 
                        "tipo": 0, 
                        "hora": 0, 
                        "data": "2019-04-07", 
                        "dataPedido": "2019-04-05", 
                        "quantidade": 1, 
                        "conformidade": true, 
                        "aprovante_id": 4, 
                        "aprovada": true, 
                        "justificativa": "Folga comum"}, 
                        {"id": 13, 
                        "neoson_id": 2, 
                        "tipo": 1, 
                        "hora": 1, 
                        "data": "2019-04-07", 
                        "dataPedido": "2019-04-07", 
                        "quantidade": 1, 
                        "conformidade": true, 
                        "aprovante_id": 4, 
                        "aprovada": true, 
                        "justificativa": "Hora extra aprovada"}],
            nApproved: [{"id": 10, "neoson_id": 2, "tipo": 1, "hora": 0, "data": "2019-04-07", "dataPedido": "2019-04-07", "quantidade": 2, "conformidade": true, "aprovante_id": 4, "aprovada": false, "justificativa": "Hora extra nao aprovada ainda"}],
            pending: [{"id": 14, "neoson_id": 1, "tipo": 1, "hora": 0, "data": "2019-04-07", "dataPedido": "2019-04-07", "quantidade": 1, "conformidade": true, "aprovante_id": 2, "aprovada": false, "justificativa": "hora extra para ser aprovada por rot"}]
        };


        this.dayDifference = this.dayDifference.bind(this);
        /*this.dayOffType = this.dayOffType.bind(this);
        this.createNewFolga = this.createNewFolga.bind(this);*/

        this.createHourOptions = this.createHourOptions.bind(this); 
        this.createTypeOptions = this.createTypeOptions.bind(this);
        this.managerVisbitily = this.managerVisbitily.bind(this);
        
        this.createNew = this.createNew.bind(this);
        this.organizeDate = this.organizeDate.bind(this);
        this.setTypeDayOff = this.setTypeDayOff.bind(this);
        this.check = this.check.bind(this);
        this.construcRows = this.construcRows.bind(this);   
    }

    organizeDate(object) {
        const date = object;
        const array = [];
        array.push(date.getMinutes());
        array.push(date.getHours());
        array.push(date.getDate());
        array.push(Number(date.getMonth()) + 1);
        array.push(date.getFullYear());

        return array;
    }

    onSelect=(e)=>{
        this.setState({
            selectedDate: e,
            checkCalendar: true
        });
    }

    check(array, number) {
        for(let i=0; i<array.length; i++) {
            if(array[i] === number) {
                return true;
            }
        }    
        return false;
    }

    dayDifference(ct, wt) {
        if (ct[4] == wt[4] && ct[3] == wt[3]) {
            let difference = (((wt[2] * 24 * 60) + (wt[1] * 60) + wt[0]) - ((ct[2] * 24 * 60) + ((ct[1] * 60) + ct[0]))) / 60;
            console.log(difference);
            return difference;
        
        } else if (ct[4] == wt[4]) {
            ct[3]++;
            wt[3]++;
            const monthThirty = [4,6,9,11];
            if (ct[3]===2) {
                if(wt[3]===2) {
                    let difference = (((wt[3] * 29 * 24* 60) + (wt[2] * 24 * 60) + (wt[1] * 60) + wt[0]) - 
                                      ((ct[3] * 29 * 24* 60) + (ct[2] * 24 * 60) + ((ct[1] * 60) + ct[0]))) / 60;
                                      console.log(difference);
                                      return difference;
                } else if (this.check(monthThirty, wt[3])) {
                    let difference = (((wt[3] * 30 * 24* 60) + (wt[2] * 24 * 60) + (wt[1] * 60) + wt[0]) - 
                                      ((ct[3] * 29 * 24* 60) + (ct[2] * 24 * 60) + ((ct[1] * 60) + ct[0]))) / 60;
                    
                                      console.log(difference);
                                      return difference;
                }
                else {
                    let difference = (((wt[3] * 31 * 24* 60) + (wt[2] * 24 * 60) + (wt[1] * 60) + wt[0]) - 
                                      ((ct[3] * 29 * 24* 60) + (ct[2] * 24 * 60) + ((ct[1] * 60) + ct[0]))) / 60;
                                      console.log(difference);
                                      return difference;
                }
            } else if (this.check(monthThirty, ct[3])) {
                if(wt[3]===2) {
                    let difference = (((wt[3] * 29 * 24* 60) + (wt[2] * 24 * 60) + (wt[1] * 60) + wt[0]) - 
                                      ((ct[3] * 30 * 24* 60) + (ct[2] * 24 * 60) + ((ct[1] * 60) + ct[0]))) / 60;
                                      console.log(difference);
                                      return difference;
                } else if (this.check(monthThirty, wt[3])) {
                    let difference = (((wt[3] * 30 * 24* 60) + (wt[2] * 24 * 60) + (wt[1] * 60) + wt[0]) - 
                                      ((ct[3] * 30 * 24* 60) + (ct[2] * 24 * 60) + ((ct[1] * 60) + ct[0]))) / 60;
                                      console.log(difference);
                                      return difference;
                }
                else {
                    let difference = (((wt[3] * 31 * 24* 60) + (wt[2] * 24 * 60) + (wt[1] * 60) + wt[0]) - 
                                      ((ct[3] * 30 * 24* 60) + (ct[2] * 24 * 60) + ((ct[1] * 60) + ct[0]))) / 60;
                                      console.log(difference);
                                      return difference;
                }
            } else {
                if(wt[3]===2) {
                    let difference = (((wt[3] * 29 * 24* 60) + (wt[2] * 24 * 60) + (wt[1] * 60) + wt[0]) - 
                                      ((ct[3] * 31 * 24* 60) + (ct[2] * 24 * 60) + ((ct[1] * 60) + ct[0]))) / 60;
                                      console.log(difference);
                                      return difference;
                } else if (this.check(monthThirty, wt[3])) {
                    let difference = (((wt[3] * 30 * 24* 60) + (wt[2] * 24 * 60) + (wt[1] * 60) + wt[0]) - 
                                      ((ct[3] * 31 * 24* 60) + (ct[2] * 24 * 60) + ((ct[1] * 60) + ct[0]))) / 60;
                                      console.log(difference);
                                      return difference;
                }
                else {
                    let difference = (((wt[3] * 31 * 24* 60) + (wt[2] * 24 * 60) + (wt[1] * 60) + wt[0]) - 
                                      ((ct[3] * 31 * 24* 60) + (ct[2] * 24 * 60) + ((ct[1] * 60) + ct[0]))) / 60;
                                      console.log(difference);
                                      return difference;
                }
            }
        }
    }
    
    createHourOptions() {
        const hours =  ['00:00','00:50','01:40','02:30','03:20','04:10','05:00',
                        '05:50','06:40','07:30','08:20','09:10','10:10','11:00',
                        '11:50','12:40','13:30','14:20','15:10','16:20','17:10',
                        '18:00','18:50','19:40','20:30','21:20','17:10','18:00',
                        '23:50'];
        const result = [];
        
        hours.map(function(content, i) {
            result.push(<option className="work-hour" value={i}>{content}</option>);
        });
        
        return result;
    }

    createTypeOptions() {
        const types = ['Folga','Folga por FM','Hora Extra'];
        const result = [];

        types.map(function(content, i) {
            result.push(<option className="dayoff-type" value={i}>{content}</option>)
        });

        return result;
    }


    managerVisbitily() {
        let selectOption = document.querySelector('#select-dayoff');
        let selectOptionValue = selectOption.options[selectOption.selectedIndex].value;
        
        if (selectOptionValue != 2) {
            this.setState({
                visibility: 'none'
            });
        } else {
            this.setState({
                visibility: 'block'
            });
        }
    }

    createNew() {
        /* Set the type of the dayoff chosed by the user */
        let dayOffType = document.querySelector('#select-dayoff');        
        dayOffType = dayOffType.options[dayOffType.selectedIndex].text;    

        /* Set the hour chosed by the user*/
        let workHour = document.querySelector('#select-workhour');
        workHour = workHour.options[workHour.selectedIndex].text;

        /* Set the amount chosed by the user */
        let quantity = document.querySelector('#select-quantity');
        quantity = quantity.value;

        /* Set the manager chosed by the user */
        let manager = document.querySelector('#select-manager');
        manager = manager.options[manager.selectedIndex].value;

        /* Set the comentarie writed by the user*/
        let comentarie = document.querySelector('#comentarie-input');
        comentarie = comentarie.value;

        /* Set the date chosed by the user */
        const dateChosed = this.state.selectedDate;
        const arrayDate= this.organizeDate(dateChosed);
        
        /* Set the today date */
        const todayDate = new Date();
        const arrayTDate = this.organizeDate(todayDate);

        /* Fixing the arrayDate to comport the work hour and minutes */
        workHour = workHour.split(":");
        workHour = workHour.map(Number);
        arrayDate.splice(0, 2, workHour[1], workHour[0]);
        let discriminator = this.dayDifference(arrayDate, arrayTDate);

        this.setTypeDayOff(dayOffType, arrayDate, quantity, manager, comentarie, discriminator);
    }

    setTypeDayOff(type, date, quantity, manager, comentarie, discriminator) {
        if(type === 'Folga') {
            if(date.length !== 5 || quantity == "") {
                alert("Você esqueceu de preencher um dos campos obrigatórios!");
            } else { 
                if(discriminator > 24) {
                    /*  FNC  */
                } else {
                    console.log('Folga')
                    /*  DayOff   */
                }
            }
        } else if(type === 'Hora Extra') {
            if(date.length !== 5 || quantity == "" || manager === "error") {
                alert("Você esqueceu de preencher um dos campos obrigatórios!");
            } else {
                if(discriminator > 120) {
                    console.log('Hora extra nao conforme')
                    /*  EHNC  */
                } else {
                    console.log('Hora extra')
                    /*  Extra Hour  */
                }
            }
        } else if(type === 'Folga por FM') {
            if(date.length !== 5 || quantity == "") {
                alert("Você esqueceu de preencher um dos campos obrigatórios!");
            } else {
                console.log('Folga por forca maior')
                /*  Superior DayOff  */
            }
        } else {
            alert("Você esqueceu de preencher um dos campos obrigatórios!");            
        }

    }
    
    componentWillMount() {
        var contactData = fetch('http://localhost:8000/timecontrol/folgaHEs/', { 
            method: "GET",
            headers: authHeader()
        })
        .then((response) => response.json())
        .then((responseJSON) => {
            this.setState({
                approved: responseJSON.Aprova,
                nApproved: responseJSON.Naprova,
                pending: responseJSON.pendentes  
            })
        });
    }

    componentDidMount() {
        var contactData = fetch('http://localhost:8000/contact/equipe/', { 
            method: "GET",
            headers: authHeader()
        })
        .then((response) => response.json())
        .then((responseJSON) => {
            this.setState({
            })
        });
    }

    construcRows() {
        const dayType = {0: "Folga", 1: "Hora-Extra"};
        console.log(dayType[0])
        let pendingRow = []
        let approvedRow = []
        let nApprovedRow = []

        pendingRow.push(
                <div className="dayoff-info-row">
                    <div className="dayoff-info-completerow" id="complete-row-title">Pendentes</div>
                </div>)
        for(let i=0; i<this.state.pending.length; i++) {
            pendingRow.push(
                <div className="dayoff-info-row">
                    <div className="dayoff-info-title">{dayType[this.state.pending[i].tipo]}</div>
                    <div className="dayoff-info-title">Hora</div>
                    <div className="dayoff-info-title">{this.state.pending[i].data}</div>
                    <div className="dayoff-info-title">{this.state.pending[i].dataPedido}</div>
                    <div className="dayoff-info-title">{this.state.pending[i].quantidade}</div>
                    <div className="dayoff-info-title" 
                        id="show-manager">Gerente
                    </div>
                    <div className="dayoff-info-title"
                        id="show-info"><img className="dayoff-info-img" src={Info}/>
                    </div>
                    <div className="dayoff-info-title"
                        id="show-accept"><img className="dayoff-info-img" src={Done}/>
                    </div>
                    <div className="dayoff-info-title"><img className="dayoff-info-img" src={Delete}/></div>
                </div>)
        }
        nApprovedRow.push(
                <div className="dayoff-info-row">
                    <div className="dayoff-info-completerow" id="complete-row-title">Não aprovadas</div>
                </div>)
        for(let i=0; i<this.state.nApproved.length; i++) {
            nApprovedRow.push(
                <div className="dayoff-info-row">
                    <div className="dayoff-info-title">Tipo</div>
                    <div className="dayoff-info-title">Hora</div>
                    <div className="dayoff-info-title">{this.state.nApproved[i].data}</div>
                    <div className="dayoff-info-title">{this.state.nApproved[i].dataPedido}</div>
                    <div className="dayoff-info-title">{this.state.nApproved[i].quantidade}</div>
                    <div className="dayoff-info-title" 
                        id="show-manager">Gerente
                    </div>
                    <div className="dayoff-info-title"
                        id="show-info"><img className="dayoff-info-img" src={Info}/>
                    </div>
                    <div className="dayoff-info-title"
                        id="show-accept"><img className="dayoff-info-img" src={Done}/>
                    </div>
                    <div className="dayoff-info-title"><img className="dayoff-info-img" src={Delete}/></div>
                </div>)
        }
        approvedRow.push(
                <div className="dayoff-info-row">
                    <div className="dayoff-info-completerow"  id="complete-row-title">Aprovadas</div>
                </div>)
        for(let i=0; i<this.state.approved.length; i++) {
            approvedRow.push(
                <div className="dayoff-info-row">
                    <div className="dayoff-info-title">Tipo</div>
                    <div className="dayoff-info-title">Hora</div>
                    <div className="dayoff-info-title">{this.state.approved[i].data}</div>
                    <div className="dayoff-info-title">{this.state.approved[i].dataPedido}</div>
                    <div className="dayoff-info-title">{this.state.approved[i].quantidade}</div>
                    <div className="dayoff-info-title" 
                        id="show-manager">Gerente
                    </div>
                    <div className="dayoff-info-title"
                        id="show-info"><img className="dayoff-info-img" src={Info}/>
                    </div>
                    <div className="dayoff-info-title"
                        id="show-accept"><img className="dayoff-info-img" src={Done}/>
                    </div>
                    <div className="dayoff-info-title"><img className="dayoff-info-img" src={Delete}/></div>
                </div>)
        }

        let finalArray = pendingRow.concat(nApprovedRow).concat(approvedRow)
        return finalArray;
    }

    render() {
        return (
            <div>
                <h3 className="dayoff-title">Folgas e Horas Extras.</h3>
                <div className="dayoff-grid">
                    <div className="calendar">
                        <h4>Calendário:</h4>
                        <Calendar className="calendario-teste" 
                                date={moment("20/12/1996", "DD/MM/YYYY")} 
                                onChange={this.onSelect}/>
                    </div>
                    <div className="dayoff-options">
                        <h4>Titulo</h4>
                        <div className="dayoff-section">
                            <label>Selecione o tipo:</label>
                            <p><select className="select-option"
                                    id="select-dayoff"
                                    onChange={() => this.managerVisbitily()}>
                                <option className="" 
                                        value="" 
                                        disabled
                                        />
                                {this.createTypeOptions()}
                            </select></p>    
                        </div>
                        <div className="dayoff-section">
                            <label>Selecione um horário:</label>
                            <p><select className="select-option"
                                    id="select-workhour">
                                <option className="" 
                                        value="" 
                                        />
                                {this.createHourOptions()}
                            </select></p>
                        </div>
                        <div className="dayoff-section">
                            <label>Quantidade:</label>
                            <p><input className="select-option"
                                      id="select-quantity"
                                      type="text"/></p>
                        </div>
                        <div className="dayoff-section" 
                            style={{display: this.state.visibility}}>
                            <label>Gerente:</label>
                            <p><select className="select-option"
                                    id="select-manager">
                                    <option className="" 
                                        value="error"
                                        />
                                    <option /* Need to fetch the acronyms from backend*/value="PDK">PDK</option> 
                            </select></p>
                        </div>
                        <div className="dayoff-section" id="select-textbox">
                            <label>Comentário:</label>
                            <p><textarea className="select-option"
                                         id="comentarie-input"
                                         type="text" 
                                         maxLength="300"/></p>
                        </div>
                        <div className="dayoff-section" id="dayoff-button">
                            <button onClick={this.createNew}>OK</button>
                        </div>
                    </div>
                    <div className="dayoff-info">
                        <div className="dayoff-info-row" id="principal-row-title">
                            <div className="dayoff-info-title">Tipo</div>
                            <div className="dayoff-info-title">Hora</div>
                            <div className="dayoff-info-title">Data</div>
                            <div className="dayoff-info-title">Data do Pedido</div>
                            <div className="dayoff-info-title">Quant</div>
                            <div className="dayoff-info-title" 
                                id="show-manager">Gerente
                            </div>
                            <div className="dayoff-info-title"
                                id="show-info">Info
                            </div>
                            <div className="dayoff-info-title"
                                id="show-accept">Aceitar
                            </div>
                            <div className="dayoff-info-title">Deletar</div>
                        </div>
                        {this.state.pending.length > 0 ? this.construcRows() : null}
                    </div>
                </div>
            </div>
        )
    }
}

export default DayOff;
