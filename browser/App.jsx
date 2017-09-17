import React, { Component } from 'react';
import axios from 'axios';
import GoogleMap from 'google-map-react';
import Marker from './Marker';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      yearFilter: '',
      categoryFilter: '',
    };
    this.setFilterState = this.setFilterState.bind(this);
    this.filterLocations = this.filterLocations.bind(this);
    this.determineMarkerColor = this.determineMarkerColor.bind(this);
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

  setFilterState(field, value) {
    if (this.state[field] === value) this.setState({ [field]: '' });
    else this.setState({ [field]: value });
  }

  // TODO: handle combinations of filters (multiple years, multiple categories, year + category)
  // or, if want to keep it at one each, change UI to use dropdowns instead of checkboxes
  filterLocations(locations) {
    const { yearFilter, categoryFilter } = this.state;
    if (yearFilter) {
      return locations.filter(location => location.year === yearFilter);
    } else if (categoryFilter) {
      if (categoryFilter === 'earlyVoting') {
        return locations.filter(location => location.earlyVoting === true);
      } else if (categoryFilter === 'electionDayVoting') {
        return locations.filter(location => location.electionDayVoting === true);
      }
    }
    return locations;
  }

  determineMarkerColor(year) {
    if (year === 2014) return 'red';
    if (year === 2015) return 'blue';
    if (year === 2016) return 'gray';
  }

  render() {
    const filteredLocations = this.filterLocations(this.state.locations);
    return (
      <div style={{ height: 500 }}>
        <h1>Travis County Historical Polling Locations</h1>
        <div>
          <div style={{ height: 10, width: 10, backgroundColor: 'red', borderRadius: '50%', display: 'inline-block' }} />
          <p style={{ display: 'inline-block', marginLeft: 5 }}>2014</p>
          <div style={{ height: 10, width: 10, backgroundColor: 'blue', borderRadius: '50%', display: 'inline-block', marginLeft: 10 }} />
          <p style={{ display: 'inline-block', marginLeft: 5 }}>2015</p>
          <div style={{ height: 10, width: 10, backgroundColor: 'gray', borderRadius: '50%', display: 'inline-block', marginLeft: 10 }} />
          <p style={{ display: 'inline-block', marginLeft: 5 }}>2016</p>
        </div>
        {/* TODO: make the filters dynamic */}
        <div>
          <h4>Filter by year:</h4>
          <input
            type="checkbox"
            id="2014-filter"
            name="2014 Filter"
            onClick={() => this.setFilterState('yearFilter', 2014)}
          />
          <label htmlFor="2014-filter">2014</label>
          <input
            type="checkbox"
            id="2015-filter"
            name="2015 Filter"
            onClick={() => this.setFilterState('yearFilter', 2015)}
          />
          <label htmlFor="2015-filter">2015</label>
          <input
            type="checkbox"
            id="2016-filter"
            name="2016 Filter"
            onClick={() => this.setFilterState('yearFilter', 2016)}
          />
          <label htmlFor="2016-filter">2016</label>
        </div>
        <div>
          <h4>Filter by category:</h4>
          <input
            type="checkbox"
            id="early-voting"
            name="Early Voting"
            onClick={() => this.setFilterState('categoryFilter', 'earlyVoting')}
          />
          <label htmlFor="early-voting">Early Voting</label>
          <input
            type="checkbox"
            id="election-day-voting"
            name="Election Day Voting"
            onClick={() => this.setFilterState('categoryFilter', 'electionDayVoting')}
          />
          <label htmlFor="election-day-voting">Election Day Voting</label>
        </div>
        <GoogleMap
          // should change key eventually, currently taking from
          // https://www.fullstackreact.com/articles/how-to-write-a-google-maps-react-component/
          bootstrapURLKeys={{ key: 'AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo' }}
          center={{ lat: 30.2672, lng: -97.7431 }}
          zoom={11}
        >
          { filteredLocations.length && filteredLocations.map(location => (
            <Marker
              key={location._id}
              lat={location.latitude}
              lng={location.longitude}
              text={location.name}
              markerColor={this.determineMarkerColor(location.year)}
            />
          ))}
        </GoogleMap>
      </div>
    );
  }
}

export default Home;
