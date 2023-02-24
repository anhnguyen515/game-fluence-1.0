import { selectUser } from "@/store/slices/userSlice";
import LoginIcon from "@mui/icons-material/Login";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";

export default function NavAuth() {
  const userStore = useSelector(selectUser);
  return (
    <>
      <Button size="small" startIcon={<LoginIcon />}>
        Login
      </Button>
    </>
  );
}
