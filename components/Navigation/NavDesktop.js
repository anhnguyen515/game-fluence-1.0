import LoginIcon from "@mui/icons-material/Login";
import { Button, Divider, Stack, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

const SearchModal = dynamic(() => import("./SearchModal"), { ssr: false });

export default function NavDesktop() {
  return (
    <Stack
      alignItems={"center"}
      direction={"row"}
      flexWrap={"wrap"}
      gap={2}
      sx={{ width: "100%" }}
    >
      <Link href={"/"} className="mr-10">
        <Image
          alt="logo"
          src="/img/GameFluence-black-250px.png"
          width={150}
          height={75}
        />
      </Link>
      <Stack
        alignItems={"center"}
        direction={"row"}
        divider={<Divider orientation="vertical" flexItem />}
        gap={3}
        sx={{
          "&>.link": {
            "&:hover": {
              borderBottom: 1,
              transition: "all 0.1s",
            },
          },
        }}
      >
        <Link href={"/games"} className="link">
          <Typography>All Games</Typography>
        </Link>
        <Link href={"/genres"} className="link">
          <Typography>Genres</Typography>
        </Link>
        <Link href={"/platforms"} className="link">
          <Typography>Platforms</Typography>
        </Link>
        <Link href={"/publishers"} className="link">
          <Typography>Publishers</Typography>
        </Link>
      </Stack>
      <Stack
        alignItems={"center"}
        direction={"row"}
        divider={<Divider orientation="vertical" flexItem />}
        gap={1}
        sx={{ ml: "auto" }}
      >
        <SearchModal />
        <Button
          size="small"
          startIcon={<LoginIcon />}
          sx={{ textTransform: "none" }}
          // variant="outlined"
        >
          Login
        </Button>
      </Stack>
    </Stack>
  );
}
