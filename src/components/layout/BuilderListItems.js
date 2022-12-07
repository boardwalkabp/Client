import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
// import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LayersIcon from '@mui/icons-material/Layers';
import PeopleIcon from "@mui/icons-material/People";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import CategoryIcon from '@mui/icons-material/Category';
// import AssignmentIcon from "@mui/icons-material/Assignment";
import { useNavigate } from "react-router";

function ListItems() {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <ListItemButton onClick={() => navigate('/builder/home')}>
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
      <ListItemButton onClick={() => navigate('/builder/categories')} >
        <ListItemIcon>
          <CategoryIcon />
        </ListItemIcon>
        <ListItemText primary="Categories" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate('/builder/clients')}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Clients" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate('/builder/questions')}>
        <ListItemIcon>
          <QuestionMarkIcon />
        </ListItemIcon>
        <ListItemText primary="Questions" />
      </ListItemButton>
    </React.Fragment>
  );
}

export default ListItems;