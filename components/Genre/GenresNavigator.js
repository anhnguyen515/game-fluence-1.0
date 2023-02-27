import { Button, Stack } from "@mui/material";
import { useRouter } from "next/router";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import GridViewIcon from "@mui/icons-material/GridView";

const routes = [
  {
    name: "Action",
    slug: "action",
  },
  {
    name: "Adventure",
    slug: "adventure",
  },
  {
    name: "Platformer",
    slug: "platformer",
  },
  {
    name: "Shooter",
    slug: "shooter",
  },
  {
    name: "RPG",
    slug: "role-playing-games-rpg",
  },
  {
    name: "Indie",
    slug: "indie",
  },
  {
    name: "Fighting",
    slug: "fighting",
  },
];

export default function Navigator() {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <Stack
      alignItems={"flex-start"}
      gap={1}
      sx={{ position: "sticky", top: 16, overflow: "auto" }}
    >
      <Button
        color="text"
        fullWidth
        onClick={() => router.push(`/genres`)}
        size="large"
        startIcon={<GridViewIcon />}
        sx={{
          fontSize: "1.1rem",
          justifyContent: "flex-start",
          "&:hover": {
            ".is-hover": {
              display: "block",
              ml: "auto",
            },
          },
        }}
      >
        All Genres{" "}
        <ArrowRightIcon className="is-hover" sx={{ display: "none" }} />
      </Button>
      {routes.map((item, index) => (
        <Button
          key={index}
          color={slug === item.slug ? "primary" : "text"}
          fullWidth
          onClick={() => router.push(`/genres/${item.slug}`)}
          size="large"
          sx={{
            fontSize: "1.1rem",
            fontWeight: slug === item.slug ? "bold" : "normal",
            justifyContent: "flex-start",
            "&:hover": {
              ".is-hover": {
                display: "block",
                ml: "auto",
              },
            },
          }}
        >
          {item.name}{" "}
          <ArrowRightIcon className="is-hover" sx={{ display: "none" }} />
        </Button>
      ))}
    </Stack>
  );
}
