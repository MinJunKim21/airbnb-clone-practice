import { useState } from 'react';
import Map from 'react-map-gl';

function Mapbox() {
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    longitude: -100,
    latitude: 40,
    zoom: 11,
  });
  return (
    <Map
      mapboxAccessToken={process.env.mapbox_key}
      mapStyle="mapbox://styles/jun02220/cl5lbr3qs000j15o07uw98eid"
      {...viewport}
      onMove={(e) => setViewport(e.viewState)}
    />
  );
}

export default Mapbox;
