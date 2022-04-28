const getTile = (reqParam) => {
  const x = parseInt(reqParam.x);
  const y = parseInt(reqParam.y);
  const z = parseInt(reqParam.z);

  return [x, y, z];
};

const generateGeoIntersectQuery = (geoFieldName, bboxGeojson) => {
  const bbox_query = {
    [geoFieldName]: {
      $geoIntersects: {
        $geometry: bboxGeojson,
      },
    },
  };
  return bbox_query;
};

const generateGeojsonVtOption = (z) => {
  return {
    maxZoom: z, // max zoom to preserve detail on; can't be higher than 24
    tolerance: 1000, // simplification tolerance (higher means simpler)
    extent: 4096, // tile extent (both width and height)
    buffer: 64, // tile buffer on each side
    debug: 0, // logging level (0 to disable, 1 or 2)
    lineMetrics: false, // whether to enable line metrics tracking for LineString/MultiLineString features
    promoteId: null, // name of a feature property to promote to feature.id. Cannot be used with `generateId`
    generateId: false, // whether to generate feature ids. Cannot be used with `promoteId`
    indexMaxZoom: z, // max zoom in the initial tile index
    indexMaxPoints: 1000000, // max number of points per tile in the index
  };
};

module.exports = {
  getTile: getTile,
  generateGeoIntersectQuery: generateGeoIntersectQuery,
  generateGeojsonVtOption: generateGeojsonVtOption,
};
