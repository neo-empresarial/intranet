import React, {Component} from 'react';
import "./style.css";

import pencilEdit from "../../atoms/icons/pencil-edit-button.svg";

const EditableCell= props => {
    const EditCell = event => {
        const cell = document.getElementById(props.id);
        if (cell.readOnly === false) {
            cell.readOnly = true;
            cell.blur();
            cell.value = cell.value.toUpperCase();
            if (
                cell.value === 'NEO+' ||
                cell.value === 'NEO-' ||
                cell.value === 'NEO'
            ) {
                cell.style.color = '#ff720a';
                cell.textContent = cell.value;
            } else {
                cell.style.color = 'black';
                cell.textContent = cell.value;
            }
        } else {
            /* Has to submit the value if the user not press enter*/

            cell.readOnly = false;
            cell.focus();
        }

        
    };

var handleKeyPress = (e) => {
    if (e.key === 'Enter') {
        console.log('do validate');
    }
}
    
    return (
        <div className="edit-cell">
            <input
                className="edit-input"
                autocomplete="off"
                maxLength="8"
                readOnly
                type="text"
                onKeyPress={event => {
                    if (event.key === 'Enter') {
                      EditCell()
                    }}}
                name={`${props.hour}, ${props.weekday}`}
                id={props.id}
            />
            <div className="edit-button"
                 onClick={EditCell}>
                <img src={pencilEdit}/>
            </div>
        </div>
    )
};

export default EditableCell;