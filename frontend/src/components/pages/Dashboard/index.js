import React, { Component } from "react";
import { connect } from "react-redux";
import './style.css'
import uiActions from "../../../_actions/ui.actions";
/*import SearchField from "../../organisms/SearchBar";*/
import Chart from "../../organisms/Chart";
import { TextInput } from 'react-native';
import userPhoto from "../../atoms/icons/user-photo.svg";
import authHeader from '../../../_utils/auth-header';
import Technics from '../../atoms/icons/technics.svg';

const mapStateToProps = state => ({
  section: state.ui.sectionSelected,
  subsection: state.ui.sectionSelected
});

const mapDispatchToProps = dispatch => ({
  onLoad: () => {
    dispatch(uiActions.selectSection('dashboard'));
    dispatch(uiActions.selectSubsection(''));
  }
});

class Dashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: '',
      text: '',
      total: [],
      username: '',
      usernameHours: []
    }

  }

  componentDidMount() {
    if (this.props.section !== 'dashboard') {
      this.props.onLoad();
    }
  }

  /*componentWillMount() {
    var userData = fetch('http://localhost:8000/auth/user/', { 
            method: "GET",
            headers: authHeader()
        })
        .then((response) => response.json())
        .then((responseJSON) => {
          this.setState({ username: responseJSON.username});
        });
        console.log('username e' + this.state.username)
    var contactData = fetch('http://localhost:8000/timecontrol/banco/', { 
            method: "GET",
            headers: authHeader(),
        })
        .then((response) => response.json())
        .then((responseJSON) => {
            for(let i=0; i<responseJSON.bancos.length; i++) {
              if(responseJSON.bancos[i][0] == this.state.username) {
                  this.setState({
                    usernameHours: responseJSON.bancos[i]
                  })
              }
            }
          this.setState({ total: responseJSON.total })
        });
  }*/

  render() {
    return (
      <div>
        <h3 className="dashboard-title">Dashboard</h3>
      <div className="grid-container">
        <div className="container-content" id="members">
          <div className="members-content" id="members-title">Membros</div>
          <div className="members-content" id="members-search">
            <TextInput
              className="members-search-bar"
              onChangeText={(text) => this.setState({ text })}/>
          </div>
          <div className="members-content" id="members-board">
            <div value="dfg" style={{ display: "dfg".includes(this.state.text.toLowerCase()) ? '' : 'none' }}>DFG</div>
            <div value="ftt" style={{ display: "ftt".includes(this.state.text.toLowerCase()) ? '' : 'none' }}>FTT</div>
            <div value="gca" style={{ display: "gca".includes(this.state.text.toLowerCase()) ? '' : 'none' }}>GCA</div>
            <div value="jva" style={{ display: "jva".includes(this.state.text.toLowerCase()) ? '' : 'none' }}>JVA</div>
            <div value="lab" style={{ display: "lab".includes(this.state.text.toLowerCase()) ? '' : 'none' }}>LAB</div>
            <div value="lcz" style={{ display: "lcz".includes(this.state.text.toLowerCase()) ? '' : 'none' }}>LCZ</div>
            <div value="lit" style={{ display: "lit".includes(this.state.text.toLowerCase()) ? '' : 'none' }}>LIT</div>
            <div value="mon" style={{ display: "mon".includes(this.state.text.toLowerCase()) ? '' : 'none' }}>MON</div>
            <div value="nir" style={{ display: "nir".includes(this.state.text.toLowerCase()) ? '' : 'none' }}>NIR</div>
            <div value="pdk" style={{ display: "pdk".includes(this.state.text.toLowerCase()) ? '' : 'none' }}>PDK</div>
            <div value="vrn" style={{ display: "vrn".includes(this.state.text.toLowerCase()) ? '' : 'none' }}>VRN</div>
            <div value="yab" style={{ display: "yab".includes(this.state.text.toLowerCase()) ? '' : 'none' }}>YAB</div>
          </div>
        </div>
        <div className="container-content"><img src={Technics}/></div>
        <div className="container-content" id="selfhour">
          <div className="selfhour-content" id="selfhour-title">Seu banco de horas</div>
          <div className="selfhour-content" id="info-grid">
            <div id="img-grid"  style={{backgroundColor: this.state.usernameHours.length > 0 ? this.state.usernameHours[1][5] >= 0 ? '#60c98d' : '#ef7b7b' : '#919191'}}>
              <img src={userPhoto} id="user-photo" onClick={() => alert('clicou')} title="Clique para adicionar uma foto"/>
            </div>
            <div id="selfhour-info">
              <div id="total">Saldo:     {this.state.usernameHours.length > 0 ? this.state.usernameHours[1][5] : ''}</div>
              <div id="dayoff">Folgas:   {this.state.usernameHours.length > 0 ? this.state.usernameHours[1][0] : ''}</div>
              <div id="he">Horas Extras: {this.state.usernameHours.length > 0 ? this.state.usernameHours[1][1] : ''}</div>
            </div>
          </div>
          <div className="selfhour-content" id="selfhour-subtitle">
            <div><span className="circle" style={{ color: 'rgba(201,76,60,0.7)' }} /> Saldo Negativo</div>
            <div><span className="circle" style={{ color: '#919191' }} /> Neutro</div>
            <div><span className="circle" style={{ color: 'rgba(39,174,96,0.7)' }} /> Saldo Positivo</div>
          </div>
        </div>
        <div className="container-content" id="chart">
          <div className="chart-content" id="chart-title">Controle</div>
          <div className="chart-content">
            <Chart teste ={[this.state.total[5], this.state.total[0]]}/>
          </div>
          <div className="chart-content" id="chart-subtitle">
            <div><span className="circle" style={{ color: 'rgba(39,174,96,0.7)' }} /> HE's</div>
            <div><span className="circle" style={{ color: 'rgba(230,126,34,0.7)' }} /> Folgas</div>
            <div><span className="circle" style={{ color: 'rgba(41,128,185,0.7)' }} /> FNC</div>
            <div><span className="circle" style={{ color: 'rgba(201,76,60,0.7)' }} /> HE's NC</div>
            <div><span className="circle" style={{ color: 'rgba(128,128,128,0.6)' }} /> HE's FM</div>
          </div>
        </div>
      </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
