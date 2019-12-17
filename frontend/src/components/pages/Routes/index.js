import React, {Component} from 'react';
import {Router, Route, Redirect, Switch} from 'react-router-dom';
import {connect} from 'react-redux';

import history from '../../../_utils/history';
import authServices from '../../../_services/auth.service';

import PrivateRoute from './PrivateRoute';

import alertActions from '../../../_actions/alert.actions';

import LoginPage from '../LoginPage';
import Dashboard from '../Dashboard';

import NotFound from '../NotFound';
import authActions from '../../../_actions/auth.actions';
import userActions from '../../../_actions/user.actions';

/* Team */
import Profile from '../Profile';
import Members from '../Members';

/* Cronograma */
import TimeControl from '../TimeControl';
import TeamSchedule from '../TeamSchedule';
import MatchHours from '../MatchHours';
import ScheduleGrid from '../Schedule';
import DayOff from '../DayOff';

const mapStateToProps = state => ({
    alert: state.ui,
    section: state.ui.sectionSelected,
    verified: state.auth.verifiedAuth,
    subsection: state.ui.subsectionSelected,
    registered: state.user.finishedRegistration,
    username: state.auth.username
});

const mapDispatchToProps = dispatch => ({
    clearAlerts: () => {
        dispatch(alertActions.clear());
    },
    requireAuth: () => {
        dispatch(authActions.verifyAuth());
    },
    verifyUserRegistered: () => {
        dispatch(userActions.verifyUserRegistered());
    }
});

class ProjectRoutes extends Component {
    componentDidMount() {
        this.props.requireAuth();
        window.onload = this.props.clearAlerts();
    }

    render() {
        return (
            <div className="main">
                <Router history={history}>
                    <Switch>
                        <Route
                            exact
                            path="/login"
                            render={props =>
                                !this.props.verified ? (
                                    <LoginPage/>
                                ) : (
                                    <Redirect to="dashboard"/>
                                    // <LoginPage />
                                )
                            }
                        />
                        {/* Dashboard must be loaded on root, if user is logged in */}
                        <PrivateRoute
                            exact
                            path="/"
                            component={() =>
                                this.props.registered ? (
                                    <Redirect to={'dashboard'}/>
                                ) : (
                                    <Redirect to={'equipe/meu_perfil'}/>
                                )
                            }
                        />
                        <PrivateRoute
                            exact
                            path="/dashboard"
                            component={() => <Dashboard/>}
                        />
                        {/* 'Equipe' section */}
                        <PrivateRoute
                            exact
                            path="/equipe/meu_perfil"
                            component={() => <Profile cardUser={this.props.username}/>}
                        />
                        <PrivateRoute
                            exact
                            path="/equipe/membros"
                            component={() => <Members cardUser={this.props.username}/>}
                        />
                        {/* 'Cronograma' section */}
                        <PrivateRoute
                            exact
                            path="/cronograma/banco_de_horas"
                            component={() => <TimeControl cardUser={this.props.username}/>}
                        />
                        <PrivateRoute
                            exact
                            path="/cronograma/visualizar_horarios"
                            component={() => <TeamSchedule cardUser={this.props.username}/>}
                        />
                        <PrivateRoute
                            exact
                            path="/cronograma/horarios_em_comum"
                            component={() => <MatchHours cardUser={this.props.username}/>}
                        />
                        <PrivateRoute
                            exact
                            path="/cronograma/editar_grade"
                            component={() => <ScheduleGrid cardUser={this.props.username}/>}
                        />
                        <PrivateRoute
                            exact
                            path="/cronograma/folgas_he"
                            component={() => <DayOff cardUser={this.props.username}/>}
                        />
                        <PrivateRoute component={() => <NotFound/>}/>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectRoutes);
