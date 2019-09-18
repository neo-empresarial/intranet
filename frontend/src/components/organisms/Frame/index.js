import React, { Component } from 'react';
import {} from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import './styles.css';

import uiActions from '../../../_actions/ui.actions';
import authActions from '../../../_actions/auth.actions';

import ExpansionPanel from '../ExpansionPanel';

import history from '../../../_utils/history';

import logoNEO from '../../atoms/logos/logo-neo.png';
import logout from '../../atoms/icons/wireframes-26.svg';
import chevronLeft from '../../atoms/icons/chevron-left.svg';
import menu from '../../atoms/icons/menu.svg';
import unselected_dashboard_icon from '../../atoms/icons/dashboard-gray-24.svg';
import selected_dashboard_icon from '../../atoms/icons/dashboard-orange-24.svg';
import unselected_profile_icon from '../../atoms/icons/perfil-gray-27.svg';
import selected_profile_icon from '../../atoms/icons/perfil-orange-27.svg';
import unselected_schedule_icon from '../../atoms/icons/cronograma-gray-23.svg';
import selected_schedule_icon from '../../atoms/icons/cronograma-orange-23.svg';
import unselected_projects_icon from '../../atoms/icons/projetos-gray-21.svg';
import selected_projects_icon from '../../atoms/icons/projetos-orange-21.svg';
import unselected_seminars_icon from '../../atoms/icons/seminarios-gray-22.svg';
import selected_seminars_icon from '../../atoms/icons/seminarios-orange-22.svg';
import unselected_team_icon from '../../atoms/icons/equipe-gray-22.svg';
import selected_team_icon from '../../atoms/icons/equipe-orange-22.svg';

const mapStateToProps = state => ({
  drawerOpen: state.ui.drawerOpen,
  sectionSelected: state.ui.sectionSelected,
  subsectionSelected: state.ui.subsectionSelected,
  sectionRotated: state.ui.sectionRotated,
  responsive: state.ui.responsive
});

const mapDispatchToProps = dispatch => ({
  handleSectionClick: (
    event,
    collapsible = false,
    rotated = '',
    selected = ''
  ) => {
    const id = event.target.id.split('--').pop();

    const newRotated = rotated === id ? '' : id;

    if (!collapsible) {
      dispatch(uiActions.selectSection(id));
      dispatch(uiActions.selectSubsection(''));
      dispatch(uiActions.rotateSection(''));
      history.push(`/${id}`);
    } else {
      dispatch(uiActions.rotateSection(newRotated));
    }
  },

  handleSubsectionClick: (
    event,
    selectedSection = '',
    selectedSubsection = ''
  ) => {
    const id = event.target.id.split('--');

    if (id[0] !== selectedSection) {
      dispatch(uiActions.selectSection(id[1]));
    }
    if (id[1] !== selectedSubsection) {
      dispatch(uiActions.selectSubsection(id[0]));
      history.push(`/${id[1]}/${id[0]}`);
    }
  },

  handleLogout: event => {
    event.preventDefault();
    dispatch(authActions.logout());
  },

  toggleDrawer: () => {
    dispatch(uiActions.toggleDrawer());
  },
  clearRotated: (sectionSelected = '', sectionRotated = '') => {
    if (sectionSelected !== sectionRotated) {
      dispatch(uiActions.rotateSection(''));
    }
  }
});

class Frame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: true,
      width: 0
    };

    this.x = 0;

    this.translate = 0;

    this._onTouchStart = this._onTouchStart.bind(this);
    this._onTouchMove = this._onTouchMove.bind(this);
    this._onTouchEnd = this._onTouchEnd.bind(this);

    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
  }

  componentDidMount() {
    this.translate = this.props.drawerOpen ? 0 : -240;

    document.getElementById('drawer-paper').style = `transform: translateX(${
      this.translate
    }px)`;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.width !== prevState.width) {
      if (this.state.width !== 0) {
        if (this.state.width > 0) {
          this.translate =
            Math.abs(this.state.width) < 240 ? this.state.width - 240 : 0;
        } else {
          this.translate =
            Math.abs(this.state.width) < 240 ? this.state.width : 0;
        }

        document.getElementById(
          'drawer-paper'
        ).style = `transform: translateX(${this.translate}px)`;
      }
    }

    if (this.props.drawerOpen !== prevProps.drawerOpen) {
      this.translate = this.props.drawerOpen ? 0 : -240;

      document
        .getElementById('drawer-paper')
        .setAttribute(
          'style',
          `transition: transform 500ms ease; transform: translateX(${
            this.translate
          }px)`
        );

      document.getElementById('appbar').style =
        'transition: width 500ms ease-out';

      document.getElementById('content').style =
        'transition: width 500ms ease-out';

      setTimeout(() => {
        document.getElementById('appbar').removeAttribute('style');
        document.getElementById('content').removeAttribute('style');
      }, 500);
    }
  }

  handleDrawerClose() {
    setTimeout(
      () =>
        this.props.clearRotated(
          this.props.sectionSelected,
          this.props.sectionRotated
        ),
      250
    );
    this.props.toggleDrawer();
  }

  handleDrawerOpen() {
    this.props.toggleDrawer();
  }

  _onTouchStart(event) {
    const touch = event.touches[0];
    this.x = touch.clientX;
  }

  _onTouchMove(event) {
    if (event.changedTouches && event.changedTouches.length) {
      const touch = event.changedTouches[0];
      const width = touch.clientX - this.x;

      const { drawerOpen } = this.props;

      if (
        (this.x < 20 && width > 0 && !drawerOpen) ||
        ((this.x < 260 || this.x > 220) && width < 0 && drawerOpen)
      ) {
        this.setState({
          width: width
        });
      }
    }
  }

  _onTouchEnd(event) {
    if (Math.abs(this.state.width) > 80) {
      if (this.props.drawerOpen) {
        this.translate = -240;
        this.handleDrawerClose();
      } else {
        this.translate = 0;
        this.handleDrawerOpen();
      }
    } else {
      this.translate = this.props.drawerOpen ? 0 : -240;

      document
        .getElementById('drawer-paper')
        .setAttribute(
          'style',
          `transition: transform 500ms ease; transform: translateX(${
            this.translate
          }px)`
        );
    }

    this.setState({
      width: 0
    });
  }

  render() {
    return (
      <div
        onTouchStart={this._onTouchStart}
        onTouchMove={this._onTouchMove}
        onTouchEnd={this._onTouchEnd}
        className={classNames('app-frame')}>
        <div
          id="appbar"
          className={classNames('appbar', {
            'appbar--shift': !this.props.responsive
          })}>
          {this.props.responsive && (
            <button
              onClick={this.handleDrawerOpen}
              className={classNames('button--menu', {
                hide: this.props.drawerOpen
              })}>
              <img src={menu} alt="menu" />
            </button>
          )}
          <button onClick={this.props.handleLogout} className="button--logout">
            <img src={logout} alt="logout" />
          </button>
        </div>
        <div
          id="drawer-paper"
          className={classNames('drawer-paper', {
            'drawer-paper--close': !this.props.drawerOpen
          })}>
          <div className={classNames('drawer--header')}>
            <a
              href="https://neo.ufsc.br/"
              target="_blank"
              rel="noopener noreferrer">
              <img src={logoNEO} alt="logo--neo" />
            </a>
            {this.props.responsive && (
              <button
                className="button--chevron"
                onClick={this.handleDrawerClose}>
                <img src={chevronLeft} alt="chevron--left" />
              </button>
            )}
          </div>
          <div className={classNames('drawer--sections')}>
            <ExpansionPanel
              id="dashboard"
              title="Dashboard"
              collapsible={false}
              onClick={this.props.handleSectionClick}
              selected={this.props.sectionSelected === 'dashboard'}
              grey_icon={unselected_dashboard_icon}
              orange_icon={selected_dashboard_icon}
            />
            <ExpansionPanel
              id="equipe"
              title="Equipe"
              collapsible={true}
              grey_icon={unselected_team_icon}
              orange_icon={selected_team_icon}
              onClick={event =>
                this.props.handleSectionClick(
                  event,
                  true,
                  this.props.sectionRotated,
                  this.props.sectionSelected
                )
              }
              collapsed={this.props.sectionRotated !== 'equipe'}
              selected={this.props.sectionSelected === 'equipe'}>
              <p
                id="membros--equipe"
                onClick={this.props.handleSubsectionClick}
                className={classNames('subsection', {
                  'subsection--selected':
                    this.props.subsectionSelected === 'membros'
                })}>
                Membros
              </p>
              <p
                id="meu_perfil--equipe"
                onClick={this.props.handleSubsectionClick}
                className={classNames('subsection', {
                  'subsection--selected':
                    this.props.subsectionSelected === 'meu_perfil'
                })}>
                Meu perfil
              </p>
            </ExpansionPanel>
            <ExpansionPanel
              id="cronograma"
              title="Horários"
              collapsible={true}
              grey_icon={unselected_schedule_icon}
              orange_icon={selected_schedule_icon}
              onClick={event =>
                this.props.handleSectionClick(
                  event,
                  true,
                  this.props.sectionRotated,
                  this.props.sectionSelected
                )
              }
              collapsed={this.props.sectionRotated !== 'cronograma'}
              selected={this.props.sectionSelected === 'cronograma'}>
              <p
                id="banco_de_horas--cronograma"
                section="cronograma"
                onClick={this.props.handleSubsectionClick}
                className={classNames('subsection', {
                  'subsection--selected':
                    this.props.subsectionSelected === 'banco_de_horas'
                })}>
                Banco de horas
              </p>
              <p
                id="visualizar_horarios--cronograma"
                section="cronograma"
                onClick={this.props.handleSubsectionClick}
                className={classNames('subsection', {
                  'subsection--selected':
                    this.props.subsectionSelected === 'visualizar_horarios'
                })}>
                Visualizar horários
              </p>
              <p
                id="horarios_em_comum--cronograma"
                section="cronograma"
                onClick={this.props.handleSubsectionClick}
                className={classNames('subsection', {
                  'subsection--selected':
                    this.props.subsectionSelected === 'horarios_em_comum'
                })}>
                Horários em comum
              </p>
              <p
                id="editar_grade--cronograma"
                section="cronograma"
                onClick={this.props.handleSubsectionClick}
                className={classNames('subsection', {
                  'subsection--selected':
                    this.props.subsectionSelected === 'editar_grade'
                })}>
                Editar grade
              </p>
              <p
                id="folgas_he--cronograma"
                section="cronograma"
                onClick={this.props.handleSubsectionClick}
                className={classNames('subsection', {
                  'subsection--selected':
                    this.props.subsectionSelected === 'folgas_he'
                })}>
                Folgas e H.E.
              </p>
            </ExpansionPanel>
            <ExpansionPanel
              id="projetos"
              title="Projetos"
              collapsible={false}
              grey_icon={unselected_projects_icon}
              orange_icon={selected_projects_icon}
              onClick={this.props.handleSectionClick}
              selected={this.props.sectionSelected === 'projetos'}
            />
            <ExpansionPanel
              id="seminarios"
              title="Seminários"
              collapsible={false}
              grey_icon={unselected_seminars_icon}
              orange_icon={selected_seminars_icon}
              onClick={this.props.handleSectionClick}
              selected={this.props.sectionSelected === 'seminarios'}
            />
          </div>
        </div>
        {this.props.responsive && (
          <div id="responsive--layer">
            <div
              id="content"
              className={classNames('content', {
                'content--shift': !this.props.responsive
              })}>
              {this.props.children}
            </div>
          </div>
        )}
        {this.props.responsive || (
          <div
            id="content"
            className={classNames('content', {
              'content--shift': !this.props.responsive
            })}>
            {this.props.children}
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Frame);
