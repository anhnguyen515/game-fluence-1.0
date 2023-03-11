import { selectTheme } from "@/store/slices/themeSlice";
import { getTheme } from "@/utils/utils";
import { DialogContent, Stack, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { useSelector } from "react-redux";

export default function FullScreenLoader() {
  const themeStore = useSelector(selectTheme);
  return (
    <Dialog
      open
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
        <Stack
          alignItems={"center"}
          direction={"row"}
          gap={2}
          justifyContent={"center"}
          sx={{ width: "100%", height: "100%" }}
        >
          {/* <CircularProgress size={64} sx={{ color: "primary.light" }} /> */}
          <Typography fontSize={"1.4rem"} sx={{ color: "primary.light" }}>
            Loading contents ...
          </Typography>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
