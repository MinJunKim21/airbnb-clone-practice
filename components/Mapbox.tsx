import { useState } from 'react';
import Map from 'react-map-gl';
import getCenter from 'geolib/es/getCenter';
import { ISearchResults } from '../typings';
import { stringify } from 'querystring';

interface Props {
  searchResults: ISearchResults[];
}

function Mapbox({ searchResults }: Props) {
  //search result objecte들을  { latitude: 52.516272, longitude: 13.377722 } 이런 타입의 object들로 바꾸기
  const coordinates = searchResults.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }));

  const center = getCenter(coordinates);

  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    longitude: center.longitude,
    latitude: center.latitude,
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
