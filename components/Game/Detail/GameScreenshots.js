import { selectTheme } from "@/store/slices/themeSlice";
import { getTheme } from "@/utils/utils";
import { Dialog, DialogContent, useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import Image from "next/image";
import * as React from "react";
import { useSelector } from "react-redux";

export default function GameScreenshots({ img }) {
  const themeStore = useSelector(selectTheme);
  const isSmallScreen = useMediaQuery(
    getTheme(themeStore).theme.breakpoints.down("sm")
  );
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
          src={img}
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
          src={img}
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
                getTheme(themeStore).theme.palette.background.default + "80",
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
        <DialogContent>
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
              src={img}
              fill
              placeholder="blur"
              blurDataURL={
                getTheme(themeStore).theme.palette.mode === "light"
                  ? "/img/logo-black-1200px.png"
                  : "/img/logo-white-1200px.png"
              }
              quality={100}
              style={{ objectFit: "cover" }}
            />
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}
