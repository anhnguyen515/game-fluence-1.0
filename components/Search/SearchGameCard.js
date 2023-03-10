import { getParentPlatform } from "@/utils/utils";
import {
  Box,
  Chip,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function SearchGameCard({ item }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();
  return (
    <Stack direction={"row"} gap={1}>
      <Box sx={{ flex: 1 }}>
        <Box
          onClick={() => router.push(`/games/${item.slug}`)}
          sx={{
            position: "relative",
            aspectRatio: { xs: "3/4", sm: "1920/1080" },
            borderRadius: 1,
            overflow: "hidden",
            cursor: "pointer",
            ".img": {
              objectFit: "cover",
              transition: "transform 0.2s",
              ":hover": {
                transform: "scale(1.1)",
              },
            },
          }}
        >
          <Image
            className="img"
            alt=""
            src={
              item.background_image ||
              (theme.palette.mode === "light"
                ? "/img/logo-black-250px.png"
                : "/img/logo-white-250px.png")
            }
            fill
            placeholder="blur"
            blurDataURL={
              theme.palette.mode === "light"
                ? "/img/logo-black-250px.png"
                : "/img/logo-white-250px.png"
            }
            sizes={`(max-width: ${theme.breakpoints.values.sm}) 200vw, (max-width: ${theme.breakpoints.values.md}) 100vw, 50vw`}
          />
        </Box>
      </Box>
      <Stack
        alignItems={"flex-start"}
        gap={1}
        sx={{ flex: { xs: 2, sm: 3, md: 3 } }}
      >
        <Link href={`/games/${item.slug}`}>
          <Typography
            variant="h2"
            fontSize={"1.3rem"}
            fontWeight={600}
            sx={{
              transition: "color 0.2s",
              "&:hover": { color: "primary.light" },
            }}
          >
            {item.name}
          </Typography>
        </Link>
        <Stack
          alignItems={"center"}
          direction={"row"}
          flexWrap={"wrap"}
          gap={1}
        >
          {item.parent_platforms.map((item, index) => (
            <Tooltip key={index} title={item.platform.name} placement="top">
              <Chip
                label={getParentPlatform(
                  item.platform.name,
                  isSmallScreen ? 12 : 16
                )}
                size="small"
              />
            </Tooltip>
          ))}
        </Stack>
        <Stack
          alignItems={"center"}
          direction={"row"}
          flexWrap={"wrap"}
          gap={1}
        >
          {item.genres.map((item, index) => (
            <Chip
              key={index}
              label={item.name}
              onClick={() => router.push(`/genres/${item.slug}`)}
              size="small"
            />
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
}
