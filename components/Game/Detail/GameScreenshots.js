import { selectTheme } from "@/store/slices/themeSlice";
import { getTheme } from "@/utils/utils";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import {
  CircularProgress,
  Dialog,
  Grid,
  IconButton,
  Stack,
  useMediaQuery,
} from "@mui/material";
import Box from "@mui/material/Box";
import Image from "next/image";
import * as React from "react";
import { useSelector } from "react-redux";

function ScreenshotComponent({ screenshots, activeIndex }) {
  const themeStore = useSelector(selectTheme);
  const isSmallScreen = useMediaQuery(
    getTheme(themeStore).theme.breakpoints.down("sm")
  );
  const [open, setOpen] = React.useState(false);
  const [currIndex, setCurrIndex] = React.useState(activeIndex);
  const [loading, setLoading] = React.useState(false);
  const [initialLoad, setInitialLoad] = React.useState(true);

  const handleOpen = () => {
    setCurrIndex(activeIndex);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  function handleChangeActiveIndex(type = "increment") {
    setLoading(true);
    if (type === "decrement") {
      setCurrIndex((prev) => prev - 1);
    } else {
      setCurrIndex((prev) => prev + 1);
    }
  }

  if (isSmallScreen) {
    return (
      <Box
        sx={{
          position: "relative",
          width: "100%",
          aspectRatio: `1920/1080`,
          borderRadius: 1,
          overflow: "hidden",
        }}
      >
        <Image
          alt=""
          src={screenshots.results[activeIndex].image}
          fill
          sizes={`(max-width: ${
            getTheme(themeStore).theme.breakpoints.values.sm
          }) 200vw, (max-width: ${
            getTheme(themeStore).theme.breakpoints.values.md
          }) 100vw, 50vw`}
          style={{ objectFit: "cover" }}
        />
      </Box>
    );
  }

  return (
    <div>
      <Box
        onClick={handleOpen}
        sx={{
          position: "relative",
          width: "100%",
          aspectRatio: `1920/1080`,
          borderRadius: 1,
          overflow: "hidden",
          cursor: "pointer",
          backgroundColor:
            getTheme(themeStore).theme.palette.background.default + "33",
        }}
      >
        {initialLoad && (
          <Stack
            alignItems={"center"}
            justifyContent={"center"}
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              zIndex: 1,
              borderRadius: 1,
            }}
          >
            <CircularProgress />
          </Stack>
        )}
        <Image
          alt=""
          src={screenshots.results[activeIndex].image}
          fill
          onLoadingComplete={() => setInitialLoad(false)}
          sizes={`(max-width: ${
            getTheme(themeStore).theme.breakpoints.values.sm
          }) 200vw, (max-width: ${
            getTheme(themeStore).theme.breakpoints.values.md
          }) 100vw, 50vw`}
          style={{ objectFit: "cover", zIndex: -1 }}
        />
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="lg"
        slotProps={{
          backdrop: {
            sx: {
              backgroundColor:
                getTheme(themeStore).theme.palette.background.default + "CC",
            },
          },
        }}
        PaperProps={{
          elevation: 0,
          sx: {
            backgroundColor: "transparent",
          },
        }}
      >
        <Stack
          alignItems={"center"}
          direction={"row"}
          gap={3}
          justifyContent={"center"}
          mb={1}
        >
          <IconButton
            disabled={currIndex === 0 || loading}
            onClick={() => handleChangeActiveIndex("decrement")}
            sx={{ transition: "color 0.2s" }}
          >
            <ArrowBackIosRoundedIcon fontSize="large" />
          </IconButton>
          <IconButton
            disabled={currIndex === screenshots.count - 1 || loading}
            onClick={handleChangeActiveIndex}
            sx={{ transition: "color 0.2s" }}
          >
            <ArrowForwardIosRoundedIcon fontSize="large" />
          </IconButton>
        </Stack>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            aspectRatio: `1920/1080`,
            borderRadius: 1,
            overflow: "hidden",
          }}
        >
          {loading && (
            <Stack
              alignItems={"center"}
              justifyContent={"center"}
              sx={{
                p: 2,
                position: "absolute",
                top: 0,
                right: 0,
                zIndex: 2,
                // width: "auto",
                // height: "auto",
                borderRadius: 1,
                backgroundColor:
                  getTheme(themeStore).theme.palette.background.default + "26",
              }}
            >
              <CircularProgress size={48} />
            </Stack>
          )}
          <Image
            alt=""
            src={screenshots.results[currIndex].image}
            fill
            onLoadingComplete={() => setLoading(false)}
            priority
            sizes="100vw"
            // quality={100}
            style={{ objectFit: "cover", transition: "0.2s" }}
          />
        </Box>
        <div className="grid grid-cols-6 gap-2 mt-2">
          {screenshots.results.map((item, index) => (
            <Box
              key={index}
              onClick={() => {
                if (!loading) {
                  setLoading(true);
                  setCurrIndex(index);
                }
              }}
              sx={{
                position: "relative",
                aspectRatio: `1920/1080`,
                borderRadius: 1,
                overflow: "hidden",
                backgroundColor: currIndex !== index && "rgba(0, 0, 0, 0.7)",
                cursor: !loading && "pointer",
              }}
            >
              <Image
                alt=""
                src={item.image}
                fill
                sizes="20vw"
                style={{ objectFit: "cover", zIndex: -1 }}
              />
            </Box>
          ))}
        </div>
      </Dialog>
    </div>
  );
}

export default function GameScreenshots({ screenshots }) {
  return (
    <>
      <Grid container spacing={1}>
        {screenshots.results.map((item, index) => (
          <Grid key={index} item xs={12} sm={6}>
            <ScreenshotComponent
              screenshots={screenshots}
              activeIndex={index}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
