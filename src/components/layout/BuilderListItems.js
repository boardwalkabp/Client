import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LayersIcon from "@mui/icons-material/Layers";
import PeopleIcon from "@mui/icons-material/People";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import CategoryIcon from "@mui/icons-material/Category";
import Divider from "@mui/material/Divider";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router";
import useStateContext from "../../hooks/useStateContext";

export default function BuilderListItems() {
  const navigate = useNavigate();
  const { context, resetContext } = useStateContext();
  const handleLogoutClick = () => {
    resetContext();
    navigate("/");
  };

  return (
    <React.Fragment>
      <ListItemButton onClick={() => navigate("/builder/home")}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate("/builder/applications")}>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Applications" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate("/builder/categories")}>
        <ListItemIcon>
          <CategoryIcon />
        </ListItemIcon>
        <ListItemText primary="Categories" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate("/builder/clients")}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Clients" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate("/builder/questions")}>
        <ListItemIcon>
          <QuestionMarkIcon />
        </ListItemIcon>
        <ListItemText primary="Questions" />
      </ListItemButton>
      <Divider sx={{ my: 1 }} />
      <ListItemButton
        onClick={() => navigate(`/builder/profile/${context.id}`)}
      >
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
