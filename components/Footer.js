import { Box, Container, Divider, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsTelephoneFill, BsMailbox2, BsLinkedin } from "react-icons/bs";

export default function Footer() {
  return (
    <Box
      sx={{
        borderTop: 1,
        borderColor: "divider",
        backgroundColor: "secondary.main",
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{ p: { xs: 1, md: 3 } }}>
          <Stack direction={"row"} gap={2} justifyContent={"space-between"}>
            <Stack>
              <Typography
                variant="caption"
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <BsTelephoneFill fontSize={12} /> (+84) 39 8938 320
              </Typography>
              <Typography
                variant="caption"
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <BsMailbox2 fontSize={12} /> ndtatuananh@gmail.com
              </Typography>
              <Link href={"https://www.linkedin.com/in/ndtatuananh/"}>
                <Typography
                  variant="caption"
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <BsLinkedin fontSize={12} /> ndtatuananh
                </Typography>
              </Link>
              <Typography variant="caption" sx={{ mt: 2 }}>
                Feel free to contact if you want to work with me
              </Typography>
            </Stack>
            <Stack alignItems={"center"}>
              <Image
                alt="footer logo"
                src="/img/GameFluence-black-250px.png"
                width={150}
                height={75}
              />
              <Typography variant="caption">
                I made this website mainly to hone my Front-end skills
                (〜￣▽￣)〜
              </Typography>
            </Stack>
            <Stack>
              <Typography variant="caption">
                Made by Anh Nguyen with 💕
              </Typography>
              <Typography variant="caption">
                Data & API provided by{" "}
                <Link href={"https://rawg.io"} className="font-semibold">
                  RAWG
                </Link>
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
