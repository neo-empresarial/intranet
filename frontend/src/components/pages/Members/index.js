import React, { Component } from 'react';
import "./style.css";
import Popup from "../../organisms/PopUp";

import authHeader from '../../../_utils/auth-header'
import { TextInput } from 'react-native';
import searchIcon from "../../atoms/icons/searching-magnifying-glass.svg";

class Members extends Component {
    constructor(props) {
        super(props)

        this.state = {
            value: '',
            text: '',
            view: 'neo',
            showPopup: '',
            team: [],
            people: [],
            userDict: [],
            data: {
                name: 'Pedro',
                acronym: 'PDK',
                personal_email: 'pedro.kretz@gmail.com',
                professional_email: 'pdk@neo.ufsc.br',
                personal_contact: '(47) 99680-3884',
                professional_contact: '(47) 99680-3884'
                }
        }

        this.changeViewState = this.changeViewState.bind(this);
        this.togglePopup = this.togglePopup.bind(this);
        this.createNeoRows = this.createNeoRows.bind(this);
        this.createPopUps = this.createPopUps.bind(this);
    }

    componentDidMount() {
        var userData = fetch('http://localhost:8000/contact/equipe/', { 
            method: "GET",
            headers: authHeader()
        })
        .then((response) => response.json())
        .then((responseJSON) => {
            let userDict = {}
            for(let i=0; i<responseJSON.ativos.length; i++) {
                userDict[responseJSON.ativos[i].sigla] = responseJSON.ativos[i].id
            }
            this.setState({ 
                team: responseJSON.ativos,
                userDict: [userDict]
            });
        });

        var userData = fetch('http://localhost:8000/contact/contatos/', { 
            method: "GET",
            headers: authHeader()
        })
        .then((response) => response.json())
        .then((responseJSON) => {
            this.setState({ 
                people: responseJSON.pessoas,
            });
        });
    }

    changeViewState(origin) {
        if(origin === 'neo') {
            this.setState({ view: 'neo'});
        } 
        else if(origin === 'alumni') {
            this.setState({ view: 'alumni'});
        }
    }

    togglePopup(acronym) {
        if(this.state.showPopup == '') {
            this.setState({ showPopup: acronym });
        } else {
            this.setState({ showPopup: '' });
        }
    }
    
    createNeoRows() {
        /*const neosons = ['DFG','FTT','GCA','JVA',
                         'LAB','LCZ','LIT','MON',
                         'NIR','PDK','VRN','YAB'];
*/
        let neosons = []
        for(let i=0; i<this.state.team.length; i++) {
            neosons.push(this.state.team[i].sigla)
        }      
        let result = neosons.map((content, index) => {
            return <div value={content} 
                        key={index} 
                        onClick={() => this.togglePopup(content)}
                        style={{ display: content.toLocaleLowerCase().includes(this.state.text.toLowerCase()) ? '' : 'none' }}>{content}</div>
        })
        
        return result;
    }

    createPopUps() {
        let popUps = [];
        const userDict = this.state.userDict[0]
        for(let i=0; i<this.state.team.length; i++) {
            popUps.push(
                <div>
                    {this.state.showPopup == this.state.team[i].sigla ? 
                        (<Popup
                            text="Informações"
                            closePopup={this.togglePopup.bind(this)}
                            name={this.state.people[userDict[this.state.team[i].sigla]-1].nome}
                            acronym={this.state.team[i].sigla}
                            gender={this.state.people[userDict[this.state.team[i].sigla]-1].genero}
                            birthday={this.state.team[i].aniversario}
                            professional_email={this.state.people[userDict[this.state.team[i].sigla]-1].emailProfissional}
                            personal_email={this.state.people[userDict[this.state.team[i].sigla]-1].emailPessoal}
                            professional_contact={this.state.people[userDict[this.state.team[i].sigla]-1].telPessoal}
                            personal_contact={this.state.people[userDict[this.state.team[i].sigla]-1].telProfissional}
                            un_id={this.state.team[i].matricula}
                            bank={this.state.team[i].banco}
                            account={this.state.team[i].conta}
                            agency={this.state.team[i].agencia}
                        />
                    ) : ( 
                        null)
                    }
                </div>
            )
        }
        return popUps;
    }


    render() {
        console.log(this.state.people)
        return (
            <div id="height-limit">
                <h3 className="team-member-title">Membros</h3>
                <div className="team-member-grid">
                    <div id="team-member-buttons-grid">
                        <button onClick={() => this.changeViewState('neo')} className="select-tab"
                                style={{backgroundColor: this.state.view == 'neo' ? 'rgba(239,99,22,1)' : 'rgba(239,99,22,0.4)'}}
                                ><b>Equipe Atual</b>
                        </button>
                        <button onClick={() => this.changeViewState('alumni')} className="select-tab"
                                style={{backgroundColor: this.state.view == 'alumni' ? 'rgba(239,99,22,1)' : 'rgba(239,99,22,0.4)'}}
                                ><b>Alumni</b>
                        </button>
                    </div>
                    <div id="team-members-search">
                        <TextInput className="team-members-search-bar"
                                   onChangeText={(text) => this.setState({ text })}
                        />
                    </div>
                    <div className="team-member-table-grid">
                        <div className="team-member-table-header"><b>Nomes</b></div>
                        <div className="team-member-table" id="neoson-member-table"
                             style={{display: this.state.view == 'neo' ? '' : 'none'}}>
                            {this.createNeoRows()}
                        </div>
                        <div className="team-member-table" id="alumni-member-table"
                             style={{display: this.state.view == 'alumni' ? 'grid' : 'none'}}>
                            <div>Alumni 1</div>
                            <div>Alumni 2</div>
                            <div>Alumni 3</div>
                            <div>Alumni 4</div>
                            <div>Alumni 5</div>
                            <div>Alumni 6</div>
                            <div>Alumni 1</div>
                            <div>Alumni 2</div>
                            <div>Alumni 3</div>
                            <div>Alumni 4</div>
                            <div>Alumni 5</div>
                            <div>Alumni 6</div>
                            <div>Alumni 1</div>
                            <div>Alumni 2</div>
                            <div>Alumni 3</div>
                            <div>Alumni 4</div>
                            <div>Alumni 5</div>
                            <div>Alumni 6</div>
                        </div>
                    {this.createPopUps()}
                    </div>
                </div>
            </div>
        )
    }
}

export default Members;
/*
name
acronym
gender
birthday
professional_email
personal_email
professional_contact
personal_contact
personal_contact
bank
account
agency
*/