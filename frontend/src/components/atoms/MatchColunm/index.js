import React from'react';
import './styles.css';

const MatchColunm = props => {

    const Colunm = event => {
        const hours = ['Hora','07:30','08:20','09:10','10:10',
                       '11:00','11:50','12:40','13:30',
                       '14:20','15:10','16:20','17:10',
                       '18:00'];

        const days = ['Segunda-feira','Terca-feira'];
        const acronyms = ['PDK','ATH'];
        const result = [];
        
        const colunm = hours.map(item => {
            result.push(<div className="colunm-cell" id={item}>{item}</div>);
        });
        
        const table = days.map(day => {
            acronyms.map(neoson => {
                hours.map(hour => {
                
                  if(hour === 'Hora') {
                    result.push(<div className={day}>{neoson}</div>);
                  } else {
                    result.push(<div className={day+": "+hour}>{neoson+hour}</div>);
                    }
                });
            });
        });
    
        return result;
    }
    return(
        <div className="colunm-grid"
             id={props.id}
            >{Colunm()}
        </div>
    )
}

export default MatchColunm;


