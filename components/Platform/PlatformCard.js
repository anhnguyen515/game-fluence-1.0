import PersonIcon from "@mui/icons-material/Person";
import {
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import React from "react";

export default function PlatformCard({ platform }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [hover, setHover] = React.useState(false);
  return (
    <Paper
      elevation={hover ? 24 : 0}
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
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        aspectRatio: "1.5/1",
        backgroundImage:
          !hover && !isSmallScreen
            ? `linear-gradient(to bottom, rgba(21, 21, 21, 0.7), rgba(21, 21, 21, 0.7)), url(${platform.image_background})`
            : `linear-gradient(to bottom, rgba(21, 21, 21, 0.5), rgba(21, 21, 21, 0.5)), url(${platform.image_background})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        borderRadius: 1,
        transition: "transform 0.1s",
        color: "white",
        p: 2,
        transform: hover && "scale(1.1)",
      }}
    >
      <Link href={`/platforms/${platform.slug}`}>
        <Typography
          className={hover ? "line-clamp-1" : null}
          variant="h2"
          fontSize={"1.5rem"}
          fontWeight={600}
          textAlign={"center"}
          sx={{ "&:hover": { color: "primary.light" } }}
        >
          {platform.name}
        </Typography>
      </Link>

      {platform.games_count > 0 && (
        <Typography fontSize={"0.95rem"}>
          <Typography
            color="primary.light"
            component={"span"}
            fontSize={"0.95rem"}
            fontWeight={600}
          >
            {platform.games_count.toLocaleString()}
          </Typography>{" "}
          {platform.games_count > 1 ? "games" : "game"}
        </Typography>
      )}
      {platform.games_count > 0 && (
        <>
          {(hover || isSmallScreen) && (
            <Stack gap={1} mt={3} sx={{ width: "100%" }}>
              <Typography
                fontSize={"0.9rem"}
                fontWeight={600}
                textAlign={"center"}
              >
                Popular items
              </Typography>
              <Stack gap={1}>
                {platform.games.slice(0, 3).map((item) => (
                  <Stack
                    key={item.id}
                    alignItems={"center"}
                    direction={"row"}
                    gap={1}
                    justifyContent={"space-between"}
                  >
                    <Link href={`/games/${item.slug}`}>
                      <Typography
                        className="line-clamp-1"
                        fontSize={"0.8rem"}
                        fontWeight={600}
                        sx={{ "&:hover": { color: "primary.light" } }}
                      >
                        {item.name}
                      </Typography>
                    </Link>
                    <Typography
                      fontSize={"0.8rem"}
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      {item.added.toLocaleString()}{" "}
                      <PersonIcon sx={{ fontSize: "0.8rem" }} />
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Stack>
          )}
        </>
      )}
    </Paper>
  );
}
