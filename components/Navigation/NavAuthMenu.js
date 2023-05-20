import { selectUser, setUser } from "@/store/slices/userSlice";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import {
  Avatar,
  Button,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function NavAuthMenu({ user }) {
  const router = useRouter();

  const userStore = useSelector(selectUser);
  const dispatch = useDispatch();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleLogout() {
    Cookies.remove("user");
    dispatch(setUser(null));
    handleClose();
  }

  return (
    <>
      {isSmallScreen ? (
        <Button
          color="text"
          onClick={handleClick}
          size="small"
          sx={{ width: "auto" }}
          variant="outlined"
        >
          <Avatar
            alt={user.displayName}
            src={user.avatarUrl}
            sx={{
              bgcolor: "primary.main",
              width: "1.6rem",
              height: "1.6rem",
            }}
          >
            <Typography fontSize={"0.8rem"}>{user.displayName[0]}</Typography>
          </Avatar>
        </Button>
      ) : (
        <Button
          color="text"
          onClick={handleClick}
          size="small"
          startIcon={
            <Avatar
              alt={user.displayName}
              src={user.avatarUrl}
              sx={{ bgcolor: "primary.main", width: "2rem", height: "2rem" }}
            >
              <Typography fontSize={"0.8rem"}>{user.displayName[0]}</Typography>
            </Avatar>
          }
          variant="outlined"
        >
          <Stack alignItems={"flex-start"}>
            <Typography color={"text.primary"} fontSize={"0.85rem"}>
              {user.displayName}
            </Typography>
            <Typography color={"text.dark"} fontSize={"0.75rem"}>
              {user.email}
            </Typography>
          </Stack>
        </Button>
      )}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            router.push(`/user/${userStore.id}`);
            handleClose();
          }}
        >
          <ListItemIcon>
            <AccountCircleRoundedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>My profile</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            router.push("/account/settings");
            handleClose();
          }}
        >
          <ListItemIcon>
            <ManageAccountsRoundedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Settings</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutRoundedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}
