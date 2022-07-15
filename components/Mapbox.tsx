import { useState } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import getCenter from 'geolib/es/getCenter';
import { ISearchResults } from '../typings';
import 'mapbox-gl/dist/mapbox-gl.css';

interface Props {
  searchResults: ISearchResults[];
}

interface ICenter {
  longitude: number;
  latitude: number;
}

interface IViewport {
  width?: string;
  height?: string;
  longitude: any;
  latitude: any;
  zoom: number;
}

function Mapbox({ searchResults }: Props) {
  const [selectedLocation, setSelectedLocation] = useState<ISearchResults>();
  const [showPopup, setShowPopup] = useState(true);
  //search result objecte들을  { latitude: 52.516272, longitude: 13.377722 } 이런 타입의 object들로 바꾸기
  const coordinates = searchResults.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }));

  const center: any = getCenter(coordinates);

  const [viewport, setViewport] = useState<IViewport>({
    width: '100%',
    height: '100%',
    longitude: center.longitude,
    latitude: center.latitude,
    zoom: 12,
  });

  return (
    <Map
      mapboxAccessToken={process.env.mapbox_key}
      mapStyle="mapbox://styles/jun02220/cl5lbr3qs000j15o07uw98eid"
      {...viewport}
      onMove={(e) => setViewport(e.viewState)}
    >
      {searchResults.map((result) => (
        <div key={result.long}>
          <Marker longitude={result.long} latitude={result.lat}>
            <p
              role="img"
              onClick={() => (setShowPopup(true), setSelectedLocation(result))}
              className="cursor-pointer text-2xl "
              aria-label="push-location"
            >
              ⭐️
            </p>
          </Marker>
          {showPopup && (
            <Popup
              longitude={result.long}
              latitude={result.lat}
              anchor="bottom"
              onClose={() => setShowPopup(false)}
            >
              <div className="text-xs">{result.title}</div>
            </Popup>
          )}
          {/* {selectedLocation === result ? (
            <Popup
              onClose={() => setSelectedLocation({})}
              closeOnClick={true}
              latitude={result.lat}
              longitude={result.long}
            >
              <div>{result.title}</div>
            </Popup>
          ) : (
            false
          )} */}
        </div>
      ))}
    </Map>
  );
}

export default Mapbox;
