import PageHeader from "@/components/common/PageHeader";
// import SideNavigator from "@/components/common/SideNavigator";
import { Box, Container, Grid, useMediaQuery, useTheme } from "@mui/material";
import dynamic from "next/dynamic";

const SideNavigator = dynamic(
  () => import("@/components/common/SideNavigator"),
  { ssr: false }
);

export default function InnerLayout({
  children,
  title,
  titleFontSize,
  subtitle,
  content,
  img,
  avatar,
}) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      {/* hero section */}
      <PageHeader
        title={title}
        titleFontSize={titleFontSize}
        subtitle={subtitle}
        content={content}
        // img={img}
        avatar={avatar}
      />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          left: 0,
          height: "50vh",
          backgroundImage: `linear-gradient(to bottom, ${
            theme.palette.background.default + "99"
          }, ${theme.palette.background.default}), url(${img})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          zIndex: -2,
        }}
      />
      <Container maxWidth="2xl">
        <Box sx={{ px: { xs: 0, md: 3 }, py: 0 }}>
          <Grid container spacing={2}>
            {/* sidebar section */}
            {!isSmallScreen && (
              <Grid item xs={12} md={3} lg={2}>
                <SideNavigator />
              </Grid>
            )}
            {/* content section */}
            <Grid item xs={12} md={9} lg={10}>
              {children}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
