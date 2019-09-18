import React, {Component} from 'react';

class TeamRow extends Component {
    constructor(props) {
        super(props)

        this.togglePopup = this.togglePopup.bind(this);
        this.renderPopup = this.renderPopup.bind(this);
    }

    render() {
        return(
            <div acronym={this.props.acronym}
                 name={this.props.name}
                 state={this.props.state}
                 data={this.props.data}
                 onClick={}
                 >{this.props.name+'/'+this.props.acronym}
            </div>
        )
    }
}

export default TeamRow;