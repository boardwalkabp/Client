import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LayersIcon from "@mui/icons-material/Layers";
import Divider from "@mui/material/Divider";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router";
import useStateContext from "../../hooks/useStateContext";

export default function ViwerListItems() {
  const navigate = useNavigate();
  const { context, resetContext } = useStateContext();
  const handleLogoutClick = () => {
    resetContext();
    navigate("/");
  };

  return (
    <React.Fragment>
      <ListItemButton onClick={() => navigate("/viewer/home")}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate("/viewer/applications")}>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Applications" />
      </ListItemButton>
      <Divider sx={{ my: 1 }} />
      <ListItemButton onClick={() => navigate(`/viewer/profile/${context.id}`)}>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItemButton>
      <ListItemButton onClick={handleLogoutClick}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </React.Fragment>
  );
}
