import { selectUser } from "@/store/slices/userSlice";
import LoginIcon from "@mui/icons-material/Login";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function NavAuth() {
  const userStore = useSelector(selectUser);
  return (
    <>
      <Button
        onClick={() => toast.info("Work in progress")}
        size="small"
        startIcon={<LoginIcon />}
        variant="contained"
      >
        Login
      </Button>
    </>
  );
}
