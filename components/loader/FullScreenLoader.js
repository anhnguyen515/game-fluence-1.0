import {
  CircularProgress,
  DialogContent,
  Stack,
  Typography,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";

export default function FullScreenLoader() {
  return (
    <Dialog open>
      <DialogContent>
        <Stack
          alignItems={"center"}
          direction={"row"}
          gap={2}
          justifyContent={"center"}
          sx={{ width: "100%", height: "100%" }}
        >
          <CircularProgress size={32} />
          <Typography fontSize={"1.2rem"}>Loading...</Typography>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
