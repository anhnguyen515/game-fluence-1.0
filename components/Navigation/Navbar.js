import { Container, useMediaQuery, useTheme } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import dynamic from "next/dynamic";

const NavDesktop = dynamic(() => import("./NavDesktop"), { ssr: false });
const NavMobile = dynamic(() => import("./NavMobile"), { ssr: false });

export default function Navbar({ handleChangeTheme }) {
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
