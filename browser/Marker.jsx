import React from 'react';

const Marker = props => (
  <div style={{ height: 10, width: 10, backgroundColor: props.markerColor, borderRadius: '50%' }} />
);

export default Marker;
