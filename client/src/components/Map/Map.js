import { useSelector } from "react-redux";

import DeckGL from "@deck.gl/react";
import ReactMapGL from "react-map-gl";

import { zipcodeMvtLayer } from "./layers";

import BasemapController from "./controls/BasemapController/BasemapController";

import "./Map.css";

// Viewport settings
const INITIAL_VIEW_STATE = {
  longitude: -122.41669,
  latitude: 37.7853,
  zoom: 13,
  pitch: 0,
  bearing: 0,
  minZoom: 2,
};

const layers = [zipcodeMvtLayer];

const Map = () => {
  const mapboxBasemapStyle = useSelector(
    (state) => state.map.mapboxBasemapStyle
  );
  return (
    <div className="mapContainer">
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        layers={layers}
        getTooltip={({ object }) => object && object.properties.zipcode}
      >
        <ReactMapGL mapStyle={mapboxBasemapStyle} />
      </DeckGL>
      <BasemapController />
    </div>
  );
};

export default Map;
