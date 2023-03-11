import WidgetsIcon from "@mui/icons-material/Widgets";
import { Box, Button } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import { useRouter } from "next/router";
import * as React from "react";
import SideNavigator from "../common/SideNavigator";

export default function SideNavigatorDrawer() {
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
      <Button
        onClick={toggleDrawer(true)}
        size="small"
        startIcon={<WidgetsIcon />}
      >
        Categories
      </Button>
      <Drawer anchor={"left"} open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            px: 1,
            overflow: "auto",
            "::-webkit-scrollbar": {
              width: 0,
            },
            backgroundColor: "background.default",
            height: "100%",
          }}
        >
          <SideNavigator />
        </Box>
      </Drawer>
    </div>
  );
}
