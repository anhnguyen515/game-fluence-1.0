import { selectUser } from "@/store/slices/userSlice";
import React from "react";
import { useSelector } from "react-redux";

export default function useAuth() {
  const userStore = useSelector(selectUser);
  const [loggedIn, setLoggedIn] = React.useState(false);

  React.useEffect(() => {
    if (userStore) {
      setLoggedIn(true);
    }
  }, [userStore]);

  return loggedIn;
}
