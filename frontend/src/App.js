import React, { Component } from "react";

import ProjectRoutes from "./components/pages/Routes";

import { connect } from "react-redux";

import "./components/templates/default/styles.css";
import uiActions from "./_actions/ui.actions";

const mapStateToProps = state => ({
  responsive: state.ui.responsive,
  drawerOpen: state.ui.drawerOpen,
  sectionSelected: state.ui.sectionSelected,
  sectionRotated: state.ui.sectionRotated
});

const mapDispatchToProps = dispatch => ({
  setResponsive: bool => {
    dispatch(uiActions.setResponsive(bool));
  },
  toggleDrawer: () => {
    dispatch(uiActions.toggleDrawer());
  },
  clearRotated: (sectionSelected = "", sectionRotated = "") => {
    if (sectionSelected !== sectionRotated) {
      dispatch(uiActions.rotateSection(""));
    }
  }
});
class App extends Component {
  constructor(props) {
    super(props);

    this.updateDimensions = this.updateDimensions.bind(this);
  }

  updateDimensions(event) {
    if (window.innerWidth <= 640 || (window.innerWidth >= 850 && window.innerWidth <=960)) {
      !this.props.responsive && this.props.setResponsive(true);
      if (this.props.drawerOpen) {
        setTimeout(() => {
          if (this.props.sectionRotated !== this.props.sectionSelected) {
            this.props.clearRotated(
              this.props.sectionSelected,
              this.props.sectionRotated
            );
          }
        }, 260);
        this.props.toggleDrawer();
      }
    } else {
      this.props.responsive && this.props.setResponsive(false);
      !this.props.drawerOpen && this.props.toggleDrawer();
    }
  }

  componentDidMount() {
    if (window.innerWidth < 1000) {
      this.props.setResponsive(true);
    } else {
      this.props.drawerOpen || this.props.toggleDrawer();
    }
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillMount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  render() {
    return <ProjectRoutes />;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
