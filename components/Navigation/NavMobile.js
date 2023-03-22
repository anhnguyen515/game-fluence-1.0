import { Stack, useTheme } from "@mui/material";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

const NavMenuDrawer = dynamic(() => import("./NavMenuDrawer"), { ssr: false });
const SearchModal = dynamic(() => import("../Search/SearchModal"), {
  ssr: false,
});

export default function NavMobile() {
  const theme = useTheme();

  return (
    <Stack
      alignItems={"center"}
      direction={"row"}
      flexWrap={"wrap"}
      gap={1}
      justifyContent={"space-between"}
      sx={{ width: "100%" }}
    >
      <Link href={"/"}>
        {theme.palette.mode === "light" ? (
          <Image
            alt="logo"
            src="/img/GameFluence-black-250px.png"
            width={120}
            height={50}
          />
        ) : (
          <Image
            alt="logo"
            src="/img/GameFluence-white-250px.png"
            width={120}
            height={50}
          />
        )}
      </Link>
      <SearchModal />
      <NavMenuDrawer />
    </Stack>
  );
}
