import { dateFormat, getParentPlatform } from "@/utils/utils";
import EventIcon from "@mui/icons-material/Event";
import { Chip, Divider, Stack, useMediaQuery, useTheme } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import React from "react";

export default function GameCard({ game }) {
  const [hover, setHover] = React.useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Card
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardMedia
        sx={{ width: "100%", aspectRatio: "2/1" }}
        image={game.background_image}
        title={game.name}
      />
      <CardContent>
        {/* platforms & metacritic */}
        <Stack
          alignItems={"center"}
          direction={"row"}
          gap={1}
          justifyContent={"space-between"}
          mb={1}
        >
          <Stack alignItems={"center"} direction={"row"} gap={1}>
            {game.parent_platforms.slice(0, 3).map((item, index) => (
              <Typography key={index} component={"span"}>
                {getParentPlatform(item.platform.name)}
              </Typography>
            ))}
            {game.parent_platforms.length > 3 && (
              <Chip
                label={`+${game.parent_platforms.length - 3}`}
                size="small"
              />
            )}
          </Stack>
          <Typography
            className={
              game.metacritic >= 75
                ? "text-green-500"
                : game.metacritic < 50
                ? "text-red-500"
                : "text-yellow-500"
            }
            fontSize={"0.9rem"}
            fontWeight={600}
            sx={{ border: 1, borderRadius: 1, px: 1 }}
          >
            {game.metacritic}
          </Typography>
        </Stack>

        {/* title */}
        <Typography
          className="line-clamp-1"
          fontSize={"1.5rem"}
          fontWeight={600}
          gutterBottom
          variant="h3"
        >
          {game.name}
        </Typography>

        {/* genres */}
        <Stack alignItems={"center"} direction={"row"} gap={0.5} mb={1}>
          {game.genres.slice(0, 2).map((item, index) => (
            <Chip key={index} label={item.name} size="small" />
          ))}
          {game.genres.length > 2 && <Chip label="..." size="small" />}
        </Stack>

        {/* others */}
        {(isSmallScreen || hover) && (
          <Stack divider={<Divider flexItem />} gap={1}>
            <Stack alignItems={"center"} direction={"row"} gap={1}>
              <EventIcon sx={{ fontSize: "0.9rem" }} />
              <Typography fontSize={"0.9rem"}>
                {dateFormat(game.released, "MMM DD, YYYY")}
              </Typography>
            </Stack>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
}
