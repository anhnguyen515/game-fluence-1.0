import { selectTheme } from "@/store/slices/themeSlice";
import { getTheme } from "@/utils/utils";
import { Divider, Stack } from "@mui/material";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";

const NavAuth = dynamic(() => import("./NavAuth"), { ssr: false });
const SearchModal = dynamic(() => import("../Search/SearchModal"), {
  ssr: false,
});
const ThemePicker = dynamic(() => import("../common/ThemePicker"), {
  ssr: false,
});

export default function NavDesktop() {
  const themeStore = useSelector(selectTheme);

  return (
    <Stack
      alignItems={"center"}
      direction={"row"}
      flexWrap={"wrap"}
      gap={2}
      sx={{ width: "100%" }}
    >
      <Link href={"/"} className="mr-10">
        {getTheme(themeStore).theme.palette.mode === "light" ? (
          <Image
            alt="logo"
            src="/img/GameFluence-black-250px.png"
            width={150}
            height={63}
          />
        ) : (
          <Image
            alt="logo"
            src="/img/GameFluence-white-250px.png"
            width={150}
            height={63}
          />
        )}
      </Link>
      <SearchModal />
      <Stack
        alignItems={"center"}
        direction={"row"}
        divider={<Divider orientation="vertical" flexItem />}
        gap={1}
        sx={{ ml: "auto" }}
      >
        <NavAuth />
        <ThemePicker />
      </Stack>
    </Stack>
  );
}
