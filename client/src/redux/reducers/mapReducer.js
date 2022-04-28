import MAP from "../actions/types/map";

const initialState = {
  mapboxBasemapStyle: "mapbox://styles/mapbox/light-v9",
};

export default function map(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case MAP.SET_BASEMAP_STYLE:
      return {
        ...state,
        mapboxBasemapStyle: payload,
      };
    default:
      return state;
  }
}
