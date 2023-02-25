import { Container, useMediaQuery, useTheme } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import NavDesktop from "./NavDesktop";
import NavMobile from "./NavMobile";

export default function Navbar() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box>
      <AppBar
        elevation={0}
        // variant="outlined"
        position="static"
        color="background"
      >
        <Container maxWidth="2xl">
          <Toolbar>{isSmallScreen ? <NavMobile /> : <NavDesktop />}</Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
