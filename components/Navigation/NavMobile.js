import { selectTheme } from "@/store/slices/themeSlice";
import { Divider, Stack, useTheme } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import ThemePicker from "../common/ThemePicker";
import SearchModal from "../Search/SearchModal";
import NavAuth from "./NavAuth";
import NavMenuDrawer from "./NavMenuDrawer";

export default function NavMobile() {
  const theme = useTheme();

  return (
    <Stack
      alignItems={"center"}
      direction={"row"}
      flexWrap={"wrap"}
      gap={2}
      justifyContent={"space-between"}
      sx={{ width: "100%" }}
    >
      <Link href={"/"}>
        {theme.palette.mode === "light" ? (
          <Image
            alt="logo"
            src="/img/GameFluence-black-250px.png"
            width={100}
            height={42}
          />
        ) : (
          <Image
            alt="logo"
            src="/img/GameFluence-white-250px.png"
            width={100}
            height={42}
          />
        )}
      </Link>
      <SearchModal />
      <NavMenuDrawer />
    </Stack>
  );
}
