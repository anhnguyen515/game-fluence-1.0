import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { IconButton, Stack } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import { useRouter } from "next/router";
import * as React from "react";
import ThemePicker from "../common/ThemePicker";
import NavAuth from "./NavAuth";
import SideNavigatorDrawer from "./SideNavigatorDrawer";

export default function NavMenuDrawer() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(open);
  };

  React.useEffect(() => {
    router.events.on("routeChangeComplete", () => {
      setOpen(false);
    });

    return () => {
      router.events.off("routeChangeComplete", () => {
        setOpen(false);
      });
    };
  }, []);

  return (
    <div>
      <IconButton onClick={toggleDrawer(true)}>
        <MenuRoundedIcon />
      </IconButton>
      <Drawer anchor={"top"} open={open} onClose={toggleDrawer(false)}>
        <Stack
          alignItems={"center"}
          direction={"row"}
          flexWrap={"wrap"}
          gap={2}
          sx={{ width: "100%", p: 2, backgroundColor: "background.default" }}
        >
          <SideNavigatorDrawer />
          <Stack
            alignItems={"center"}
            direction={"row"}
            gap={2}
            sx={{ ml: "auto" }}
          >
            <NavAuth />
            <ThemePicker />
          </Stack>
        </Stack>
      </Drawer>
    </div>
  );
}
