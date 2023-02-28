import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Button, Stack } from "@mui/material";
import { useRouter } from "next/router";

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
    <>
      <Button
        color="text"
        fullWidth
        onClick={() => router.push(`/genres`)}
        size="large"
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
        Genres <ArrowRightIcon className="is-hover" sx={{ display: "none" }} />
      </Button>
      <Stack alignItems={"flex-start"} gap={1} pl={2}>
        {routes.map((item, index) => (
          <Button
            key={index}
            color={slug === item.slug ? "primary" : "text"}
            onClick={() => router.push(`/genres/${item.slug}`)}
            size="large"
            sx={{
              fontWeight: slug === item.slug ? "bold" : "normal",
            }}
          >
            {item.name}
          </Button>
        ))}
      </Stack>
    </>
  );
}
