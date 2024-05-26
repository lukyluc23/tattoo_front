import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import "./ListC.css";
import { CalendarMonth, Palette, Person } from "@mui/icons-material";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { deepPurple } from "@mui/material/colors";

export default function ListC() {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className="list-container">
      <Stack direction="row" spacing={2}>
        <Avatar sx={{ bgcolor: deepPurple[500] }}>AD</Avatar>
      </Stack>
      <List
        className="list-options"
        // sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        // component="nav"
        // aria-labelledby="nested-list-subheader"
      >
        <ListItemButton>
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          <ListItemText primary="Usuarios" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <CalendarMonth />
          </ListItemIcon>
          <ListItemText primary="Citas" />
        </ListItemButton>
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <Palette />
          </ListItemIcon>
          <ListItemText primary="Tatuadores" />
        </ListItemButton>
      </List>
    </div>
  );
}
