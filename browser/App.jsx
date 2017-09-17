import React, { Component } from 'react';
import axios from 'axios';
import GoogleMap from 'google-map-react';
import Marker from './Marker';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
    };
  }

  componentDidMount() {
    axios.get('/api')
      .then((res) => {
        const { success, locations } = res.data;
        if (success) this.setState({ locations });
        else alert(`Error: ${res.data.message}`); // eslint-disable-line no-alert
      })
      .catch(err => alert(`Error: ${err}`)); // eslint-disable-line no-alert
  }

  render() {
    return (
      <div style={{ height: 500 }}>
        <h1>Travis County Historical Polling Locations</h1>
        <GoogleMap
          // should change key eventually, currently taking from
          // https://www.fullstackreact.com/articles/how-to-write-a-google-maps-react-component/
          bootstrapURLKeys={{ key: 'AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo' }}
          center={{ lat: 30.2672, lng: -97.7431 }}
          zoom={11}
        >
          { this.state.locations.length && this.state.locations.map(location => (
            <Marker
              key={location._id}
              lat={location.latitude}
              lng={location.longitude}
              text={location.name}
            />
          ))}
        </GoogleMap>
      </div>
    );
  }
}

export default Home;
