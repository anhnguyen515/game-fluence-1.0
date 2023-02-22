import LoginIcon from "@mui/icons-material/Login";
import { Button } from "@mui/material";

export default function NavAuth() {
  return (
    <>
      <Button size="small" startIcon={<LoginIcon />}>
        Login
      </Button>
    </>
  );
}
