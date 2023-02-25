import { selectTheme } from "@/store/slices/themeSlice";
import { dateFormat, getParentPlatform, getTheme } from "@/utils/utils";
import EventIcon from "@mui/icons-material/Event";
import {
  Box,
  Chip,
  Stack,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
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
  const maxGenres = 1;

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [hover, setHover] = React.useState(false);

  return (
    <Box sx={{ position: "relative", height: "100%" }}>
      <Card
        elevation={hover ? 24 : 0}
        variant={hover ? "elevation" : "outlined"}
        onMouseOver={() => {
          if (!isSmallScreen) {
            setHover(true);
          } else return;
        }}
        onMouseLeave={() => {
          if (!isSmallScreen) {
            setHover(false);
          } else return;
        }}
        sx={
          hover
            ? {
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.1s",
                position: "absolute",
                transform: "scale(1.1)",
                width: "100%",
                zIndex: 1,
              }
            : {
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.1s",
                height: "100%",
              }
        }
      >
        {game.metacritic && (
          <Tooltip title={`${game.metacritic} Metascore`} placement="left">
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
            alt={game.name}
          />
        </Link>
        <CardContent>
          {/* title */}
          <Link href={`/games/${game.slug}`}>
            <Typography
              className={!hover && !isSmallScreen ? "line-clamp-1" : ""}
              fontSize={"1.5rem"}
              fontWeight={600}
              gutterBottom
              variant="h3"
              sx={{ "&:hover": { color: "primary.light" } }}
            >
              {game.name}
            </Typography>
          </Link>

          {/* platforms */}
          {game.parent_platforms && (
            <>
              {!isSmallScreen && !hover ? (
                <Stack
                  alignItems={"center"}
                  direction={"row"}
                  flexWrap={"wrap"}
                  gap={1}
                  mb={1}
                >
                  {game.parent_platforms
                    .slice(0, maxPlatforms)
                    .map((item, index) => (
                      <Chip
                        // color="secondary"
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
              ) : (
                <Stack
                  alignItems={"center"}
                  direction={"row"}
                  flexWrap={"wrap"}
                  gap={1}
                  mb={1}
                >
                  {game.parent_platforms.map((item, index) => (
                    <Tooltip
                      key={index}
                      title={item.platform.name}
                      placement="top"
                    >
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
              )}
            </>
          )}

          {/* genres */}
          {game.genres && (
            <>
              {!isSmallScreen && !hover ? (
                <Stack
                  alignItems={"center"}
                  direction={"row"}
                  flexWrap={"wrap"}
                  gap={1}
                  mb={1}
                >
                  {game.genres.slice(0, maxGenres).map((item, index) => (
                    <Chip
                      key={index}
                      label={item.name}
                      onClick={() => router.push(`/genres/${item.slug}`)}
                      size="small"
                    />
                  ))}
                  {game.genres.length > maxGenres && (
                    <Chip
                      label={`+${game.genres.length - maxGenres}`}
                      size="small"
                    />
                  )}
                </Stack>
              ) : (
                <Stack
                  alignItems={"center"}
                  direction={"row"}
                  flexWrap={"wrap"}
                  gap={1}
                  mb={1}
                >
                  {game.genres.map((item, index) => (
                    <Chip
                      key={index}
                      label={item.name}
                      onClick={() => router.push(`/genres/${item.slug}`)}
                      size="small"
                    />
                  ))}
                </Stack>
              )}
            </>
          )}

          {/* others */}
          {(isSmallScreen || hover) && (
            <Stack gap={1} mt={2} sx={{ color: "text.dark" }}>
              {game.released && (
                <Stack alignItems={"center"} direction={"row"} gap={1}>
                  <EventIcon sx={{ fontSize: "0.9rem" }} />
                  <Typography fontSize={"0.8rem"}>
                    {dateFormat(game.released, "MMM DD, YYYY")}
                  </Typography>
                </Stack>
              )}
              {game.added > 0 && (
                <Typography fontSize={"0.8rem"}>
                  <b>{game.added.toLocaleString()}</b> players have this game on
                  their platforms
                </Typography>
              )}
            </Stack>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
