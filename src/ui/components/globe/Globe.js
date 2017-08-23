import React, {Component} from 'react';
import {GoogleMap, withGoogleMap} from "react-google-maps";

class Globe extends Component {

    render() {
        const googleMapURL = "https://maps.googleapis.com/maps/api/js?v=3.27&libraries=places,geometry&key=AIzaSyATgvaGld2Ng6k2RoDsGsK2cxzxtM0PixI";
        const GoggleMap = withGoogleMap(props => (
            <GoogleMap
                ref="map"
                defaultZoom={3}
                defaultCenter={{lat: -25.363882, lng: 131.044922}}>
            </GoogleMap>
        ));

        return (
            <div className="globe-container">
                <GoggleMap containerElement={<div style={{height: `100%`}}/>}
                           mapElement={<div style={{height: `100%`}}/>}/>
            </div>
        );
    }
}

Globe.propTypes = {};

export default Globe;
