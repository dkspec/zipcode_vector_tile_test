import MAP from "./types/map";

export const setBasemapStyle = (payload) => {
  return {
    type: MAP.SET_BASEMAP_STYLE,
    payload,
  };
};
