import React, {Component} from "react";
import {connect} from "react-redux";
import "./style.css";
import uiActions from "../../../_actions/ui.actions";
import UserCard from '../../atoms/UserCard';
import ProfileRow from '../../atoms/ProfileRow';
import authHeader from '../../../_utils/auth-header'
import loggingInGif from "../../atoms/loading_gif/loggingIn.gif";

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
            usernameHours: []
        };

        this.createTableRows = this.createTableRows.bind(this);
        this.subsection = window.location.pathname.split("/").pop();
    
        this.testeFunc = this.testeFunc.bind(this);
    }
    
    createTableRows() {
        const tableSubjects = ['Nome:/Sigla',
                               'Data: de Nascimento',
                               'Gênero:',
                               'Curso:',
                               'Matrícula:',
                               'País:',
                               'Gmail:',
                               'Skype:',
                               'Email: Profissional:',
                               'Email: Pessoal:',
                               'Tel:. Profissional:',
                               'Tel:. Pessoal:',
                               'RG:','Banco:',
                               'Agência:',
                               'Conta:'];
         const tableSAnswers = [this.state.team_member.nome+'/'+this.state.contact.sigla,
                               this.state.contact.aniversario,
                               this.state.team_member.genero,
                               this.state.contact.curso,
                               this.state.contact.matricula,
                               this.state.team_member.pais,
                               this.state.team_member.gmail,
                               this.state.team_member.skype,
                               this.state.team_member.emailProfissional,
                               this.state.team_member.emailPessoal,
                               this.state.team_member.telProfissional,
                               this.state.team_member.telPessoal,
                               this.state.contact.RG,
                               this.state.contact.banco,
                               this.state.contact.agencia,
                               this.state.contact.conta];
        let result = tableSubjects.map((content, index) => {
            return <ProfileRow question={content}
                               answer={tableSAnswers[index]}>{content}</ProfileRow>
        });

        return result;
    }

    componentDidMount() {
        var userData = fetch('http://localhost:8000/auth/user/', { 
            method: "GET",
            headers: authHeader()
        })
        .then((response) => response.json())
        .then((responseJSON) => {
        // do stuff with responseJSON here...
       this.setState({ username: responseJSON.username});
        });

        var userData = fetch('http://localhost:8000/contact/equipe/', { 
            method: "GET",
            headers: authHeader()
        })
        .then((response) => response.json())
        .then((responseJSON) => {
            for(let i=0; i<responseJSON.ativos.length; i++) {
                if(responseJSON.ativos[i].sigla == this.state.username) {
                    this.setState({
                        contact: responseJSON.ativos[i]
                    })
                    var userData = fetch('http://localhost:8000/contact/contatos/', { 
                        method: "GET",
                        headers: authHeader()
                    })
                    .then((response) => response.json())
                    .then((responseJSON) => {
                        for(let i=0; i<responseJSON.pessoas.length; i++) {
                            if(responseJSON.pessoas[i].id == this.state.contact.id) {
                                this.setState({
                                    team_member: responseJSON.pessoas[i]
                                })
                            }
                        }
                    });
                }
            }
        });
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
        });

    }

    componentWillMount() {
        if (
            this.props.section !== "equipe" ||
            this.props.subsection !== this.subsection
        ) {
            this.props.onLoad(this.subsection);
        }
    }

    testeFunc() {
        const select = document.querySelector('.post-office-select').value;
        const leader = leaderChip
        const project = projectChip 
        const marketing = marketingChip
        const dp = dpChip
        const pattern = defaultChip;


        
        if(select == 1) {
            document.getElementById("post-office-photo").src=leader;
        } 
        else if(select == 2) {
            document.getElementById("post-office-photo").src=project;
        } 
        else if(select == 4) {
            document.getElementById("post-office-photo").src=marketing;
        } 
        else if(select == 3) {
            document.getElementById("post-office-photo").src=dp;
        } 
        else  {
            document.getElementById("post-office-photo").src=pattern;
        }
        
    }

    render() {
        console.log(authHeader())
        return (
            <div>
                <h3 className="profile-title">Meu Perfil</h3>
                <div className="profile-grid">
                    <div className="profiletable-grid" id="informations"
                        id={this.props.id}>
                        <div className="profile-subtitle-grid">
                            <div className="profile-subtitle" id="profile-subtitle-text">Dados Pessoais</div>
                            <div className="profile-subtitle" id="profile-subtitle-button">
                                <img title="Editar" src={editWhite}/>
                            </div>
                        </div>
                        {this.createTableRows()}
                    </div>
                    <div className="cards-grid">
                        <div id="post-office">
                            <h4>Cargo</h4>
                            <div className="post-office-content">
                                <div className="post-office-img"><img src={defaultChip} id="post-office-photo"/></div>
                                <div className="type-post-office">
                                    <select className="post-office-select" onChange={this.testeFunc}>
                                        <option disabled selected>Cargo</option>
                                        <option value="">Apoio do PS 13</option>
                                        <option value="">Calouro 11</option>
                                        <option value="">Executor de Projeto 12</option>
                                        <option value="">Financeiro  6</option>
                                        <option value="">Gerente de Processos 8</option>
                                        <option value="3">AG de Desenv. Pessoal 3</option>
                                        <option value="4">AG de Marketing 4</option>
                                        <option value="2">AG de Projetos 2</option>
                                        <option value="1">Líder 1</option>
                                        <option value="">Palestra 10</option>
                                        <option value="">Processo Seletivo 5</option>
                                        <option value="">Viagem Longa 7</option>
                                        <option value="">Visita Curta 9</option>
                                    </select>
                                    <select className="semester-post-office">
                                        <option disabled selected>Semestre</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                        <option>6</option>
                                        <option>7</option>
                                        <option>8</option>
                                    </select>
                                    <div className="accept-post-office">
                                        <button>Confirmar</button>
                                    </div>
                                </div>
                                <div className="post-office-subtitle">
                                    <div><span className="circle" style={{color: 'rgb(203,0,0)'}}/> Líder</div>
                                    <div><span className="circle" style={{color: 'rgb(25,55,131)'}}/> Projetos</div>
                                    <div><span className="circle" style={{color: 'rgb(255,114,10)'}}/> Marketing</div>
                                    <div><span className="circle" style={{color: 'rgb(0,73,36)'}}/> Dp</div>
                                </div>
                            </div>
                        </div>
                        <div className="container-content" id="selfhour">
                            <div className="selfhour-content" id="selfhour-title">Seu banco de horas</div>
                            <div className="selfhour-content" id="info-grid">
                                <div id="post-office-img-grid" 
                                     style={{backgroundColor: this.state.usernameHours.length > 0 ? this.state.usernameHours[1][5] >= 0 ? '#60c98d' : '#ef7b7b' : '#919191'}}>
                                        <img src={userPhoto} id="post-office-user-photo"/></div>
                                <div id="selfhour-info">
                                    <div id="total">Saldo:     {this.state.usernameHours.length > 0 ? this.state.usernameHours[1][5] : ''}</div>
                                    <div id="dayoff">Folgas:   {this.state.usernameHours.length > 0 ? this.state.usernameHours[1][0] : ''}</div>
                                    <div id="he">Horas Extras: {this.state.usernameHours.length > 0 ? this.state.usernameHours[1][1] : ''}</div>
                                </div>
                            </div>
                            <div className="selfhour-content" id="selfhour-subtitle">
                                <div><span className="circle" style={{color: 'rgba(201,76,60,0.7)'}}/> Saldo Negativo</div>
                                <div><span className="circle" style={{color: '#919191'}}/> Neutro</div>
                                <div><span className="circle" style={{color: 'rgba(39,174,96,0.7)'}}/> Saldo Positivo</div>
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
