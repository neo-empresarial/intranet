import React, {Component} from 'react';
import './style.css';
import Cancel from '../../atoms/icons/cancel-white.svg'

class Popup extends Component {
    render() {
      return (
        <div className='popup'>
            <div className='popup_inner'>
                <div className="popup-grid">
                    <div className="popup-title">
                      <h3>{this.props.text}</h3>
                    </div>
                    <div className="popup-close">
                      <img src={Cancel} onClick={this.props.closePopup}/>
                    </div>
                    <div className="popup-info"><b>Nome:</b>                  {this.props.name}</div>
                    <div className="popup-info"><b>Sigla:</b>                 {this.props.acronym}</div>
                    <div className="popup-info"><b>Gênero:</b>                {this.props.gender}</div>
                    <div className="popup-info"><b>Aniversário:</b>           {this.props.birthday}</div>
                    <div className="popup-info"><b>E-mail Profissional:</b>   {this.props.professional_email}</div>
                    <div className="popup-info"><b>E-mail Pessoal:</b>        {this.props.personal_email}</div>
                    <div className="popup-info"><b>Telefone Profissional:</b> {this.props.professional_contact}</div>
                    <div className="popup-info"><b>Telefone Pessoal:</b>      {this.props.personal_contact}</div>
                    <div className="popup-info"><b>Matrícula:</b>             {this.props.un_id}</div>
                    <div className="popup-info"><b>Banco:</b>                 {this.props.bank}</div>
                    <div className="popup-info"><b>Conta:</b>                 {this.props.account}</div>
                    <div className="popup-info"><b>Agência:</b>               {this.props.agency}</div>
                </div>
            </div>
        </div>
      );
    }
  }

export default Popup;