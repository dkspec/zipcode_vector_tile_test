const express = require("express");
const tilebelt = require("@mapbox/tilebelt");
const zlib = require("zlib");
const vtpbf = require("vt-pbf");
const geojsonvt = require("geojson-vt");

const helper = require("../utils/helpers");

const tileRoutes = express.Router();

const dbo = require("../db/conn");

tileRoutes.route("/tile/demographic/:z/:x/:y.pbf").get(async (req, res) => {
  try {
    const tile = helper.getTile(req.params);
    const [x, y, z] = tile;

    const bbox = tilebelt.tileToBBOX(tile);

    const bboxGeoJson = tilebelt.tileToGeoJSON(tile);
    const bboxQuery = helper.generateGeoIntersectQuery("location", bboxGeoJson);

    const dbConnect = dbo.getDb();

    const layersToGrab = ["zipcode"];

    // Get queries for different collection asynchronously
    const allResults = await Promise.all(
      layersToGrab.map(async (layer) => {
        const queryResult = await dbConnect
          .collection(layer)
          .find(bboxQuery, { projection: { _id: 0 } })
          .toArray();
        return queryResult;
      })
    );

    let geojsonLayers = {};

    // When promise is finished, combine features to one array
    await allResults.forEach((result, index) => {
      // Result to geojson feature array
      const toArrGeojsonFeatures = result.map((item) => ({
        type: "Feature",
        properties: {
          zipcode: item.zipcode,
        },
        geometry: item.location,
      }));
      // Create Geojson Feature Collection
      const geojsonFC = {
        type: "FeatureCollection",
        features: toArrGeojsonFeatures,
      };

      //If feature does not exist
      if (toArrGeojsonFeatures.length === 0) {
      } else {
        // Create vector tile for all the intersects
        const geojsonVtOption = helper.generateGeojsonVtOption(z);
        const tileIndex = geojsonvt(geojsonFC, geojsonVtOption);
        const clippedFeatures = tileIndex.getTile(z, x, y);

        // Clipped to the bounding box for excess
        if (!clippedFeatures) {
        } else {
          geojsonLayers = {
            ...geojsonLayers,
            [layersToGrab[index]]: clippedFeatures,
          };
        }
      }
    });

    // Send Response
    if (Object.keys(geojsonLayers).length < 1) {
      res.writeHead(204);
      return res.end();
    } else {
      const buff = vtpbf.fromGeojsonVt(geojsonLayers);
      zlib.gzip(buff, (err, pbf) => {
        if (!err) {
          const pbfHeader = {
            "Content-Type": "application/x-protobuf",
            "Content-Encoding": "gzip",
          };

          res.set(pbfHeader);
          res.send(pbf);
        } else {
          res.status(404).send(err);
        }
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

tileRoutes.route("/tile/bbox/:z/:x/:y").get(async (req, res) => {
  try {
    const tile = helper.getTile(req.params);
    const [x, y, z] = tile;

    const bbox = tilebelt.tileToBBOX(tile);
    const bboxGeoJson = tilebelt.tileToGeoJSON(tile);

    res.status(200).send(bboxGeoJson);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = tileRoutes;
