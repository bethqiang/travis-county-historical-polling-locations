import React, { Component } from 'react';
import axios from 'axios';

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
      <div>
        <h1>Soon to be something useful</h1>
      </div>
    );
  }
}

export default Home;
