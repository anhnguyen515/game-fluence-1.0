import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { Divider, IconButton, Stack } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import * as React from "react";
import ThemePicker from "../common/ThemePicker";
import SideNavigatorDrawer from "./SideNavigatorDrawer";

const NavAuth = dynamic(() => import("./NavAuth"), { ssr: false });

export default function NavMenuDrawer() {
  const [state, setState] = React.useState(false);
  const router = useRouter();

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState(open);
  };

  React.useEffect(() => {
    router.events.on("routeChangeComplete", () => {
      setState(false);
    });

    return () => {
      router.events.off("routeChangeComplete", () => {
        setState(false);
      });
    };
  }, []);

  return (
    <div>
      <IconButton onClick={toggleDrawer(true)}>
        <MenuRoundedIcon />
      </IconButton>
      <Drawer anchor={"top"} open={state} onClose={toggleDrawer(false)}>
        <Stack
          alignItems={"center"}
          direction={"row"}
          flexWrap={"wrap"}
          gap={2}
          sx={{ width: "100%", p: 2 }}
        >
          <SideNavigatorDrawer />
          <Stack
            alignItems={"center"}
            direction={"row"}
            divider={<Divider orientation="vertical" flexItem />}
            gap={1}
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
