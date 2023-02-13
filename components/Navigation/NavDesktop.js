import { Stack } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function NavDesktop() {
  return (
    <Stack direction={"row"}>
      <Link href={"/"}>
        <Image
          alt="logo"
          loading="lazy"
          src="/img/GameFluence-black-250px.png"
          width={150}
          height={75}
        />
      </Link>
    </Stack>
  );
}
