import React, { Component } from "react";
import ApiUrls from "../../../_utils/paths"
import "./style.css";

import Select from 'react-select'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import { connect } from "react-redux";
import authHeader from '../../../_utils/auth-header'

import uiActions from "../../../_actions/ui.actions";
import ProfileRow from '../../atoms/ProfileRow';

import userPhoto from "../../atoms/icons/user-photo.svg";
import editWhite from "../../atoms/icons/edit-white.svg";

import defaultChip from "../../atoms/icons/default-chip.svg";
import leaderChip from "../../atoms/icons/leader-chip.svg";
import projectChip from "../../atoms/icons/project-chip.svg";
import marketingChip from "../../atoms/icons/marketing-chip.svg";
import dpChip from "../../atoms/icons/dp-chip.svg";

const mapStateToProps = state => ({
  loggedUser: state.auth.username,
  section: state.ui.sectionSelected,
  subsection: state.ui.subsectionSelected
});

const mapDispatchToProps = dispatch => ({
  onLoad: subsection => {
    dispatch(uiActions.selectSection("equipe"));
    dispatch(uiActions.selectSubsection(subsection));
  }
});
class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      personal: this.props.cardUser === this.props.loggedUser,
      postOfficeLogo: defaultChip,
      username: '',
      contact: [],
      team_member: [],
      usernameHours: [],
      
      // add new ones, review before push
      neoson: [],
      neoPositions: [],
      startDate: null,
      neosonPosition: 0,
      neosonTime: 0
    };

    this.createTableRows = this.createTableRows.bind(this);
    this.subsection = window.location.pathname.split("/").pop();

    this.logoColorHandler = this.logoColorHandler.bind(this);
    this.neoPositionOptions = this.neoPositionOptions.bind(this);
    this.choosePosition = this.choosePosition.bind(this);
  }

  createTableRows() {
    const { neoson } = this.state;
    let result = []
    if (neoson.length !== 0) {
      const tableSubjects = ['Nome/Sigla:',
        'Data de Nascimento:',
        'Gênero:',
        'Curso:',
        'Matrícula:',
        'Email:',
        'Data de Ingresso:',
        ':',
        ':',
        ':',
        ':',
        'CPF:',
        'RG:',
        'Banco:',
        'Agência:',
        'Conta:'];
      const tableSAnswers = [neoson.person.name + " " + neoson.person.surname + ' / ' + neoson.acronym,
      neoson.person.birthday,
      neoson.person.gender,
      neoson.course.course_name,
      neoson.matriculation_code,
      neoson.person.email,
      neoson.join_date,
      neoson.skype,
      neoson.emailProfissional,
      neoson.emailPessoal,
      neoson.telProfissional,
      neoson.person.cpf,
      neoson.person.rg,
      neoson.banco,
      neoson.agencia,
      neoson.conta];
      result = tableSubjects.map((content, index) => {
        return <ProfileRow question={content}
          answer={tableSAnswers[index]}>{content}</ProfileRow>
      });
    }
    return result;
  }

  componentDidMount() {
    Promise.all([
      fetch(`${ApiUrls.api}neoson/1/`, {
        method: "GET",
        headers: authHeader()
      }),
      fetch(`${ApiUrls.api}neo_position/`, {
        method: "GET",
        headers: authHeader()
      })
    ])
    .then(values => Promise.all(values.map(value => value.json())))
    .then(finalVals => {
      this.setState({
        neoson: finalVals[0],
        neoPositions: finalVals[1],
        startdDate: null,
        actualPosition: ""
      })
    })
  }

  componentWillMount() {
    if (
      this.props.section !== "equipe" ||
      this.props.subsection !== this.subsection
    ) {
      this.props.onLoad(this.subsection);
    }
  }

  neoPositionOptions() {
    const { neoson, neoPositions } = this.state;
    const options = []
    
    neoPositions.map((position) => {
      options.push({value: position.id, label: position.name})
    })
    return options
  }

  logoColorHandler() {
    const select = document.querySelector('.post-office-select').value;
    const leader = leaderChip
    const project = projectChip
    const marketing = marketingChip
    const dp = dpChip
    const pattern = defaultChip;

    if (select == 1) {
      document.getElementById("post-office-photo").src = leader;
    } else if (select == 2) {
      document.getElementById("post-office-photo").src = project;
    } else if (select == 4) {
      document.getElementById("post-office-photo").src = marketing;
    } else if (select == 3) {
      document.getElementById("post-office-photo").src = dp;
    } else {
      document.getElementById("post-office-photo").src = pattern;
    }

  }

  handleDateChange = date => {
    this.setState({
      startDate: date
    });
  };

  handleNeosonPositionChange = neosonPosition => {
    this.setState({
      neosonPosition: neosonPosition
    })
  }

  handleNeosonTimeChange = neosonTime => {
    this.setState({
      neosonTime: neosonTime
    })
  }

  choosePosition() {
    const test = "Minha posição é "+this.state.actualPosition+" que iniciou no dia " + this.state.startDate+ " quando e tinha " + this.state.neosonTime + " semestres de casa"
    alert(test)
  }

  render() {
    const positionTime = [
      {value: 1, label: 1},
      {value: 2, label: 2},
      {value: 3, label: 3},
      {value: 4, label: 4},
      {value: 5, label: 5},
      {value: 6, label: 6},
      {value: 7, label: 7},
      {value: 8, label: 8}
    ]
    return (
      <div>
        <h3 className="profile-title">Meu Perfil</h3>
        <div className="profile-grid">
          <div className="profiletable-grid" id="informations"
            id={this.props.id}>
            <div className="profile-subtitle-grid">
              <div className="profile-subtitle" id="profile-subtitle-text">Dados Pessoais</div>
              <div className="profile-subtitle" id="profile-subtitle-button">
                <img title="Editar" src={editWhite} />
              </div>
            </div>
            {this.createTableRows()}
          </div>
          <div className="cards-grid">
            <div id="post-office">
              <h4>Cargo</h4>
              <div>tua mae</div>
              <div className="post-office-container">
                <Select placeholder="Selecione um cargo" 
                        options={this.neoPositionOptions(0)}
                        value={this.state.neosonPosition}
                        onChange={this.handleNeosonPositionChange}/>
              </div>
              <div className="post-office-container">
                <Select placeholder="Selecione o tempo de casa" 
                        options={positionTime}
                        value={this.state.neosonTime}
                        onChange={this.handleNeosonTimeChange}/>
              </div>
              <div className="post-office-container">
                <DatePicker placeholderText="Data de ingresso"
                            selected={this.state.startDate}
                            onChange={this.handleDateChange}
                            dateFormat="MM/yyyy"
                            showMonthYearPicker/>
              </div>
              <div className="post-office-container" id="post-office-button-container">
                <button className="post-office-button"
                        onClick={() => this.choosePosition()}>Confirmar</button>
              </div>


              {/* 
              <div className="post-office-content">
                <div className="post-office-img"><img src={defaultChip} id="post-office-photo" /></div>
                <div className="type-post-office">
                  <select placeholder="Cargo" className="post-office-select" onChange={this.logoColorHandler}>
                    {this.createSelectPositions()}
                  </select>
                  <div>
                    <input placeholder="Semestre" />
                  </div>
                  <div className="accept-post-office">
                    <button>Confirmar</button>
                  </div>
                </div>
                <div className="post-office-subtitle">
                  <div><span className="circle" style={{ color: 'rgb(203,0,0)' }} /> Líder</div>
                  <div><span className="circle" style={{ color: 'rgb(25,55,131)' }} /> Projetos</div>
                  <div><span className="circle" style={{ color: 'rgb(255,114,10)' }} /> Marketing</div>
                  <div><span className="circle" style={{ color: 'rgb(0,73,36)' }} /> Dp</div>
                </div> 
              </div>*/}
            </div>
            <div className="container-content" id="selfhour">
             <h4>Seu banco de horas</h4>
              <div className="selfhour-content" id="info-grid">
                <div id="post-office-img-grid"
                  style={{ backgroundColor: this.state.usernameHours.length > 0 ? this.state.usernameHours[1][5] >= 0 ? '#60c98d' : '#ef7b7b' : '#919191' }}>
                  <img src={userPhoto} id="post-office-user-photo" /></div>
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
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
