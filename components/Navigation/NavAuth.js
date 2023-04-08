import { selectUser, setUser } from "@/store/slices/userSlice";
import LoginIcon from "@mui/icons-material/Login";
import { Button } from "@mui/material";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import NavAuthMenu from "./NavAuthMenu";

export default function NavAuth() {
  const userStore = useSelector(selectUser);
  const dispatch = useDispatch();
  const router = useRouter();

  React.useEffect(() => {
    const user = Cookies.get("user");
    if (user) {
      dispatch(setUser(JSON.parse(user)));
    }
  }, []);

  return (
    <>
      {userStore ? (
        <NavAuthMenu user={userStore} />
      ) : (
        <Button
          onClick={() => router.push("/auth/login")}
          size="small"
          startIcon={<LoginIcon />}
          variant="contained"
        >
          Login
        </Button>
      )}
    </>
  );
}
