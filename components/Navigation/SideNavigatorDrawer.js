import WidgetsIcon from "@mui/icons-material/Widgets";
import { Box, Button } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import { useRouter } from "next/router";
import * as React from "react";
import SideNavigator from "../common/SideNavigator";

export default function SideNavigatorDrawer() {
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
      if (state === true) {
        setState(false);
      }
    });

    return () => {
      router.events.off("routeChangeComplete", () => {
        setState(false);
      });
    };
  }, []);

  return (
    <div>
      <Button
        onClick={toggleDrawer(true)}
        size="small"
        startIcon={<WidgetsIcon />}
      >
        Categories
      </Button>
      <Drawer anchor={"left"} open={state} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            px: 1,
            overflow: "hidden",
            backgroundColor: "background.default",
          }}
        >
          <SideNavigator />
        </Box>
      </Drawer>
    </div>
  );
}
