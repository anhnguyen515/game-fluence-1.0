import WidgetsIcon from "@mui/icons-material/Widgets";
import { Box, Button } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import * as React from "react";
import SideNavigator from "../common/SideNavigator";

export default function SideNavigatorDrawer() {
  const [state, setState] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState(open);
  };

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
        <Box sx={{ p: 1, minWidth: "10rem", overflow: "hidden" }}>
          <SideNavigator />
        </Box>
      </Drawer>
    </div>
  );
}
