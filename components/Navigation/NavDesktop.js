import LoginIcon from "@mui/icons-material/Login";
import { Button, Divider, Stack } from "@mui/material";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

const SearchModal = dynamic(() => import("./SearchModal"), { ssr: false });

export default function NavDesktop() {
  return (
    <Stack
      alignItems={"center"}
      direction={"row"}
      gap={1}
      justifyContent={"space-between"}
      sx={{ width: "100%" }}
    >
      <Link href={"/"}>
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
        gap={1}
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
