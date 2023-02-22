import { selectTheme } from "@/store/slices/themeSlice";
import { getTheme } from "@/utils/utils";
import { Divider, Stack, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const SearchModal = dynamic(() => import("./SearchModal"), { ssr: false });
const ThemePicker = dynamic(() => import("../common/ThemePicker"), {
  ssr: false,
});
const NavAuth = dynamic(() => import("./NavAuth"), {
  ssr: false,
});

function ActiveLink({ href, item, router }) {
  return (
    <>
      <Link href={href}>
        <Typography
          sx={{
            color: router.pathname.includes(href) ? "primary.light" : "text",
            borderBottom: router.pathname.includes(href) && 1,
            "&:hover": {
              borderBottom: 1,
              transition: "all 0.1s",
            },
          }}
        >
          {item}
        </Typography>
      </Link>
    </>
  );
}

export default function NavDesktop() {
  const router = useRouter();
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
      <Stack
        alignItems={"center"}
        direction={"row"}
        divider={<Divider orientation="vertical" flexItem />}
        gap={3}
      >
        <ActiveLink href={"/games"} item={"All Games"} router={router} />
        <ActiveLink href={"/genres"} item={"Genres"} router={router} />
        <ActiveLink href={"/platforms"} item={"Platforms"} router={router} />
        <ActiveLink href={"/publishers"} item={"Publishers"} router={router} />
      </Stack>
      <Stack
        alignItems={"center"}
        direction={"row"}
        divider={<Divider orientation="vertical" flexItem />}
        gap={1}
        sx={{ ml: "auto" }}
      >
        <SearchModal />
        <NavAuth />
        <ThemePicker />
      </Stack>
    </Stack>
  );
}
