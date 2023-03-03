import { selectTheme, setTheme } from "@/store/slices/themeSlice";
import { getTheme } from "@/utils/utils";
import PaletteIcon from "@mui/icons-material/Palette";
import { Button, IconButton, ListItemIcon, ListItemText } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Cookies from "js-cookie";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

const themes = [
  {
    value: "defaultTheme",
    text: "Blue on White",
  },
  {
    value: "chicagoTheme",
    text: "Chicago",
  },
  {
    value: "blackPinkTheme",
    text: "Black & Pink",
  },
  {
    value: "blackGoldTheme",
    text: "Black & Gold",
  },
  {
    value: "blackCyanTheme",
    text: "Black & Cyan",
  },
  {
    value: "wavezTheme",
    text: "Wavez",
  },
  {
    value: "mecha01Theme",
    text: "Mecha-01",
  },
  {
    value: "nautilusTheme",
    text: "Nautilus",
  },
  {
    value: "laserTheme",
    text: "Laser",
  },
  {
    value: "blueSamuraiTheme",
    text: "Blue Samurai",
  },
  {
    value: "redSamuraiTheme",
    text: "Red Samurai",
  },
];

export default function ThemePicker() {
  const themeStore = useSelector(selectTheme);
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleChangeTheme(value) {
    dispatch(setTheme(value));
    Cookies.set("theme", value, { secure: true, expires: 7 });
  }

  return (
    <div>
      <Button
        color="primary"
        onClick={handleClick}
        size="small"
        startIcon={<PaletteIcon />}
      >
        Theme
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {themes.map((item, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              handleChangeTheme(item.value);
            }}
            selected={themeStore === item.value}
          >
            <ListItemIcon>{getTheme(item.value).avatar}</ListItemIcon>
            <ListItemText>{item.text}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
