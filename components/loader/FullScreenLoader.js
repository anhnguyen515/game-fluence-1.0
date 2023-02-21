import { CircularProgress, DialogContent, Stack } from "@mui/material";
import Dialog from "@mui/material/Dialog";

export default function FullScreenLoader() {
  return (
    <Dialog
      open
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
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
          <CircularProgress size={64} sx={{ color: "primary.light" }} />
          {/* <Typography fontSize={"1.2rem"} sx={{ color: "primary.light" }}>
            Loading...
          </Typography> */}
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
