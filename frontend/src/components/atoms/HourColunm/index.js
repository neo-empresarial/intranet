import React from 'react';

const HourColunm = props => {

    function(day) {
        const hours = ['07:30','08:20','09:10','10:10','11:00','11:50','12:40','13:30','14:20',
                       '15:10','16:20','17:10','18:00'];

        hours.map(item => {
            return day + ": " + item;
        })
    }




    return (
        <div>
        </div>
    )
}

export default HourColunm;
 