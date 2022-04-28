import { useState } from "react";

import { useDispatch } from "react-redux";
import { setBasemapStyle } from "../../../../redux/actions/map";

import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";

import MapIcon from "@mui/icons-material/Map";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness3Icon from "@mui/icons-material/Brightness3";
import PublicIcon from "@mui/icons-material/Public";

import "./BasemapController.css";

const basemapControllerActions = [
  {
    icon: <DriveEtaIcon className="basemapControllerIcon" />,
    name: "Street",
    url: "mapbox://styles/mapbox/streets-v11",
  },
  {
    icon: <Brightness7Icon className="basemapControllerIcon" />,
    name: "Light",
    url: "mapbox://styles/mapbox/light-v9",
  },
  {
    icon: <Brightness3Icon className="basemapControllerIcon" />,
    name: "Dark",
    url: "mapbox://styles/mapbox/dark-v9",
  },
  {
    icon: <PublicIcon className="basemapControllerIcon" />,
    name: "Satellite Street",
    url: "mapbox://styles/mapbox/satellite-streets-v11",
  },
];

const BasemapController = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const handleBasemapIconOnClick = (e) => {
    const targetBasemapUrl = e.target.getAttribute("data-url");
    dispatch(setBasemapStyle(targetBasemapUrl));
  };

  return (
    <SpeedDial
      ariaLabel="BasemapController"
      sx={{ position: "absolute", bottom: 30, right: 20 }}
      direction={"left"}
      open={open}
      icon={<MapIcon />}
      onClick={() => setOpen(!open)}
    >
      {basemapControllerActions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          data-url={action.url}
          tooltipTitle={action.name}
          tooltipPlacement="bottom"
          onClick={handleBasemapIconOnClick}
        />
      ))}
    </SpeedDial>
  );
};

export default BasemapController;
