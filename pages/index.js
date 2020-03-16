import React, { useEffect, useState } from "react";
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { Favorite, AddAlert, AccessibilityNew } from '@material-ui/icons';
import { AppBar, Button, IconButton, Modal, TextField, Typography, Toolbar } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { Form } from '../components';
import axios from 'axios';
import GeolocInput from "../components/GeolocInput";

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

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const QMarker = (props) => {

  const classes = useStyles();

  let item = props.item;

  return (
    <Marker latitude={props.lat} longitude={props.lng} offsetLeft={-20} offsetTop={-10}>
    <IconButton
      aria-haspopup="true"
        onClick={() => props.onClick(item)}
    >
      {props.item.type === 'quarantine' ? <AccessibilityNew></AccessibilityNew> : <Favorite></Favorite>}
    </IconButton>
    </Marker >
  )
};

export default function Index() {

  const classes = useStyles();

  /**
   * Component states
   */
  const [modalStyle] = React.useState(getModalStyle);
  const [help, setHelp] = React.useState(false);
  const [quarantine, setQuarantine] = React.useState(false);
  const [markers, setMarkers] = React.useState([]);
  const [popupInfo, setPopupInfo] = React.useState(null);
  const [viewport, setViewport] = React.useState({
    width: '100%',
    height: '95vh',
    latitude: 50.51,
    longitude: 4.20,
    zoom: 8
  });

  /**
   * Methods
   *
   * @returns {Promise<AxiosResponse<T>>}
   */

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

  const onClickMarker = (item) => {
    console.log("click - item", item);
    setPopupInfo(item);
    console.log("click - popupInfo", popupInfo);
  };

  const renderPopup = () => {
    if (!popupInfo) {
      return null;
    }

    return (
      <Popup
        anchor="bottom"
        longitude={popupInfo.point.coordinates[0]}
        latitude={popupInfo.point.coordinates[1]}
        closeOnClick={false}
        onClose={() => setPopupInfo(null)}
      >
        <Typography className={classes.typography}>{popupInfo.message}</Typography>
      </Popup>
    );
  }

  function getMarkers() {
    return axios.get(process.env.API_URL + 'markers').then((res) => {
      setMarkers(res.data);
    });
  }

  /**
   * On component did mount
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
    <ReactMapGL
      {...viewport}
      onViewportChange={setViewport}
      mapboxApiAccessToken={process.env.MAPBOX_TOKEN}>
      {markers.map((item) => <QMarker key={item.id} lat={item.point.coordinates[1]} lng={item.point.coordinates[0]} item={item} onClick={(item) => onClickMarker(item)} />)}
      {renderPopup()}
    </ReactMapGL>
    <Modal
      id={'quarantine-form'}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={quarantine}
      onClose={handleCloseQuarantineForm}
    >
      <div style={modalStyle} className={classes.paper}>
        <Form action={"markers"} onSuccess={getMarkers}>
          <h2>I need help</h2>
          <TextField className={classes.formControl} variant="outlined"
                     placeholder={"Describe your need, example :  \n- Need bread \n- Need fruits"}
                     name="message" required={true} multiline={true}/><br/>
          <h3>Your contact infos (will not be shown publicly)</h3>
          <TextField className={classes.formControl} label="Name" name="name" required/><br/>
          <TextField className={classes.formControl} label="Email" name="email" required/><br/>
          <TextField className={classes.formControl} label="Phone" name="phone" required={true}/><br/>
          <br/>
          <GeolocInput />
          <br/>
          <input type="hidden" name={'type'} value={'quarantine'} />
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
        <Form action={"markers"}>
          <h2>I can help</h2>
          <TextField className={classes.formControl} variant="outlined"
                     placeholder={"Describe how you can help, example :  \n- I can deliver foods \n- I make foods"}
                     name="message" required={true} multiline={true}/><br/>
          <h3>Your contact infos (will not be shown publicly)</h3>
          <TextField className={classes.formControl} label="Name" name="name" required/><br/>
          <TextField className={classes.formControl} label="Email" name="email" required/><br/>
          <TextField className={classes.formControl} label="Phone" name="phone" required={true}/><br/>
          <br/>
          <GeolocInput />
          <br/>
          <input type="hidden" name={'type'} value={'helper'} />
          <Button type={"submit"} variant="contained" color={'default'} fullWidth={true}>Propose your help</Button>
        </Form>
      </div>
    </Modal>
  </div>
};
