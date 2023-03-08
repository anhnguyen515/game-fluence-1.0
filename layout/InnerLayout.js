import PageHeader from "@/components/common/PageHeader";
import SideNavigator from "@/components/common/SideNavigator";
import { Box, Container, Grid, useMediaQuery, useTheme } from "@mui/material";

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
        img={img}
        avatar={avatar}
      />
      <Container maxWidth="2xl">
        <Box sx={{ px: { xs: 1, md: 3 }, py: 3 }}>
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
