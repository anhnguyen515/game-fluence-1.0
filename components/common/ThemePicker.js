import { selectTheme } from "@/store/slices/themeSlice";
import { getThemeAvatar } from "@/utils/utils";
import PaletteIcon from "@mui/icons-material/Palette";
import { IconButton, ListItemIcon, ListItemText } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import { useSelector } from "react-redux";

export default function ThemePicker() {
  const themeStore = useSelector(selectTheme);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        size="small"
      >
        <PaletteIcon sx={{ fontSize: "1rem" }} />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={handleClose}
          selected={themeStore === "defaultTheme"}
        >
          <ListItemIcon>{getThemeAvatar("defaultTheme")}</ListItemIcon>
          <ListItemText>Blue & White</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          selected={themeStore === "blackPinkTheme"}
        >
          <ListItemIcon>{getThemeAvatar("blackPinkTheme")}</ListItemIcon>
          <ListItemText>Black & Pink</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
}
