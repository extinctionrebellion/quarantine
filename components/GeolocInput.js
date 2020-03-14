import GooglePlacesAutocomplete, {geocodeByPlaceId} from "react-google-places-autocomplete";
import React from "react";

/**
 * Component to handle auto select of address and lat,lng fields
 */
class GeolocInput extends React.Component {

  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(res) {
    //console.log('Localization', res);
    this.inputAddress.value = res.description+'';
    geocodeByPlaceId(res.place_id)
      .then((results) => {
        console.log(results[0].geometry.location.lat);
        this.inputLat.value = results[0].geometry.location.lat() + '';
        this.inputLng.value = results[0].geometry.location.lng() + '';
      })
      .catch(error => console.error(error));
  }

  render() {
    return (
      <React.Fragment>
        <GooglePlacesAutocomplete className={this.props.className}
                                  onSelect={this.handleSelect}/>
        <input type="hidden" name={'lat'} ref={(ref) => this.inputLat = ref} />
        <input type="hidden" name={'lng'} ref={(ref) => this.inputLng = ref} />
        <input type="hidden" name={'address'} ref={(ref) => this.inputAddress = ref} />
      </React.Fragment>
    )
  }
}

export default GeolocInput;