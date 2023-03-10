import { Container, useMediaQuery, useTheme } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import NavDesktop from "./NavDesktop";
import NavMobile from "./NavMobile";

export default function Navbar() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <nav>
      <AppBar
        elevation={0}
        // variant="outlined"
        position="static"
        sx={{
          backgroundColor: "transparent",
          color: "text.primary",
        }}
      >
        <Container maxWidth="2xl">
          <Toolbar sx={{ p: 0 }}>
            {isSmallScreen ? <NavMobile /> : <NavDesktop />}
          </Toolbar>
        </Container>
      </AppBar>
    </nav>
  );
}
