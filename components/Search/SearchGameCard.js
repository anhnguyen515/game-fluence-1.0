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
      <Box
        onClick={() => router.push(`/games/${item.slug}`)}
        sx={{
          position: "relative",
          width: "10rem",
          aspectRatio: "1920/1080",
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
          sizes="20vw"
        />
        {item.metacritic && (
          <Tooltip title={`${item.metacritic} Metascore`} placement="left">
            <Typography
              className={
                item.metacritic >= 75
                  ? "text-green-500"
                  : item.metacritic < 50
                  ? "text-red-500"
                  : "text-yellow-500"
              }
              fontSize={"0.8rem"}
              fontWeight={600}
              sx={{
                border: 2,
                borderRadius: 1,
                px: 0.75,
                position: "absolute",
                top: 5,
                right: 5,
                backgroundColor: "rgba(21, 21, 21, 0.8)",
              }}
            >
              {item.metacritic}
            </Typography>
          </Tooltip>
        )}
      </Box>
      <Stack gap={1}>
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
