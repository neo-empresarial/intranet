import React, {Component} from 'react';
import "./style.css";
import EditableCell from '../../atoms/EditCell';

import authHeader from '../../../_utils/auth-header';

class ScheduleGrid extends React.Component {
  constructor(props) {
    super(props);

        this.state = {
            date: new Date(),
        };

        this.setDate = this.setDate.bind(this);
        this.createHourCells = this.createHourCells.bind(this);
        this.createEditCells = this.createEditCells.bind(this);

        this.testPost = this.testPost.bind(this);
    }

    setDate() {
        const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
                            "Julho", "Augusto", "Setembro", "Outubro", "Novembro", 
                            "Dezembro"];
        const date = new Date();
        const day = date.getDate();
        console.log(day)
        var nDay = Number(day);
        nDay = Math.ceil(nDay/7);
        const month = date.getMonth();
        console.log(month);
        const nMonth = monthNames[month];

        return <h4 id="schedule-subtittle">{nMonth + ", " + nDay + "ª semana."}</h4>;

    }

    createHourCells(identificator) {
        const hours = ['Hora','07:30','08:20','09:10','10:10','11:00','11:50','12:40','13:30','14:20',
                       '15:10','16:20','17:10','18:00'];

        var rows = hours.map(content => {
            return <div className={identificator}><b>{content}</b></div>;
        });

        return rows;
    }
    
    createEditCells(weekday) {
        var rows = [] 
        for(var i = 0; i<13; i++) {
            var row = <EditableCell id={weekday+'-'+i}/>
            rows.push(row);
        }

        return rows;
    }
    
    testPost() {
        fetch('http://localhost:8000/timecontrol/editar', {  
            method: 'POST',
            headers: authHeader(), 
            body: JSON.stringify({
                horarios:  [["07:30", , 1, "0", "0"],["07:30", "-", 0, "1", "0"],["07:30", "-", 0, "2", "0"],["07:30", "-", 0, "3", "0"],["07:30", "-", 0, "4", "0"], 
                            ["08:20", "-", 0, "0", "1"], ["08:20", "-", 0, "1", "1"], ["08:20", "-", 0, "2", "1"], ["08:20", "-", 0, "3", "1"], ["08:20", "-", 0, "4", "1"], 
                            ["09:10", "-", 0, "0", "2"], ["09:10", "-", 0, "1", "2"], ["09:10", "-", 0, "2", "2"], ["09:10", "-", 0, "3", "2"], ["09:10", "-", 0, "4", "2"], 
                            ["10:10", "-", 0, "0", "3"], ["10:10", "-", 0, "1", "3"], ["10:10", "-", 0, "2", "3"], ["10:10", "-", 0, "3", "3"], ["10:10", "-", 0, "4", "3"], 
                            ["11:00", "-", 0, "0", "4"], ["11:00", "-", 0, "1", "4"], ["11:00", "-", 0, "2", "4"], ["11:00", "-", 0, "3", "4"], ["11:00", "-", 0, "4", "4"], 
                            ["11:50", "-", 0, "0", "5"], ["11:50", "-", 0, "1", "5"], ["11:50", "-", 0, "2", "5"], ["11:50", "-", 0, "3", "5"], ["11:50", "-", 0, "4", "5"], 
                            ["12:40", "-", 0, "0", "6"], ["12:40", "-", 0, "1", "6"], ["12:40", "-", 0, "2", "6"], ["12:40", "-", 0, "3", "6"], ["12:40", "-", 0, "4", "6"], 
                            ["13:30", "-", 0, "0", "7"], ["13:30", "-", 0, "1", "7"], ["13:30", "-", 0, "2", "7"], ["13:30", "-", 0, "3", "7"], ["13:30", "-", 0, "4", "7"], 
                            ["14:20", "-", 0, "0", "8"], ["14:20", "-", 0, "1", "8"], ["14:20", "-", 0, "2", "8"], ["14:20", "-", 0, "3", "8"], ["14:20", "-", 0, "4", "8"], 
                            ["15:10", "-", 0, "0", "9"], ["15:10", "-", 0, "1", "9"], ["15:10", "-", 0, "2", "9"], ["15:10", "-", 0, "3", "9"], ["15:10", "-", 0, "4", "9"], 
                            ["16:20", "-", 0, "0", "10"], ["16:20", "-", 0, "1", "10"], ["16:20", "-", 0, "2", "10"], ["16:20", "-", 0, "3", "10"], ["16:20", "-", 0, "4", "10"], 
                            ["17:10", "-", 0, "0", "11"], ["17:10", "-", 0, "1", "11"], ["17:10", "-", 0, "2", "11"], ["17:10", "-", 0, "3", "11"], ["17:10", "-", 0, "4", "11"], 
                            ["18:00", "-", 0, "0", "12"], ["18:00", "-", 0, "1", "12"], ["18:00", "-", 0, "2", "12"], ["18:00", "-", 0, "3", "12"], ["18:00", "-", 0, "4", "12"]]
          })
        })
        .then(function (data) {  
          console.log('Request success: ', data);  
        })  
        .catch(function (error) {  
          console.log('Request failure: ', error);  
        });
    }

    render() {
        return (
            <div>
                <h3 id="schedule-title">Meus Horarios</h3>
                {this.setDate()}
                <div className="schedule-grid">
                <div className="weekday">
                        {this.createHourCells('jobTime')}
                    </div>
                    <div>
                        <div className="weekday">
                            <div className="weekday-label"><b>Segunda-feira</b></div>
                            {this.createEditCells('monday')}
                        </div>
                    </div>
                    <div className="weekday-grid">
                        <div className="jobDay-grid">
                            {this.createHourCells('jobTime')}
                        </div>
                        <div className="weekday">
                            <div className="weekday-label"><b>Terça-feira</b></div>
                            {this.createEditCells('tuesday')}
                        </div>
                    </div>
                    <div className="weekday-grid">
                        <div className="jobDay-grid">
                            {this.createHourCells('jobTime')}
                        </div>
                        <div className="weekday">
                            <div className="weekday-label"><b>Quarta-feira</b></div>
                            {this.createEditCells('wednesday')}
                        </div>
                    </div>
                    <div className="weekday-grid">
                        <div className="jobDay-grid">
                            {this.createHourCells('jobTime')}
                        </div>
                        <div className="weekday">
                            <div className="weekday-label"><b>Quinta-feira</b></div>
                            {this.createEditCells('thursday')}
                            </div>
                    </div>
                    <div className="weekday-grid">
                        <div className="jobDay-grid">
                            {this.createHourCells('jobTime')}
                        </div>
                        <div className="weekday">
                            <div className="weekday-label"><b>Sexta-feira</b></div>
                            {this.createEditCells('friday')}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ScheduleGrid;
/*

                    */