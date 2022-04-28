import { MVTLayer } from "@deck.gl/geo-layers";

const tileAPI = process.env.REACT_APP_TILESERVER_API;

export const zipcodeMvtLayer = new MVTLayer({
  id: "mvt-demographic",
  data: `${tileAPI}/tile/demographic/{z}/{x}/{y}.pbf`,
  minZoom: 8,
  pickable: true,
  lineCapRounded: true,
  jointRounded: true,
  getLineWidth: 1,
  lineWidthUnits: "pixels",
  getLineColor: [192, 192, 192],
  getFillColor: [140, 170, 180],
  autoHighlight: true,
});
