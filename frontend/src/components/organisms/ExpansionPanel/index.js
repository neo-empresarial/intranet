import React, { Component } from "react";
import classNames from "classnames";
import { bool, string, func } from "prop-types";

import chevron from "../../../components/atoms/icons/chevron-left.svg";

import "./styles.css";

export default class ExpansionPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: null
    };
  }

  componentDidMount() {
    if (this.props.collapsible) {
      this.subsectionHeight = document.getElementById(
        `subsections--${this.props.id}`
      ).scrollHeight;

      if (this.props.collapsed) {
        this.setState({
          height: 0
        });
      } else {
        this.setState({
          height: this.subsectionHeight
        });
      }
    }
  }

  componentWillUpdate(prevProps, prevState) {
    if (prevProps.collapsed !== this.props.collapsed) {
      document.getElementById(`chevron--${this.props.id}`).style =
        "transition: transform 250ms ease";
      const newHeight = prevProps.collapsed ? 0 : this.subsectionHeight;
      this.setState({
        height: newHeight
      });
    }
  }

  render() {
    return (
      <div
        className={classNames("section", {
          "section--selected": this.props.selected
        })}
        id={`section--${this.props.id}`}
      >
        <button
          id={this.props.id}
          onClick={this.props.onClick}
          className={classNames("panel", {
            selected: this.props.selected
          })}
        >
          {!this.props.selected && (
            <img
              id={classNames(`icon--unselected--${this.props.id}`)}
              className={classNames("icon--section")}
              src={this.props.grey_icon}
              alt={`unselected-icon--${this.props.id}`}
            />
          )}
          {this.props.selected && (
            <img
              id={classNames(`icon--selected--${this.props.id}`)}
              className={classNames("icon--section")}
              src={this.props.orange_icon}
              alt={`selected-icon--${this.props.id}`}
            />
          )}
          {this.props.title}
          {this.props.collapsible && (
            <img
              id={`chevron--${this.props.id}`}
              src={chevron}
              alt="chevron--section"
              className={classNames("chevron--section", {
                "chevron--open": !this.props.collapsed,
                "chevron--closed": this.state.collapsed
              })}
            />
          )}
        </button>
        {this.props.collapsible && (
          <div
            id={`subsections--${this.props.id}`}
            className="subsections"
            style={{
              height: this.state.height
            }}
          >
            {this.props.children}
          </div>
        )}
      </div>
    );
  }
}

ExpansionPanel.propTypes = {
  id: string.isRequired,
  title: string.isRequired,
  collapsible: bool.isRequired,
  selected: bool.isRequired,
  collapsed: bool,
  onClick: func.isRequired,
  grey_icon: string,
  orange_icon: string
};
