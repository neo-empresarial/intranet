import React, {Component} from "react";
import {connect} from "react-redux";
import "./styles.css";
import uiActions from "../../../_actions/ui.actions";
import authHeader from '../../../_utils/auth-header'
import HourRow from '../../organisms/HourRow';
import AcronymBorder from '../../atoms/AcronymBorder'


const mapStateToProps = state => ({
  sectionSelected: state.ui.sectionSelected,
  subsectionSelected: state.ui.subsectionSelected
});

const mapDispatchToProps = dispatch => ({
  onLoad: () => {
    dispatch(uiActions.selectSection('dashboard'));
    dispatch(uiActions.selectSubsection(''));
  }
});


class TimeControl extends Component {
  constructor(props) {
    super(props);

    this.state= {
      hourData: [],
      NEOSons: [],
      total: []
    }
    this.createRows = this.createRows.bind(this);
    this.sumArray = this.sumArray.bind(this);
  }

  sumArray(array) {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    return array.reduce(reducer)
  }
  
  createRows() {
    const acronyms = ['ATH','BMP','PDK'];
    const dayoff = [0,6,6];
    const xHours = [2,7,5];
    const neoson = ['Aline','Bruno', 'Pedro'];
    const rows = [];

    rows.push(<HourRow acronym="Sigla/Usuario"
                       balance="Saldo"
                       dayoff="Folgas"
                       xhour="Horas Extras"
                       neoson="Nome"
                       id="first-line"/>
                       );
    
    this.state.NEOSons.map(content => {
      content.map((item, index) => {
        if(index==1) {
          rows.push(<HourRow acronym={<AcronymBorder acronym={content[0]} 
                                                    value={item[5]}/>}
                            balance={item[5]}
                            dayoff={item[0]}
                            xhour={item[1]}
                            neoson={content[0]}/>);
                            }});
    })
    
    rows.sort((item1, item2) => {
      return item2.props.balance - item1.props.balance

    })
    
    rows.push(<HourRow acronym={<AcronymBorder acronym="NEO" 
                                              value={this.state.total[4]}/>}
                                              balance={this.state.total[4]}
                                              dayoff={this.state.total[0]}
                                              xhour={this.state.total[1]}
                                              neoson="NEO Empresarial"
                                              id="last-line"/>
                                              );
    
    return rows;
  }

  async componentWillMount() {
    var contactData = await fetch('http://localhost:8000/timecontrol/banco/', { 
            method: "GET",
            headers: authHeader(),
        })
        .then((response) => response.json())
        .then((responseJSON) => {
        // do stuff with responseJSON here...
        this.setState({ NEOSons: responseJSON.bancos,
                        total: responseJSON.total })
        });

  }

  render() {
      return(
          <div className="timecontrol-grid">
          <h3 className="timecontrol-tittle">Banco de Horas</h3>
            {this.createRows()}
          </div>
      )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimeControl);
