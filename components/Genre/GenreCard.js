import { selectTheme } from "@/store/slices/themeSlice";
import { getTheme } from "@/utils/utils";
import {
  Divider,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import PersonIcon from "@mui/icons-material/Person";

export default function GenreCard({ genre }) {
  const themeStore = useSelector(selectTheme);
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
        aspectRatio: "1.25/1",
        backgroundImage: `linear-gradient(to bottom, ${
          getTheme(themeStore).theme.palette.background.default + "B3"
        } ,${
          getTheme(themeStore).theme.palette.background.default + "B3"
        }), url(${genre.image_background})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        borderRadius: 1,
        transition: "transform 0.1s",
        p: 2,
        "&:hover": {
          transform: "scale(1.1)",
        },
      }}
    >
      <Link href={`/genres/${genre.slug}`}>
        <Typography
          variant="h2"
          fontSize={"1.6rem"}
          fontWeight={600}
          sx={{ "&:hover": { color: "primary.light" } }}
        >
          {genre.name}
        </Typography>
      </Link>

      <Typography fontSize={"0.95rem"}>
        <Typography
          color="primary.light"
          component={"span"}
          fontSize={"0.95rem"}
          fontWeight={600}
        >
          {genre.games_count.toLocaleString()}
        </Typography>{" "}
        games
      </Typography>
      {(hover || isSmallScreen) && (
        <Stack gap={1} mt={3} sx={{ width: "100%" }}>
          <Typography fontSize={"0.9rem"} fontWeight={600} textAlign={"center"}>
            Popular items
          </Typography>
          <Stack divider={<Divider flexItem />} gap={1}>
            {genre.games.slice(0, 3).map((item) => (
              <Stack
                key={item.id}
                alignItems={"center"}
                direction={"row"}
                flexWrap={"wrap"}
                gap={1}
                justifyContent={"space-between"}
              >
                <Link href={`/games/${item.slug}`}>
                  <Typography
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
    </Paper>
  );
}
