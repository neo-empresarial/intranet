import React, { Component } from "react";

/* Material-UI components */
import { IconButton } from "@material-ui/core";

const HeaderButton = ({ component: Component, onClick }) => {
  return (
    <IconButton size="small">
      <Component fontSize="small" onClick={onClick} />
    </IconButton>
  );
};

export default HeaderButton;
