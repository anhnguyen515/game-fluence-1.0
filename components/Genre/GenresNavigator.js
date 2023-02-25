import { Button, Stack } from "@mui/material";
import { useRouter } from "next/router";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

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
      {routes.map((item, index) => (
        <Button
          key={index}
          color={slug === item.slug ? "primary" : "text"}
          onClick={() => router.push(`/genres/${item.slug}`)}
          size="large"
          sx={{
            fontSize: "1.1rem",
            fontWeight: slug === item.slug ? "bold" : "normal",
          }}
        >
          {item.name} Games
        </Button>
      ))}
      <Button
        color="text"
        endIcon={<ArrowRightIcon />}
        onClick={() => router.push(`/genres`)}
        size="large"
        sx={{ fontSize: "1.1rem" }}
      >
        All Genres
      </Button>
    </Stack>
  );
}
