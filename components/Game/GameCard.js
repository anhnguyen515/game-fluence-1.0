import { selectTheme } from "@/store/slices/themeSlice";
import { dateFormat, getParentPlatform, getTheme } from "@/utils/utils";
import EventIcon from "@mui/icons-material/Event";
import { Chip, Stack, Tooltip } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";

export default function GameCard({ game }) {
  const themeStore = useSelector(selectTheme);
  const router = useRouter();

  const maxPlatforms = 3;
  const maxGenres = 3;

  const [hover, setHover] = React.useState(false);

  return (
    <>
      <Card
        elevation={hover ? 4 : 1}
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          transition: "all 0.2s",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
      >
        {game.metacritic && (
          <Tooltip
            title={`${game.metacritic} Metascore`}
            placement="left"
            arrow
          >
            <Typography
              className={
                game.metacritic >= 75
                  ? "text-green-500"
                  : game.metacritic < 50
                  ? "text-red-500"
                  : "text-yellow-500"
              }
              fontWeight={600}
              sx={{
                border: 2,
                borderRadius: 1,
                px: 1,
                position: "absolute",
                top: 5,
                right: 5,
                backgroundColor: "rgba(21, 21, 21, 0.8)",
              }}
            >
              {game.metacritic}
            </Typography>
          </Tooltip>
        )}
        <Link href={`/games/${game.slug}`}>
          <CardMedia
            sx={{ width: "100%", aspectRatio: "2/1" }}
            image={
              game.background_image
                ? game.background_image
                : getTheme(themeStore).theme.palette.mode === "light"
                ? "/img/logo-black-600px.png"
                : "/img/logo-white-600px.png"
            }
            title={game.name}
          />
        </Link>
        <CardContent>
          {/* title */}
          <Link href={`/games/${game.slug}`}>
            <Typography
              className="line-clamp-1"
              fontSize={"1.5rem"}
              fontWeight={600}
              gutterBottom
              variant="h3"
            >
              {game.name}
            </Typography>
          </Link>

          {/* platforms */}
          <Stack alignItems={"center"} direction={"row"} gap={1} mb={1}>
            {game.parent_platforms.slice(0, maxPlatforms).map((item, index) => (
              <Chip
                key={index}
                label={getParentPlatform(item.platform.name)}
                size="small"
              />
            ))}
            {game.parent_platforms.length > maxPlatforms && (
              <Chip
                label={`+${game.parent_platforms.length - maxPlatforms}`}
                size="small"
              />
            )}
          </Stack>

          {/* genres */}
          <Stack alignItems={"center"} direction={"row"} gap={1} mb={1}>
            {game.genres.slice(0, maxGenres).map((item, index) => (
              <Chip
                key={index}
                label={item.name}
                onClick={() => router.push(`/genres/${item.slug}`)}
                size="small"
              />
            ))}
            {game.genres.length > maxGenres && (
              <Chip label={`+${game.genres.length - maxGenres}`} size="small" />
            )}
          </Stack>

          {/* others */}

          <Stack alignItems={"center"} direction={"row"} gap={1}>
            <EventIcon fontSize="small" />
            <Typography fontSize={"0.9rem"}>
              {dateFormat(game.released, "MMM DD, YYYY")}
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
}
