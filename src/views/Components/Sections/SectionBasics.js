import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import SettingsIcon from '@material-ui/icons/Settings';

// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.js";

const useStyles = makeStyles(styles);

export default function SectionBasics() {
  const classes = useStyles();
 
  return (
    <div className={classes.sections}>
      <div className={classes.container}>
        <div className={classes.title}>
          <h2>Basic Elements</h2>
        </div>
        <div id="buttons">
          <div className={classes.title}>
            <h3>
            Often use
              <br />
              <small>Backend</small>
            </h3>
          </div>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={8}>
              <Button color="primary" round>
                <Favorite className={classes.icons} /> PHP
              </Button>
              <Button color="danger">PYTHON</Button>
              <Button size="sm" color="rose">NODEJS</Button>
            </GridItem>
          </GridContainer>
          <div className={classes.title}>
            <h3>
              <small>Frontend</small>
            </h3>
          </div>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={8}>
              <Button size="sm">
                Css
              </Button>
              <Button color="primary">React JS</Button>
              <Button color="warning" size="lg">
                JQuery
              </Button>
            </GridItem>
          </GridContainer>
          <div className={classes.title}>
            <h3>
              <small>General tools <SettingsIcon /></small>
            </h3>
          </div>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={8}>
              <Button color="primary">GIT</Button>
              <Button color="info">DOCKER</Button>
              <Button color="success">BASH</Button>
              <Button color="warning">MACOS</Button>
              <Button color="rose">VSCODE</Button>
              <Button>PHPSTORM</Button>
              <br/>
              <Button size="sm"  color="info" round>PRO TOOLS</Button>
              <Button size="sm" color="primary" round> <Favorite className={classes.icons} /> ABLETON</Button>
              <Button size="sm" color="rose" round>LOGIC PRO</Button>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
