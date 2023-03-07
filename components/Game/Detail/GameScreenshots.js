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

  const handleOpen = () => {
    setCurrIndex(activeIndex);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  function handleChangeActiveIndex(type = "increment") {
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
          cursor: "pointer",
        }}
      >
        <Image
          alt=""
          src={screenshots.results[activeIndex].image}
          fill
          placeholder="blur"
          blurDataURL={
            getTheme(themeStore).theme.palette.mode === "light"
              ? "/img/logo-black-1200px.png"
              : "/img/logo-white-1200px.png"
          }
          sizes={`(max-width: ${
            getTheme(themeStore).theme.breakpoints.values.sm
          }) 100vw, (max-width: ${
            getTheme(themeStore).theme.breakpoints.values.md
          }) 50vw, 33vw`}
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
        }}
      >
        <Image
          alt=""
          src={screenshots.results[activeIndex].image}
          fill
          placeholder="blur"
          blurDataURL={
            getTheme(themeStore).theme.palette.mode === "light"
              ? "/img/logo-black-1200px.png"
              : "/img/logo-white-1200px.png"
          }
          sizes={`(max-width: ${
            getTheme(themeStore).theme.breakpoints.values.sm
          }) 100vw, (max-width: ${
            getTheme(themeStore).theme.breakpoints.values.md
          }) 50vw, 33vw`}
          style={{ objectFit: "cover" }}
        />
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="xl"
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
        <Stack alignItems={"center"} direction={"row"} gap={1}>
          <IconButton
            disabled={currIndex === 0}
            onClick={() => handleChangeActiveIndex("decrement")}
          >
            <ArrowBackIosRoundedIcon fontSize="large" />
          </IconButton>
          <Stack
            alignItems={"center"}
            justifyContent={"center"}
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
              src={screenshots.results[currIndex].image}
              fill
              placeholder="blur"
              blurDataURL={
                getTheme(themeStore).theme.palette.mode === "light"
                  ? "/img/logo-black-1200px.png"
                  : "/img/logo-white-1200px.png"
              }
              priority
              quality={100}
              style={{ objectFit: "cover", transition: "0.2s" }}
            />
          </Stack>
          <IconButton
            disabled={currIndex === screenshots.count - 1}
            onClick={handleChangeActiveIndex}
          >
            <ArrowForwardIosRoundedIcon fontSize="large" />
          </IconButton>
        </Stack>
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
