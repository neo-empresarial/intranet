import React, {Component} from 'react';
import "./style.css";

class EditTable extends React.Component {
    render() {
        return (
            <div>
                <table className="meuperfil">
                    <tbody>
                    <tr>
                        <td className="information">Nome/Sigla</td>
                        <td className="answer"><input type="text"></input></td>
                    </tr>
                    <tr>
                        <td className="information">Data de Nascimento</td>
                        <td className="answer"><input></input></td>
                    </tr>
                    <tr>
                        <td className="information">Gênero</td>
                        <td className="answer"><input type="text"></input></td>
                    </tr>
                    <tr>
                        <td className="information">Curso</td>
                        <td className="answer"><input type="text"></input></td>
                    </tr>
                    <tr>
                        <td className="information">Matrícula</td>
                        <td className="answer"><input type="text"></input></td>
                    </tr>
                    <tr>
                        <td className="information">País</td>
                        <td className="answer"><input type="text"></input></td>
                    </tr>
                    <tr>
                        <td className="information">Gmail</td>
                        <td className="answer"><input type="text"></input></td>
                    </tr>
                    <tr>
                        <td className="information">Skype</td>
                        <td className="answer"><input type="text"></input></td>
                    </tr>
                    <tr>
                        <td className="information">Email Profissional</td>
                        <td className="answer"><input type="text"></input></td>
                    </tr>
                    <tr>
                        <td className="information">Email Pessoal</td>
                        <td className="answer"><input type="text"></input></td>
                    </tr>
                    <tr>
                        <td className="information">Tel. Profissional</td>
                        <td className="answer"><input type="text"></input></td>
                    </tr>
                    <tr>
                        <td className="information">Tel. Pessoal</td>
                        <td className="answer"><input type="text"></input></td>
                    </tr>
                    <tr>
                        <td className="information">RG</td>
                        <td className="answer"><input type="text"></input></td>
                    </tr>
                    <tr>
                        <td className="information">Banco</td>
                        <td className="answer"><input type="text"></input></td>
                    </tr>
                    <tr>
                        <td className="information">Agência</td>
                        <td className="answer"><input type="text"></input></td>
                    </tr>
                    <tr>
                        <td className="information">Conta</td>
                        <td className="answer"><input type="text"></input></td>
                    </tr>
                    </tbody>
                </table>
                <button
                    className="cancel"
                    type="onCLick"
                >Cancelar
                </button>
                <button
                    className="confirm"
                    type="OnClick"
                >Ok
                </button>
            </div>
        )
    }
}

export default EditTable;