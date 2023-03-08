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
              ? "/img/logo-black-600px.png"
              : "/img/logo-white-600px.png"
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
              ? "/img/logo-black-600px.png"
              : "/img/logo-white-600px.png"
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
            <CircularProgress
              size={64}
              sx={{ position: "absolute", top: 20, right: 20, zIndex: 2 }}
            />
          )}
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
            onLoadingComplete={() => setLoading(false)}
            priority
            // quality={100}
            style={{ objectFit: "cover", transition: "0.2s" }}
          />
        </Box>
        <div className="grid grid-cols-6 gap-2 mt-2">
          {screenshots.results.map((item, index) => (
            <Box
              key={index}
              onClick={() => setCurrIndex(index)}
              sx={{
                position: "relative",
                aspectRatio: `1920/1080`,
                borderRadius: 1,
                overflow: "hidden",
                backgroundColor: currIndex !== index && "rgba(0, 0, 0, 0.7)",
                cursor: "pointer",
              }}
            >
              <Image
                alt=""
                src={item.image}
                fill
                placeholder="blur"
                blurDataURL={
                  getTheme(themeStore).theme.palette.mode === "light"
                    ? "/img/logo-black-600px.png"
                    : "/img/logo-white-600px.png"
                }
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
