import { upperCaseFirstLetter } from "@/utils/utils";
import PersonIcon from "@mui/icons-material/Person";
import {
  Avatar,
  Box,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export default function GeneralItemCard({ item, href }) {
  const router = useRouter();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const heightRef = React.useRef(null);
  const [hover, setHover] = React.useState(false);
  const [height, setHeight] = React.useState("auto");

  React.useEffect(() => {
    setHeight(heightRef.current.clientHeight);
  }, []);

  return (
    <Box className="relative" sx={{ height }}>
      <Paper
        ref={heightRef}
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
          backgroundImage:
            !hover && !isSmallScreen
              ? `linear-gradient(to bottom, rgba(21, 21, 21, 0.7), rgba(21, 21, 21, 0.7)), url(${item.image_background})`
              : `linear-gradient(to bottom, rgba(21, 21, 21, 0.5), rgba(21, 21, 21, 0.5)), url(${item.image_background})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          borderRadius: 1,
          transition: "transform 0.3s",
          color: "white",
          p: 2,
          position: hover && "absolute",
          transform: hover && "scale(1.1)",
          zIndex: 1,
        }}
      >
        {item.image && (
          <Avatar
            onClick={() =>
              router.push(href || router.pathname + `/${item.slug}`)
            }
            src={item.image}
            sx={{
              width: "3rem",
              height: "3rem",
              cursor: "pointer",
              transition: "transform 0.3s",
              "&:hover": {
                transform: "scale(1.3) rotate(15deg)",
              },
            }}
          />
        )}
        <Link
          href={
            href || {
              pathname: router.pathname + `/${item.slug}`,
            }
          }
        >
          <Typography
            variant="h2"
            fontSize={"1.5rem"}
            fontWeight={600}
            textAlign={"center"}
            sx={{ "&:hover": { color: "primary.light" } }}
          >
            {item.name}
          </Typography>
        </Link>
        {item.positions && (
          <Typography fontSize={"0.9rem"} textAlign={"center"}>
            {item.positions
              .map((item) => upperCaseFirstLetter(item.name))
              .join(", ")}
          </Typography>
        )}
        <Typography fontSize={"0.9rem"} textAlign={"center"}>
          <Typography
            color="primary.light"
            component={"span"}
            fontSize={"0.95rem"}
            fontWeight={600}
          >
            {item.games_count.toLocaleString()}
          </Typography>{" "}
          {item.games_count > 1 ? "games" : "game"}
        </Typography>
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
              {item.games.slice(0, 3).map((i) => (
                <Stack
                  key={i.id}
                  alignItems={"center"}
                  direction={"row"}
                  gap={1}
                  justifyContent={"space-between"}
                >
                  <Link href={`/games/${i.slug}`}>
                    <Typography
                      className="line-clamp-1"
                      fontSize={"0.8rem"}
                      fontWeight={600}
                      sx={{ "&:hover": { color: "primary.light" } }}
                    >
                      {i.name}
                    </Typography>
                  </Link>
                  <Typography
                    fontSize={"0.8rem"}
                    sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                  >
                    {i.added.toLocaleString()}{" "}
                    <PersonIcon sx={{ fontSize: "0.8rem" }} />
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Stack>
        )}
      </Paper>
    </Box>
  );
}
