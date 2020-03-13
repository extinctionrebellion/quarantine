import React, {useEffect, useState} from "react";
import GoogleMapReact from 'google-map-react';
import {Favorite, AddAlert, AccessibilityNew} from '@material-ui/icons';
import {Modal, TextField, AppBar, IconButton, Button, Typography, Toolbar} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import GooglePlacesAutocomplete, {geocodeByPlaceId} from 'react-google-places-autocomplete';
import {Form} from '../components';
import axios from 'axios';

/**
 * Default class styles for this component
 *
 * @type {(props?: any) => ClassNameMap<string>}
 */
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  formControl: {
    width: '100%'
  },
  modal: {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  }
}));

/**
 * Quarantine marker
 *
 * @param item
 * @returns {*}
 * @constructor
 */
const QMarker = ({item}) => <div>
  <IconButton>
    {item.type === 'quarantine' ? <AccessibilityNew></AccessibilityNew> : <Favorite></Favorite>}
  </IconButton>
</div>;

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

export default function Index() {

  const classes = useStyles();

  const [modalStyle] = React.useState(getModalStyle);
  const [help, setHelp] = React.useState(false);
  const [quarantine, setQuarantine] = React.useState(false);
  const [markers, setMarkers] = React.useState([]);

  /**
   * Define entity schema
   * @type {{address: null, lng: null, phone: null, name: null, message: null, type: string, email: null, lat: null}}
   */
  let quarantineSchema = {
    name: null,
    phone: null,
    email: null,
    message: null,
    address: null,
    type: 'quarantine',
    lat: null,
    lng: null
  };

  let helpSchema = {
    name: null,
    phone: null,
    email: null,
    message: null,
    address: null,
    type: 'help',
    lat: null,
    lng: null
  };

  const [quarantineForm, setQuarantineForm] = React.useState(quarantineSchema);
  const [helpForm, setHelpForm] = React.useState(helpSchema);

  const [formHelp, setFormHelp] = React.useState({
    location: {}
  });

  const handleOpenHelpForm = () => {
    setHelp(true);
  };

  const handleCloseHelpForm = () => {
    setHelp(false);
  };

  const handleOpenQuarantineForm = () => {
    setQuarantine(true);
  };

  const handleCloseQuarantineForm = () => {
    setQuarantine(false);
  };

  /**
   * Methods
   *
   * @returns {Promise<AxiosResponse<T>>}
   */
  function getMarkers() {
    return axios.get(process.env.API_URL+'markers').then((res) => {
      console.log(res);
      setMarkers(res.data);
    });
  }

  function getLocalization(res) {
    console.log('Localization', res);
    geocodeByPlaceId(res.place_id)
      .then((results) => {
        console.log('Results', results);
        formHelp.location = results;
      })
      .catch(error => console.error(error));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    console.log('data', data);
  }

  /**
   * On component mount
   */
  useEffect(() => {
    getMarkers();
  }, []);

  const showCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.setState(prevState => ({
            currentLatLng: {
              ...prevState.currentLatLng,
              lat: position.coords.latitude,
              lng: position.coords.longitude
            },
            isMarkerShown: true
          }))
        }
      )
    } else {
      error => console.log(error)
    }
  };

  return <div style={{height: '100vh', width: '100%', margin: 0, padding: 0}}>
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"/>
        <Typography variant="h6" className={classes.title}>
          <AddAlert/> Quarantine App
        </Typography>
        <Button onClick={handleOpenHelpForm} variant="contained">Propose my help</Button>
        <Button onClick={handleOpenQuarantineForm} variant="contained" color="primary">Need help</Button>
      </Toolbar>
    </AppBar>
    <div style={{height: '95vh', width: '100%'}}>
      <GoogleMapReact
        defaultCenter={{lat: 50.51, lng: 4.20}}
        defaultZoom={8}>
        {markers.map((item) => <QMarker key={item.id} lat={item.lat} lng={item.lng} text={item.title}
                                        item={item}/>)}
      </GoogleMapReact>
    </div>
    <Modal
      id={'need-help-form'}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={quarantine}
      onClose={handleCloseQuarantineForm}
    >
      <div style={modalStyle} className={classes.paper}>
        <Form action="markers">
          <h2>I need help</h2>
          <TextField className={classes.formControl} variant="outlined"
                            placeholder={"Describe your need, example :  \n- Need bread \n- Need fruits"}
                            name="description" required={true} multiline={true}/><br/>
          <h3>Your contact infos (will not be shown publicly)</h3>
          <TextField className={classes.formControl} label="Name" name="name" required/><br/>
          <TextField className={classes.formControl} label="Email" name="email" required/><br/>
          <TextField className={classes.formControl} label="Phone" name="phone" required={true}/><br/>
          <br/>
          <GooglePlacesAutocomplete className={classes.formControl}
                                    onSelect={getLocalization}/>
          <br/>
          <Button type={"submit"} variant="contained" color={'default'} fullWidth={true}>Add your need</Button>
        </Form>
      </div>
    </Modal>
    <Modal
      id={'helper-form'}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={help}
      onClose={handleCloseHelpForm}
    >
      <div style={modalStyle} className={classes.paper}>
        <h2>I can help</h2>
        <Form action="markers">
          <h2>I need help</h2>
          <TextField className={classes.formControl} variant="outlined"
                     placeholder={"Describe your need, example :  \n- Need bread \n- Need fruits"}
                     name="description" required={true} multiline={true}/><br/>
          <h3>Your contact infos (will not be shown publicly)</h3>
          <TextField className={classes.formControl} label="Name" name="name" required/><br/>
          <TextField className={classes.formControl} label="Email" name="email" required/><br/>
          <TextField className={classes.formControl} label="Phone" name="phone" required={true}/><br/>
          <br/>
          <GooglePlacesAutocomplete className={classes.formControl}
                                    onSelect={() => getLocalization('')}/>
          <br/>
          <Button type={"submit"} variant="contained" color={'default'} fullWidth={true}>Add your need</Button>
        </Form>
      </div>
    </Modal>
  </div>
};
