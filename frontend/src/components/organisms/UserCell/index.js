import React, {Component} from 'react';
import './styles.css';

class UserCell extends Component {
    constructor(props) {
        super(props)

        this.state = {
        }
        
        this.checkElement = this.checkElement.bind(this);
    }

    checkElement(element) {
        if(this.props.value == element) {
            return true;
        } else {
            return false;
        }
    }

    render() {       
        return (   
            <div className="cell-user" style={{backgroundColor: this.props.selectedAcronyms.has(this.props.value) ? '#ff720a' : 'white'}}>
                <label className="user-label" style={{color: this.props.selectedAcronyms.has(this.props.value) ? 'white' : 'black'}}>{this.props.id}
                <input className="myCheck-user"
                        id={this.props.id}
                        value={this.props.value}
                        type="checkbox"
                        onClick={this.props.onClick}                    
                        />
                </label>
            </div>
        )
    }
}

export default UserCell;
