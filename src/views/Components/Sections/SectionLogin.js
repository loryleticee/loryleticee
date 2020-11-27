import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import People from "@material-ui/icons/People";
import Email from "@material-ui/icons/Email";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import TextField from '@material-ui/core/TextField'
import { useToasts } from 'react-toast-notifications'

import styles from "assets/jss/material-kit-react/views/componentsSections/loginStyle.js";

const useStyles = makeStyles(styles);

export default function SectionLogin() {
  const classes = useStyles();
  const { addToast } = useToasts()
  const initValues = {
    first: 't',
    email: 'f',
    message: 'e'
  }

  const [values, setValues] = useState(initValues)
  const [errEmail, setErrEmail] = useState(false)
  const [errName, setErrName] = useState(false)
  const [errMessage, setErrMessage] = useState(false)
  const [showSpinner, setshowSpinner] = useState(false)

  const errorApi = () => RegExp(/Error/)

  const onKeyUp = (event) => {
    if (event.keyCode === 13) {
      catchSubmit(event)
    }
  }
  
  const loginCheck = () => {
    fetch('http://0.0.0.0:4000/mail', {
    method: 'post',
    body: JSON.stringify(values)
    }).then((response)=> {
      return response
    }).then((err) => {
      return err
    });
  }

  const catchSubmit = async (e) => {
    e.preventDefault()
    setshowSpinner(true)
    if (values.first !== '' && values.email !== '' && values.message !== '') {
      const response = await loginCheck(values.first, values.email, values.message)
      if (errorApi().test(response)) {
        addToast('oops', { appearance: 'error' })
      } else {
        addToast('message envoyé', { appearance: 'success' })
      }
    } else {
      setErrEmail(true)
      setErrName(true)
      setErrMessage(true)
    }
    setshowSpinner(false)
  }

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={4}>
            <Card>
              <form className={classes.form}>
                <CardHeader color="primary" className={classes.cardHeader}>
                  <h4>Contact Him</h4>
                  <div className={classes.socialLine}>
                    <Button
                      justIcon
                      href="https://twitter.com/loryleticee/"
                      target="_blank"
                      color="transparent"
                      onClick={e => e.preventDefault()}
                    >
                      <i className={classes.socialIcons + " fab fa-twitter"} />
                    </Button>
                    <Button
                      justIcon
                      href="http://facebook.com/loryleticee"
                      target="_blank"
                      color="transparent"
                      onClick={e => e.preventDefault()}
                    >
                      <i className={classes.socialIcons + " fab fa-facebook"} />
                    </Button>
                  </div>
                </CardHeader>
                <p className={classes.divider}>Or Be Classical</p>
                <CardBody>
                  <CustomInput
                    labelText="First Name..."
                    id="first"
                    name='first'
                    onChange={handleChange('first')}
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "text",
                      endAdornment: (
                        <InputAdornment position="end">
                          <People className={classes.inputIconsColor}/>
                        </InputAdornment>
                      )
                    }}
                  />
                  <CustomInput
                    labelText="Email..."
                    id="email"
                    onChange={handleChange('email')}
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "email",
                      endAdornment: (
                        <InputAdornment position="end">
                          <Email className={classes.inputIconsColor}/>
                        </InputAdornment>
                      )
                    }}
                  />
                  <TextField
                    aria-label='minimum height'
                    placeholder='Message ...'
                    variant='outlined'
                    label='Message'
                    multiline
                    rows={4}
                    fullWidth
                    margin='dense'
                    required
                    name='Message'
                    type='textarea'
                    id='message'
                    value={values.message}
                    onChange={handleChange('message')}
                    autoComplete='current-message'
                    error={errMessage}
                />
                </CardBody>
                <CardFooter className={classes.cardFooter}>
                  <Button simple color="primary" size="lg" onClick={catchSubmit}>
                    Get started
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
